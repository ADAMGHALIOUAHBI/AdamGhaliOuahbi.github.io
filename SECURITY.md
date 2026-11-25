# Security and privacy

## Scope and ownership

This public, family-managed website is maintained by
[@ADAMGHALIOUAHBI](https://github.com/ADAMGHALIOUAHBI) as part of the ECO-SYS
ecosystem. Keep a child's exact age, school, location, schedule, contact
details, private media, and credentials out of public pages and repository
content.

The static website is publicly readable. A hidden route, source file, or
client-side check is not access control. Private data and protected actions
must be checked by the API on every request.

## Family account access

The repository owner and guardian approve maintainers and accounts permitted
to use protected family features. The API must enforce an exact
`ALLOWED_GITHUB_LOGINS` allowlist server-side and deny access when it is
missing, empty, or invalid. Never add a child's account to the allowlist.
Possession of a valid GitHub account or access to the public repository is not
approval.

Keep GitHub OAuth secrets and database credentials only in the API host's
environment or an ignored local `.env` file. Do not store GitHub access tokens
in the database, browser storage, logs, or source control. Restrict OAuth,
repository, database, and hosting permissions to approved adults who need
them.

## Media and browser storage

Only publish media approved by a parent or guardian and licensed for use.
Visitor-selected files and playback preferences remain in that visitor's
browser; do not assume they are encrypted or uploaded by the site. Do not put
private URLs or personal information in public profile fields or playlists.

## Vulnerability reporting

Do not publish details of an unpatched vulnerability in a public discussion.
Use this repository's GitHub private vulnerability reporting when available.
Otherwise, contact
[@ADAMGHALIOUAHBI](https://github.com/ADAMGHALIOUAHBI) privately.
Remove credentials, private links, and children's personal information from
reports.
