# Elinas Welt

Static landing page for Elinas first web projects.

## Local preview

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

## Deployment

The intended production domain is `elinawolter.de`.

This repository is set up for GitHub Pages from the repository root. The
`CNAME` file keeps the custom domain attached to the Pages site.

## Structure

- `index.html` is the landing page.
- `projects/formenmalen/` contains the turtle drawing game.
- `projects/bunte-bausteine/` contains the building-block drawing game.
- `projects/mastermind/` contains the Mastermind game.
- `assets/` contains screenshot previews used by the landing page.

The site has no build step and can be deployed as plain static files.
