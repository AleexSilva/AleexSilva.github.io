#!/usr/bin/env bash
set -euo pipefail

echo "Stopping portfolio container..."
docker stop alex-portfolio 2>/dev/null || true
docker rm   alex-portfolio 2>/dev/null || true
echo "Portfolio stopped."
