#! /bin/bash

registry="139814396959.dkr.ecr.ap-south-1.amazonaws.com"

echo "[>] Getting aws credentials and docker login"
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin $registry
echo "[>] Login successful"

echo "[>] Starting build"

function build_and_push() {
  local name=$1

  # Check if name is empty string
  if [[ -z "$name" ]]; then
    echo "[!] Repository name suffix is missing"
    exit 1
  fi

  local path=${2:-"./$name"}
  local repo_name="budget-manager-$name"
  local image="$registry/$repo_name:latest"

  echo "[+] Building $repo_name"
  docker build -t $repo_name $path --platform=linux/amd64

  # Check if build process failed
  if [ $? -ne 0 ]; then
    echo "[!] Build process failed for $repo_name"
    exit 1
  fi

  docker tag $repo_name:latest $image

  echo "[+] Pushing $image"
  docker push $image

  # Check if image push failed
  if [ $? -ne 0 ]; then
    echo "[!] Unable to push $image"
    exit 1
  fi
}

build_and_push nginx
build_and_push mongodb ./db
build_and_push backend
build_and_push client

echo "[>] Done."
