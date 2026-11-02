#!/usr/bin/env bash
# Generates the responsive WebP variants used by the site. Requires ImageMagick.
# Run from the repo root after adding or replacing an image:
#   scripts/optimize-images.sh
set -euo pipefail

cd "$(dirname "$0")/../public"

# Project screenshots: one variant per width listed in projects.json ("widths")
for source in projects/*.jpg; do
  base="${source%.jpg}"
  for width in 480 960 1440; do
    magick "$source" -resize "${width}x>" -strip -quality 80 "${base}-${width}.webp"
  done
done

# Avatar: shown at 76px, so 2x covers high-density screens
magick photo.webp -resize 152x152 -strip -quality 85 photo-152.webp
