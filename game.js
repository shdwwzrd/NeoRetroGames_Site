// Renders one game's page from games.json, selected by ?id=. Relative paths only.
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

  function button(label, url, cls, download) {
    if (!url || !isSafeUrl(url)) return null;
    var props = { class: "btn " + cls, href: url, text: label };
    if (download) props.download = "";
    return el("a", props);
  }

  function render(g) {
    document.title = g.title + " - Neo Retro Games";
    var root = document.getElementById("game");

    var cover = g.cover
      ? el("img", { class: "cover", src: g.cover, alt: g.title + " cover" })
      : el("div", { class: "cover", role: "img", "aria-label": g.title + " (cover coming soon)" });

    var tags = el("div", { class: "tags" });
    if (g.genre) tags.appendChild(el("span", { class: "tag", text: g.genre }));
    (g.platforms || []).forEach(function (p) { tags.appendChild(el("span", { class: "tag", text: p })); });

    var actions = el("div", { class: "actions" }, [
      button("Play demo", g.demoUrl, "btn-play"),
      button("Download demo", g.downloadUrl, "btn-dl", true),
      button("Buy" + (g.price ? " - " + g.price : ""), g.buyUrl, "btn-buy")
    ]);
    if (!actions.children.length) {
      actions.appendChild(el("p", { class: "blurb", text: "Coming soon." }));
    }

    root.appendChild(cover);
    root.appendChild(el("div", { class: "detail-body" }, [
      el("h2", { text: g.title }),
      tags,
      g.blurb ? el("p", { text: g.blurb }) : null,
      actions
    ]));
  }

  var id = new URLSearchParams(location.search).get("id");
  fetch("games.json")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var g = (data.games || []).filter(function (x) { return x.id === id; })[0];
      if (!g) throw new Error("game not found");
      render(g);
    })
    .catch(function (e) {
      document.getElementById("game").textContent = "Could not load this game (" + e.message + ").";
    });
})();
