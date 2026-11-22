# Security and privacy

This is a public, family-managed site for a young person. Do not publish an
exact age, school, location, schedule, contact details, private media, or
credentials.

## Sign-in

The protected area uses GitHub OAuth. The API must be configured with
`ALLOWED_GITHUB_LOGINS`; only those approved adult accounts may create or use a
profile. The API stores a GitHub profile record and hashed session tokens, not
GitHub access tokens. Keep OAuth client secrets and database credentials in
the API host's environment.

The frontend is static and publicly readable. Hiding a route or source file is
not access control; private data must be checked by the API on every request.

## Media and browser storage

Only add media approved by a parent or guardian and licensed for publication.
Visitor-selected music and saved playback preferences stay in that visitor's
browser; the site does not upload them.

## Reporting a vulnerability

Please use the repository's private vulnerability reporting feature when
available. Do not publish exploit details, credentials, or personal
information in a public issue.
