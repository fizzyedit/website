# fizzyed.it

Source for the [fizzy](https://github.com/fizzyedit/fizzy) website at
**https://fizzyed.it**, built with [Zine](https://zine-ssg.io).

- `content/` — every word on the site, as [SuperMD](https://zine-ssg.io/docs/supermd/)
  (`.smd`). `index.smd` is the homepage: each `[]($section.id('…'))` starts a
  section the homepage layout places. `privacy.smd` and `terms.smd` are pages
  of their own.
- `layouts/` — [SuperHTML](https://zine-ssg.io/docs/superhtml/) templates:
  `templates/base.shtml` (head, header, footer), `index.shtml` (the homepage,
  including the download buttons and the live embed), `page.shtml` (a plain
  document).
- `assets/` — `site.css`, `site.js`, images, fonts, `CNAME`, `robots.txt`,
  `sitemap.xml`.
- The browser app is **not** stored here. `fizzyedit/fizzy` builds it
  (its `web.yml`) and leaves each build as a release asset of this repo, which
  [`.github/workflows/deploy-web.yml`](.github/workflows/deploy-web.yml)
  unpacks at deploy time:
  - `web-main` → `/app/`, the real app, built from fizzy's `main`;
  - `web-preview` → `/testapp/`, a test build of the latest fizzy pull
    request, with browser storage of its own so it never touches `/app/`'s
    settings.

## Editing

Install the Zine version named in `zine.ziggy` (`.zine_version`) from
[its releases](https://github.com/kristoff-it/zine/releases), then:

```sh
zine            # dev server on http://localhost:1990, rebuilds on every save
zine release    # the finished site in public/
```

The content is just files: open this folder in fizzy and edit `content/`.
The deployed site also publishes its own content as `/site.zip`, so
<https://fizzyed.it/app/?open=/site.zip> opens it in the web app.

Links that start with `/` are checked against Zine's pages, so link to the app
(which Zine does not build) by full URL: `https://fizzyed.it/app/`.

## How it deploys

GitHub Pages (Source: GitHub Actions). The deploy runs on:

- pushes here that touch `content/`, `layouts/`, `assets/` or `zine.ziggy`,
- a `repository_dispatch` (`fizzy-updated`) sent by `fizzyedit/fizzy` after it
  uploads a new build, or when a release is published,
- manual `workflow_dispatch`.

There is **no version to maintain in this repo** — the version chip and the
download links are filled in live from the newest `v…` release of
`fizzyedit/fizzy` (not GitHub's "latest", which can be an SDK tag). Bump
versions only in fizzy.
