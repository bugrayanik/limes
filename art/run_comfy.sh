#!/usr/bin/env bash
# Launch ComfyUI with memory-safe flags for the RTX 4060 (8GB VRAM / 14GB RAM) box.
#
# Why this exists: launched bare, ComfyUI uses normalvram and caches model weights
# in system RAM. On this machine that pushes the python process past ~10GB RSS and
# the kernel OOM-killer SIGKILLs it (signal 9) mid model-load — "opens then closes".
# See dmesg oom-kill events 2026-06-13 19:58 and 21:43.
#
# The flags below keep the resident footprint small:
#   --lowvram     stream model blocks to GPU on demand instead of holding them all
#   --cache-none  don't retain models in RAM between prompts (the main RAM hog)
#   --disable-smart-memory  free weights aggressively instead of keeping them warm
#
# Usage:  ./run_comfy.sh        (then run:  python3 comfy_render.py pilot)
set -euo pipefail

COMFY_DIR="$HOME/dev/ComfyUI"

# Warn (don't fail) if free RAM is tight — extra swap turns a hard kill into "slow".
avail_mb=$(awk '/MemAvailable/ {print int($2/1024)}' /proc/meminfo)
if [ "$avail_mb" -lt 6000 ]; then
  echo "WARN: only ${avail_mb}MB RAM available. Close other apps, or add swap:"
  echo "  sudo fallocate -l 8G /swap2.img && sudo chmod 600 /swap2.img"
  echo "  sudo mkswap /swap2.img && sudo swapon /swap2.img"
fi

cd "$COMFY_DIR"
# shellcheck disable=SC1091
source venv/bin/activate

exec python3 main.py \
  --lowvram \
  --cache-none \
  --disable-smart-memory \
  "$@"
