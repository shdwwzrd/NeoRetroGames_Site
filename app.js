// Renders the storefront from games.json. Relative paths only (site is served from a subpath).
(function () {
  "use strict";

  function el(tag, props, children) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "text") node.textContent = props[k];
      else if (k === "class") node.className = props[k];
      else node.setAttribute(k, props[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function isSafeUrl(u) {
    return /^(https?:\/\/|[A-Za-z0-9_.\/-]+$)/.test(u);
  }

  function renderCard(g, platform) {
    var link = "game.html?id=" + encodeURIComponent(g.id);
    var cover = g.cover
      ? el("img", { class: "cover", src: g.cover, alt: g.title + " cover", loading: "lazy" })
      : el("div", { class: "cover", role: "img", "aria-label": g.title + " (cover coming soon)" });
    cover = el("a", { href: link, "aria-label": g.title }, [cover]);

    var title = el("h3", {}, [el("a", { href: link, text: g.title })]);

    var tags = el("div", { class: "tags" });
    (g.platforms || []).forEach(function (p) {
      tags.appendChild(el("span", { class: "tag platform" + (p === platform ? " current" : ""), text: p }));
    });
    if (g.genre) tags.appendChild(el("span", { class: "tag", text: g.genre }));
    if (g.status === "development") tags.appendChild(el("span", { class: "tag dev", text: "In development" }));
    else if (g.demoUrl || g.demo) tags.appendChild(el("span", { class: "tag play", text: "Demo" }));

    var body = el("div", { class: "card-body" }, [
      title,
      tags,
      g.blurb ? el("p", { class: "blurb", text: g.blurb }) : null,
      g.price ? el("div", { class: "price", text: g.price }) : null
    ]);

    var card = el("article", { class: "card" }, [cover, body]);
    return card;
  }

  function render(data) {
    var s = data.studio || {};
    document.getElementById("tagline").textContent = s.tagline || "";

    var nav = document.getElementById("footer-links");
    if (s.twitter && isSafeUrl(s.twitter)) nav.appendChild(el("a", { href: s.twitter, text: "@neoretrogames" }));

    if (s.discord) {
      var d = document.getElementById("discord");
      d.href = s.discord;
      d.hidden = false;
    }

    var games = data.games || [];
    var platforms = [];
    games.forEach(function (g) {
      ((g.platforms && g.platforms.length) ? g.platforms : ["Other"]).forEach(function (p) {
        if (platforms.indexOf(p) < 0) platforms.push(p);
      });
    });

    var current = "All";
    var bar = document.getElementById("filters");
    function paint() {
      renderGames(games, current);
      Array.prototype.forEach.call(bar.children, function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-platform") === current));
      });
    }
    ["All"].concat(platforms).forEach(function (p) {
      var b = el("button", { type: "button", "data-platform": p, text: p });
      b.addEventListener("click", function () { current = p; paint(); });
      bar.appendChild(b);
    });
    bar.hidden = platforms.length === 0;
    paint();
  }

  function renderGames(games, filter) {
    var root = document.getElementById("grid");
    root.textContent = "";
    [
      { status: "available", heading: "Available" },
      { status: "development", heading: "In Development" }
    ].forEach(function (sec) {
      var list = games.filter(function (g) { return (g.status || "available") === sec.status; });
      var node = list.length ? renderSection(sec.heading, list, filter) : null;
      if (node) root.appendChild(node);
    });
    if (!root.children.length) root.textContent = "No games for this platform yet.";
  }

  // One section: heading, then a sub-group per platform (a multi-platform game appears under each).
  // Returns null when the platform filter leaves nothing in this section.
  function renderSection(heading, list, filter) {
    var groups = {}, order = [];
    list.forEach(function (g) {
      var plats = (g.platforms && g.platforms.length) ? g.platforms : ["Other"];
      plats.forEach(function (p) {
        if (!groups[p]) { groups[p] = []; order.push(p); }
        groups[p].push(g);
      });
    });
    if (filter && filter !== "All") order = order.filter(function (p) { return p === filter; });
    if (!order.length) return null;
    var section = el("section", { class: "games-section" }, [el("h2", { text: heading })]);
    order.forEach(function (p) {
      var grid = el("div", { class: "grid" });
      groups[p].forEach(function (g) { grid.appendChild(renderCard(g, p)); });
      section.appendChild(el("h3", { class: "platform-heading", text: p }));
      section.appendChild(grid);
    });
    return section;
  }

  fetch("games.json")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(render)
    .catch(function (e) {
      document.getElementById("grid").textContent = "Could not load games (" + e.message + ").";
    });
})();
