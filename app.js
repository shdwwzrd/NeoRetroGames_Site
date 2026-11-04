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

  function renderCard(g) {
    var link = "game.html?id=" + encodeURIComponent(g.id);
    var cover = g.cover
      ? el("img", { class: "cover", src: g.cover, alt: g.title + " cover", loading: "lazy" })
      : el("div", { class: "cover", role: "img", "aria-label": g.title + " (cover coming soon)" });
    cover = el("a", { href: link, "aria-label": g.title }, [cover]);

    var title = el("h3", {}, [el("a", { href: link, text: g.title })]);

    var tags = el("div", { class: "tags" });
    if (g.genre) tags.appendChild(el("span", { class: "tag", text: g.genre }));
    (g.platforms || []).forEach(function (p) { tags.appendChild(el("span", { class: "tag", text: p })); });
    if (g.demoUrl) tags.appendChild(el("span", { class: "tag play", text: "Demo" }));

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

    var grid = document.getElementById("grid");
    (data.games || []).forEach(function (g) { grid.appendChild(renderCard(g)); });
  }

  fetch("games.json")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(render)
    .catch(function (e) {
      document.getElementById("grid").textContent = "Could not load games (" + e.message + ").";
    });
})();
