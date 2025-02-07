#!/bin/bash

# Exit immediately if any command fails
set -e

# Build the Docker image
docker build -t nextjs-app .

echo "Docker image built successfully!"
