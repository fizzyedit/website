# fizzyed.it

Source for the [fizzy](https://github.com/fizzyedit/fizzy) website at
**https://fizzyed.it**.

- `docs/` — the static landing page (`index.html`, images, `CNAME`, etc.),
  served at the site root.
- The browser app is **not** stored here. `fizzyedit/fizzy` builds it
  (its `web.yml`) and leaves each build as a release asset of this repo, which
  [`.github/workflows/deploy-web.yml`](.github/workflows/deploy-web.yml)
  unpacks at deploy time:
  - `web-main` → `/app/`, the real app, built from fizzy's `main`;
  - `web-preview` → `/testapp/`, a test build of the latest fizzy pull
    request, with browser storage of its own so it never touches `/app/`'s
    settings.

## How it deploys

GitHub Pages (Source: GitHub Actions). The deploy runs on:

- pushes to `docs/**` here (landing-page edits),
- a `repository_dispatch` (`fizzy-updated`) sent by `fizzyedit/fizzy` after it
  uploads a new build, or when a release is published,
- manual `workflow_dispatch`.

There is **no version to maintain in this repo** — the displayed version is
fetched live from the GitHub Releases API, and the app's version comes from
`fizzyedit/fizzy`'s `VERSION` file at build time. Bump versions only in fizzy.
