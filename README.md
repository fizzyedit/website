# fizzyed.it

Source for the [fizzy](https://github.com/fizzyedit/fizzy) website at
**https://fizzyed.it**.

- `docs/` — the static landing page (`index.html`, images, `CNAME`, etc.),
  served at the site root.
- The browser app at `/app/` is **not** stored here. It is built from a
  checkout of `fizzyedit/fizzy` (`zig build web`) by
  [`.github/workflows/deploy-web.yml`](.github/workflows/deploy-web.yml) and
  copied into `site/app/` at deploy time.

## How it deploys

GitHub Pages (Source: GitHub Actions). The deploy runs on:

- pushes to `docs/**` here (landing-page edits),
- a `repository_dispatch` (`fizzy-updated`) sent by `fizzyedit/fizzy` when its
  app source changes or a release is published,
- manual `workflow_dispatch`.

There is **no version to maintain in this repo** — the displayed version is
fetched live from the GitHub Releases API, and the app's version comes from
`fizzyedit/fizzy`'s `VERSION` file at build time. Bump versions only in fizzy.
