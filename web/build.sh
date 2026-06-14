#!/usr/bin/env bash
# Bundle the TS sources into a single browser script (dist/main.js).
# The engine is dependency-free (pure-JS sha1, no node:crypto), so it bundles
# clean for the browser. Output is committed so the prototype deploys to
# GitHub Pages with no build step on the host.
#
# Usage:  ./build.sh            (then serve the repo root and open /web/index.html)
#         python3 -m http.server 8000   # from repo root
set -euo pipefail
cd "$(dirname "$0")"
BUN="${BUN:-$HOME/.bun/bin/bun}"
# IIFE (not ESM) so a plain <script> tag runs even from file:// — i.e. the game
# works by just double-clicking index.html, no local server required.
"$BUN" build src/main.ts --outdir dist --target browser --format=iife --minify
# Stamp a content-hash onto the <script> src so each deploy busts the browser
# cache (GitHub Pages serves main.js with a 10-min max-age that otherwise hides
# fresh deploys).
H=$(md5sum dist/main.js | cut -c1-8)
sed -i -E 's#(\./dist/main\.js)(\?v=[a-f0-9]+)?#\1?v='"$H"'#' index.html
echo "built dist/main.js (stamped ?v=$H)"
