#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INDEX="$ROOT/index.html"
STYLE="$ROOT/css/style.css"
COPY="$ROOT/js/copy.js"
MAIN="$ROOT/js/main.js"

for file in "$INDEX"; do
  grep -E '<script[^>]+src="[^"]+\?v=' "$file" >/dev/null
  grep -E '<link[^>]+href="[^"]+\?v=' "$file" >/dev/null
  ! grep -E 'href="#"|href=""' "$file" >/dev/null
  ! grep -E 'removeAttribute\(\s*["'"'']data-theme["'"'']\s*\)' "$ROOT"/*.html "$ROOT"/js/*.js 2>/dev/null
done

node --check "$COPY" >/dev/null
node --check "$MAIN" >/dev/null

grep -q 'applyTheme(getEffectiveTheme())' "$MAIN"
grep -q 'color: var(--btn-primary-text);' "$STYLE"
if grep -E '#[0-9a-fA-F]{3,6}' "$STYLE" >/dev/null; then
  echo "Hardcoded hex colors found in style.css"
  exit 1
fi

echo "pre-push-check passed"
