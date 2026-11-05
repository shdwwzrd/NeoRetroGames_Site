# Copies blurb/description text from COPY.md into games.json.
# Run via tools\apply-copy.bat. Preserves games.json's one-line-per-game layout.
param([string]$Root = (Split-Path -Parent $PSScriptRoot))

$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$copyPath = Join-Path $Root 'COPY.md'
$jsonPath = Join-Path $Root 'games.json'

function Json-Str([string]$s) {
  $s = $s.Replace('\', '\\').Replace('"', '\"')
  return '"' + $s + '"'
}

# ---- parse COPY.md ----
$raw = [IO.File]::ReadAllText($copyPath, $utf8)
$raw = [regex]::Replace($raw, '<!--.*?-->', '', 'Singleline')
$copy = [ordered]@{}   # id -> @{ blurb = string; description = string[] }
$id = $null; $field = $null; $para = New-Object System.Collections.ArrayList
$paras = New-Object System.Collections.ArrayList

function Flush-Para {
  if ($script:para.Count -gt 0) { [void]$script:paras.Add(($script:para -join ' ')); $script:para.Clear() }
}
function Flush-Field {
  Flush-Para
  if ($script:id -and $script:field) {
    $vals = @($script:paras | ForEach-Object { $_ })
    if ($script:field -eq 'blurb') { $script:copy[$script:id].blurb = ($vals -join ' ') }
    else { $script:copy[$script:id].description = $vals }
  }
  $script:paras.Clear()
}

$started = $false
foreach ($line in ($raw -split "`r?`n")) {
  if ($line -match '^##\s+(\S+)\s*$') {
    Flush-Field; $started = $true
    $id = $Matches[1]; $field = $null
    $copy[$id] = @{ blurb = ''; description = @() }
  }
  elseif ($started -and $line -match '^###\s+(blurb|description)\s*$') {
    Flush-Field; $field = $Matches[1]
  }
  elseif ($started -and $field) {
    $t = $line.Trim()
    if ($t -eq '') { Flush-Para } elseif ($t -ne '---') { [void]$para.Add($t) }
  }
}
Flush-Field

# ---- apply to games.json ----
$text = [IO.File]::ReadAllText($jsonPath, $utf8)
$lines = [regex]::Split($text, '(?<=\n)')
$updated = @(); $missing = @(); $seen = @{}

for ($i = 0; $i -lt $lines.Count; $i++) {
  if ($lines[$i] -notmatch '"id":\s*"([^"]+)"') { continue }
  $gid = $Matches[1]
  if ($copy.Contains($gid)) { $seen[$gid] = $true; $c = $copy[$gid] }
  else { $c = @{ blurb = ''; description = @() } }
  $l = $lines[$i]; $changed = $false

  # screenshots: every image in img\shots\<id>\, in natural order (1, 2, ... 10)
  $shotDir = Join-Path $Root ('img\shots\' + $gid)
  if (Test-Path $shotDir) {
    $files = @(Get-ChildItem $shotDir -File | Where-Object { $_.Extension -match '^\.(png|jpe?g|gif|webp)$' } |
      Sort-Object { [regex]::Replace($_.Name, '\d+', { param($m) $m.Value.PadLeft(8, '0') }) })
    $bad = @($files | Where-Object { $_.Name -notmatch '^[A-Za-z0-9_.\-]+$' })
    foreach ($b in $bad) { Write-Warning "Skipped '$($b.Name)' in img\shots\$gid (use only letters, digits, _ . -)" }
    $files = @($files | Where-Object { $bad -notcontains $_ })
    if ($files.Count -gt 0) {
      $shots = '"screenshots": [' + (($files | ForEach-Object { Json-Str ('img/shots/' + $gid + '/' + $_.Name) }) -join ', ') + ']'
      $shotRx = '"screenshots":\s*\[(?:"(?:[^"\\]|\\.)*"(?:,\s*)?)*\]'
      if ($l -match $shotRx) { $l = [regex]::Replace($l, $shotRx, { param($m) $shots }) }
      else { $l = [regex]::Replace($l, '("platforms":)', { param($m) $shots + ', ' + $m.Groups[1].Value }) }
      $changed = $true
    }
  }

  if ($c.blurb -ne '') {
    $new = '"blurb": ' + (Json-Str $c.blurb)
    $l = [regex]::Replace($l, '"blurb":\s*"(?:[^"\\]|\\.)*"', { param($m) $new })
    $changed = $true
  }
  if ($c.description.Count -gt 0) {
    $arr = '"description": [' + (($c.description | ForEach-Object { Json-Str $_ }) -join ', ') + ']'
    $descRx = '"description":\s*\[(?:"(?:[^"\\]|\\.)*"(?:,\s*)?)*\]'
    if ($l -match $descRx) {
      $l = [regex]::Replace($l, $descRx, { param($m) $arr })
    } else {
      $l = [regex]::Replace($l, '("blurb":\s*"(?:[^"\\]|\\.)*",)', { param($m) $m.Groups[1].Value + ' ' + $arr + ',' })
    }
    $changed = $true
  }
  if ($changed) { $lines[$i] = $l; $updated += $gid }
}

foreach ($k in $copy.Keys) { if (-not $seen.ContainsKey($k)) { $missing += $k } }

if ($updated.Count -gt 0) {
  $out = -join $lines
  try { [void]($out | ConvertFrom-Json) } catch { throw "Result isn't valid JSON, games.json NOT changed: $_" }
  [IO.File]::WriteAllText($jsonPath, $out, $utf8)
}

# ---- add stub sections to COPY.md for games that have none ----
$stubs = ''; $added = @()
foreach ($l in $lines) {
  if ($l -match '"id":\s*"([^"]+)"' -and -not $copy.Contains($Matches[1])) {
    $gid = $Matches[1]
    $title = if ($l -match '"title":\s*"([^"]+)"') { $Matches[1] } else { $gid }
    $plat = if ($l -match '"platforms":\s*\[([^\]]*)\]') { ($Matches[1] -replace '"', '').Trim() } else { '' }
    $stubs += "`r`n## $gid`r`n<!-- $title ($plat) -->`r`n### blurb`r`n`r`n### description`r`n`r`n"
    $added += $gid
  }
}
if ($added.Count -gt 0) {
  $cur = [IO.File]::ReadAllText($copyPath, $utf8)
  [IO.File]::WriteAllText($copyPath, $cur.TrimEnd() + "`r`n" + $stubs, $utf8)
  Write-Host ("Added COPY.md sections for new game(s): " + ($added -join ', '))
}

Write-Host ("Updated {0} game(s): {1}" -f $updated.Count, ($updated -join ', '))
if ($missing.Count -gt 0) { Write-Warning ("ids in COPY.md not found in games.json: " + ($missing -join ', ')) }
