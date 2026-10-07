#!/usr/bin/env bash
# Uploads the site's media to the Cloudflare R2 bucket served at
# https://media.upperlayerstudio.com, keeping the public/ paths:
#   videos   public/work/newsbit/showcase.mp4  -> work/newsbit/showcase.mp4
#   images   .media/work/newsbit/01.w1280.webp -> work/newsbit/01.w1280.webp
# (the image variants come from scripts/build-media.mjs; see src/lib/media.ts).
#
#   npx wrangler login               # once; opens Cloudflare in the browser
#   node scripts/build-media.mjs     # after adding or replacing an image
#   bash scripts/upload-media.sh     # everything
#   bash scripts/upload-media.sh public/work/newsbit/showcase.mp4   # just these
set -euo pipefail

BUCKET="upperlayer-media"
PARALLEL=6
cd "$(dirname "$0")/.."

if [ "$#" -gt 0 ]; then
  printf '%s\n' "$@" > /tmp/ul-media-files
else
  {
    find public/work public/hero -type f -name "*.mp4"
    find .media -type f -name "*.webp"
  } | sort > /tmp/ul-media-files
fi

total=$(wc -l < /tmp/ul-media-files | tr -d ' ')
echo "Uploading $total files to $BUCKET ($PARALLEL at a time)..."

upload_one() {
  f="$1"
  key="${f#public/}"
  key="${key#.media/}"
  case "$f" in
    *.mp4) type="video/mp4" ;;
    *.webp) type="image/webp" ;;
    *.jpg) type="image/jpeg" ;;
    *) type="application/octet-stream" ;;
  esac
  if npx --yes wrangler r2 object put "$BUCKET/$key" --file "$f" --content-type "$type" \
    --cache-control "public, max-age=604800, stale-while-revalidate=86400" --remote >/dev/null 2>&1; then
    echo "ok   $key"
  else
    echo "FAIL $key"
  fi
}
export -f upload_one
export BUCKET

xargs -P "$PARALLEL" -I{} bash -c 'upload_one "$@"' _ {} < /tmp/ul-media-files | tee /tmp/ul-media-log
fails=$(grep -c '^FAIL' /tmp/ul-media-log || true)
echo "Done: $((total - fails)) uploaded, $fails failed."
[ "$fails" -eq 0 ] || { echo "Re-run for the failed ones:"; grep '^FAIL' /tmp/ul-media-log; exit 1; }
