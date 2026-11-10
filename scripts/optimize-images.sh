#!/usr/bin/env bash
# Generates the responsive WebP variants used by the site. Requires ImageMagick.
# Run from the repo root after replacing the avatar:
#   scripts/optimize-images.sh
set -euo pipefail

cd "$(dirname "$0")/../public"

# Avatar: shown at 76px, so 2x covers high-density screens
magick photo.webp -resize 152x152 -strip -quality 85 photo-152.webp
