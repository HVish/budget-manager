#! /bin/bash

registry="139814396959.dkr.ecr.ap-south-1.amazonaws.com"

echo "[>] Getting aws credentials and docker login"
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin $registry
echo "[>] Login successful"

echo "[>] Starting deployment"

echo "[+] Remove containers, volume and networks older than 1 week..."
docker system prune --force --filter "until=168h"

function pull_image() {
  local name=$1

  # Check if name is empty string
  if [[ -z "$name" ]]; then
    echo "[!] Repository name suffix is missing"
    exit 1
  fi

  local repo_name="budget-manager-$name"
  local image="$registry/$repo_name:latest"

  echo "[+] Pull image $image"
  docker pull $image

  # Check if docker pull failed
  if [ $? -ne 0 ]; then
    echo "[!] Failed to pull image $image"
    exit 1
  fi
}

pull_image nginx
pull_image mongodb
pull_image backend
pull_image client


echo "[+] Restarting containers"
docker compose up -d

echo "[>] Deployment done."
