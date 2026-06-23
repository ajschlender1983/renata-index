#!/usr/bin/env bash
# Regenerate the Renata PNG icon set from the SVG sources.
# Primary path uses macOS Quick Look (no extra installs). If you have rsvg-convert
# or cairosvg, swap the RENDER function for crisper output.
set -euo pipefail
cd "$(dirname "$0")"
OUT="icons"; TMP="$(mktemp -d)"; mkdir -p "$OUT"

render() { # render <svg> <out.png> at 512 then it gets resized below
  qlmanage -t -s 512 -o "$TMP" "$1" >/dev/null 2>&1
  echo "$TMP/$(basename "$1").png"
}

FAV="$(render renata-favicon.svg)"
APP="$(render renata-app-icon.svg)"

for s in 16 32 48; do sips -z $s $s "$FAV" --out "$OUT/favicon-$s.png" >/dev/null; done
sips -z 180 180 "$APP" --out "$OUT/apple-touch-icon.png" >/dev/null
sips -z 192 192 "$APP" --out "$OUT/icon-192.png"        >/dev/null
sips -z 512 512 "$APP" --out "$OUT/icon-512.png"        >/dev/null

rm -rf "$TMP"
echo "Icons written to $OUT/  (favicon.svg is the primary; PNGs are fallbacks)."
