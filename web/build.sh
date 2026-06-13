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
"$BUN" build src/main.ts --outdir dist --target browser --minify
echo "built dist/main.js"
