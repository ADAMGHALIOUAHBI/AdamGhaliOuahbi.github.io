# Ghali's World


A family-managed digital space for play, creativity, learning, and discovery.
The public site is designed for a young person without publishing an exact age,
school, location, contact details, or personal social accounts.

## Project architecture


```text
index.html                         Vite entry point
about.html                         About and privacy page
timeline.html                      Learning journey page
src/
  App.tsx                          Shared navigation, home, and about views
  components/                      3D background, music, language cards, and login UI
  protectedUSERS_root_path_secure/ Parent-approved GitHub sign-in UI
  music/                           Empty public playlist and local-only library
api/
  src/                              GitHub OAuth and protected profile API
  prisma/                           MongoDB and PostgreSQL schemas/migrations
starters/                           Small learning examples in eight languages
public/                             Static assets and generated language metrics
.github/workflows/                  Pages deployment and validation
```

The GitHub OAuth/API flow is retained. It is for parent-approved adult accounts;
it is not a child account or a place to publish a child's credentials. Real
OAuth secrets and database credentials belong only in the API host's
environment, never in the frontend or Git history.

## Local development


```powershell
npm ci
npm run dev
```

To run the API locally, copy `api/.env.example` to `api/.env`, set the database
and GitHub OAuth values, and set `ALLOWED_GITHUB_LOGINS` to the approved adult
GitHub login(s). Then run:

```powershell
npm ci --prefix api
npm --prefix api run db:push:mongodb
npm --prefix api run dev
```

Set `VITE_API_BASE_URL` in the root `.env` to the API URL. For production,
configure the matching GitHub OAuth callback, `FRONTEND_URL`, and
`ALLOWED_ORIGINS` on the API host. The site cannot sign in until a real OAuth
app and API are configured.

## Checks


```powershell
npm run build
npm --prefix api test
npm --prefix api run build
```

## Privacy and media


- Keep exact age, school, location, routines, contact details, and private
  account information offline.
- Use only a guardian-approved avatar or media. The checked-in avatar is a
  generic placeholder.
- The public playlist is empty. Visitor-selected music remains in that
  visitor's browser.
- Do not add credentials to `.env.example`; use local `.env` files or host
  environment settings, which are ignored by Git.

## 3D canvas and licenses


The background is generated procedurally; no third-party 3D models or textures
are included. Three.js, React Three Fiber, and Drei license notices are in
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md). Project source is covered
by [`LICENSE`](./LICENSE).

## Installable app and offline use

On supported browsers, choose **Install this app** in Settings or use the
browser's **Add to Home Screen** option. After the first online visit, the
service worker caches the app shell and static assets; previously opened pages
can then load offline. Music selected in the player is stored privately in
that site's IndexedDB on the current device. Browsers with the File System
Access API use its audio picker; other browsers keep the standard file picker.
Push notifications need a backend and are not enabled yet.

## Language metrics


<!-- language-metrics:start -->
| Language | Equal starter share | Measured source share | Files | File types | Starter |
|----------|---------------------|-----------------------|-------|------------|---------|
| 🦀 Rust | 12.5% | 1.3% | 1 | `.rs` | [Open](./starters/rust/README.md) |
| 🐹 Go | 12.5% | 1.2% | 2 | `.go` | [Open](./starters/go/README.md) |
| 🐍 Python | 12.5% | 2.7% | 4 | `.py` | [Open](./starters/python/README.md) |
| 🔷 TypeScript | 12.5% | 63.4% | 27 | `.ts, .tsx` | [Open](./starters/typescript/README.md) |
| ⚡ JavaScript | 12.5% | 1.2% | 4 | `.js, .mjs, .cjs` | [Open](./starters/javascript/README.md) |
| 🗃️ SQL | 12.5% | 0.9% | 5 | `.sql` | [Open](./starters/sql/README.md) |
| 🎨 CSS | 12.5% | 28.4% | 5 | `.css` | [Open](./starters/css/README.md) |
| 🌐 HTML | 12.5% | 0.9% | 2 | `.html, .htm` | [Open](./starters/html/README.md) |
<!-- language-metrics:end -->