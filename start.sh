#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Read API key from environment or fall back to .env file
if [[ -z "${OPENROUTER_API_KEY:-}" ]] && [[ -f .env ]]; then
  KEY="$(grep -m1 '^OPENROUTER_API_KEY=' .env | cut -d= -f2-)"
else
  KEY="${OPENROUTER_API_KEY:-}"
fi

if [[ -z "$KEY" ]]; then
  echo "Warning: OPENROUTER_API_KEY is not set. The Digital Twin chat will not work."
fi

# Remove stale container if it exists
docker rm -f alex-portfolio 2>/dev/null || true

echo "Building Docker image..."
docker build -t alex-portfolio .

echo "Starting container..."
docker run -d \
  --name alex-portfolio \
  --restart unless-stopped \
  -p 3000:3000 \
  -e OPENROUTER_API_KEY="$KEY" \
  alex-portfolio

echo ""
echo "Portfolio is running → http://localhost:3000"
