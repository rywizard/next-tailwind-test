#!/bin/bash

# Exit immediately if any command fails
set -e

# Run the Docker container
docker run -p 3000:3000 nextjs-app

echo "Next.js app is running on http://localhost:3000"
