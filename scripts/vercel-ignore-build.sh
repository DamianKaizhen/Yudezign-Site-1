#!/usr/bin/env bash
#
# Vercel "Ignored Build Step" — skip a production rebuild when a commit only
# touches admin-inbox data that is read live via the API and never bundled into
# the site (so it can't affect the built/prerendered output).
#
# Configure in Vercel: Settings -> Git -> Ignored Build Step ->
#     bash scripts/vercel-ignore-build.sh
#
# Vercel convention: exit 1 => build, exit 0 => skip build.
#
# The frequent admin writes (visualizer submissions, contact messages) then stop
# triggering the ~2-3min prerender build, while real content/code changes still
# rebuild normally. The admin panel keeps showing fresh data because it reads
# these files from GitHub through the API at request time.

set -euo pipefail

# Files that do NOT affect the built or prerendered site.
API_ONLY_RE='^src/data/(visualizerSubmissions|contactMessages)\.ts$'

# Diff the current commit against its parent. Vercel provides enough history for
# HEAD^ in the Ignored Build Step context; if not, default to building.
if ! changed="$(git diff --name-only HEAD^ HEAD 2>/dev/null)"; then
  echo "Ignore-build: no diff available — building to be safe."
  exit 1
fi

if [ -z "$changed" ]; then
  echo "Ignore-build: empty diff — building to be safe."
  exit 1
fi

while IFS= read -r file; do
  [ -z "$file" ] && continue
  if ! printf '%s' "$file" | grep -qE "$API_ONLY_RE"; then
    echo "Ignore-build: '$file' affects the site — proceeding with build."
    exit 1
  fi
done <<< "$changed"

echo "Ignore-build: only API-only admin data changed — skipping build."
exit 0
