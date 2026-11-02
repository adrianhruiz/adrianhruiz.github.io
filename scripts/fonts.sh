#!/usr/bin/env bash
# Downloads the site fonts from Google Fonts and subsets them to the characters the site
# uses, so each file stays small. Requires curl and uv (runs fonttools through uvx).
# Run from anywhere: scripts/fonts.sh
set -euo pipefail

cd "$(dirname "$0")/../public/fonts"

# Basic Latin plus the typographic symbols used in the copy (·, –, ’, ©, ↗, non-breaking hyphen)
UNICODES="U+0020-007E,U+00A0,U+00A9,U+00B7,U+2011,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2026,U+2197"

declare -A FONTS=(
  [barlow-400]=https://fonts.gstatic.com/s/barlow/v13/7cHpv4kjgoGqM7E_DMs5.woff2
  [barlow-500]=https://fonts.gstatic.com/s/barlow/v13/7cHqv4kjgoGqM7E3_-gs51os.woff2
  [barlow-600]=https://fonts.gstatic.com/s/barlow/v13/7cHqv4kjgoGqM7E30-8s51os.woff2
  [barlow-condensed-700-italic]=https://fonts.gstatic.com/s/barlowcondensed/v13/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrY3Tmu4kG.woff2
  [barlow-condensed-800-italic]=https://fonts.gstatic.com/s/barlowcondensed/v13/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrf3fmu4kG.woff2
  [jetbrains-mono-400]=https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff2
)

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

for name in "${!FONTS[@]}"; do
  curl -sf "${FONTS[$name]}" -o "$tmp/$name.woff2"
  uvx --quiet --from 'fonttools[woff]' pyftsubset "$tmp/$name.woff2" \
    --unicodes="$UNICODES" --layout-features='kern,liga' --no-hinting \
    --flavor=woff2 --output-file="$name.woff2"
done
