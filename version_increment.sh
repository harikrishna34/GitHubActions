#!/bin/bash

COMMIT_MESSAGE=$(git log -1 --pretty=%B)

if [[ $COMMIT_MESSAGE == *"[breaking]"* ]]; then
  BUMP="major"
elif [[ $COMMIT_MESSAGE == *"[feature]"* ]]; then
  BUMP="minor"
elif [[ $COMMIT_MESSAGE == *"[fix]"* ]]; then
  BUMP="patch"
else
  echo "No version bump detected. Using default patch."
  BUMP="patch"
fi

# Get the last tag and increment the version or set an initial version
LAST_TAG=$(git tag --sort=committerdate | grep -E '[0-9]' | tail -1)
if [ -z "$LAST_TAG" ]; then
  CURRENT_VERSION="1.0.0"  # Set an initial version if no previous version exists
else
  CURRENT_VERSION=$(echo "$LAST_TAG" | sed 's/v//')
fi

case $BUMP in
  major) NEW_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{$1 = $1 + 1; $2 = 0; $3 = 0; print}' OFS=.);;
  minor) NEW_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{$2 = $2 + 1; $3 = 0; print}' OFS=.);;
  patch) NEW_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{$3 = $3 + 1; print}' OFS=.);;
esac

echo "Version Bump: $BUMP"
echo "Current Version: $CURRENT_VERSION"
echo "New Version: $NEW_VERSION"

# Tag and commit
git tag -a "$NEW_VERSION" -m "Version $NEW_VERSION"
git push --tags