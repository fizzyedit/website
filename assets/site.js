// fizzyed.it: the version chip, the download menus, and the live embed.

// The newest app release. GitHub's "latest" can be an SDK tag (`sdk-v…`), which carries no app
// builds, so look for the newest published `v…` and point the download links at its files.
fetch("https://api.github.com/repos/fizzyedit/fizzy/releases?per_page=50")
  .then((r) => (r.ok ? r.json() : []))
  .then((releases) => {
    const app = releases.find((r) => !r.draft && !r.prerelease && /^v\d/.test(r.tag_name));
    if (!app) return;
    const ver = document.getElementById("ver");
    if (ver) {
      ver.textContent = app.tag_name + " · zig 0.16";
      ver.hidden = false;
    }
    document.querySelectorAll("a[data-file]").forEach((a) => {
      a.href = "https://github.com/fizzyedit/fizzy/releases/download/" + app.tag_name + "/" + a.dataset.file;
    });
  })
  .catch(() => {});

// Downloads: this visitor's OS first and labelled; each button opens its architectures.
(function () {
  const box = document.getElementById("download");
  if (!box) return;
  const hay = (((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "") + " " + navigator.userAgent).toLowerCase();
  const os = /mac|darwin/.test(hay) ? "macos" : /win/.test(hay) ? "windows" : /linux|x11|cros/.test(hay) ? "linux" : null;
  const mine = os && box.querySelector('.dl-group[data-os="' + os + '"]');
  if (mine) {
    mine.classList.add("primary");
    const name = mine.querySelector(".os-name");
    if (name) name.textContent = "Download for " + name.textContent;
    box.prepend(mine);
  }

  const groups = [...box.querySelectorAll(".dl-group")];
  const close = (except) => groups.forEach((g) => {
    if (g === except) return;
    g.classList.remove("open");
    g.querySelector(".dl").setAttribute("aria-expanded", "false");
  });
  groups.forEach((g) => {
    const button = g.querySelector(".dl");
    button.addEventListener("click", () => {
      const open = !g.classList.contains("open");
      close(g);
      g.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".dl-group")) close(null); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(null); });
})();

// The embed runs the real app, so it waits to be asked: a click swaps the still for it.
document.querySelectorAll(".embed[data-src]").forEach((figure) => {
  const run = figure.querySelector(".embed-run");
  const out = figure.querySelector(".embed-out");
  if (!run) return;
  run.addEventListener("click", () => {
    const frame = document.createElement("iframe");
    frame.src = figure.dataset.src;
    frame.title = "fizzy, running in this page";
    frame.allow = "clipboard-read; clipboard-write; fullscreen";
    figure.querySelector(".embed-frame").append(frame);
    figure.classList.add("running");
    if (out) out.hidden = false;
    frame.focus();
  });
});
