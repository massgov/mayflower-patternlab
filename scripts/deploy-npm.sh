#!/bin/bash
# include shared functions
. ../scripts/deploy-s3-functions.sh

# Deploying a branch or tag Mayflower to Amazon S3:
#   mayflower.digital.mass.gov/git-branch-or-tag-name
# -----------------------------------------------------
#
# Run from /styleguide, must have a clean working directory.
#
# Usage:
# ../scripts/deploy-npm.sh [-b (git-branch-or-tag)]
#   -b Build source: the git branch or tag from which to build (deploys to subdirectory named by that branch or tag) (required)
#
# Description:
# 1. Validate the passed arguments: build source
# 2. Attempt to checkout passed build source
# 3. Get to mayflower/styleguide directory
# 4. Write config to support hosting from subdirectory, if necessary
# 5. Build pattern lab static assets
# 6. Copy static assets (build output: styleguide/public/) into a new temp directory
# 7. Execute gulp command to deploy to s3
# 8. Remove the temp directory
# 9. Check out the previous branch

# Default variables
buildSrc=false

# Get passed arguments
while getopts :b: option
do
    case "${option}" in
        b) buildSrc=${OPTARG};;
        : ) line="Missing argument for parameter [-${OPTARG}]";
              log "error" "$line";
              exit 1;;
        \? ) line="Whoops, this script only accepts arguments for: git build branch/tag [-b]";
             log "error" "$line";
             exit 1;;
    esac
done

# 1. Validate build source environment argument exists and is valid git branch or tag name
validateBuildSource

# 2. Checkout the build source
checkoutBuildSource

line="You've indicated a deploy to npm @${buildSrc}"
log "log" "$line";

# 3. Get to styleguide directory
cdStyleguide

# 4. Build pattern to generate prod static assets
buildMayflower

# 5. Copy built assets in /public into new tmp directory
# Make temp directory to copy public assets
line="Making ~/tmp/mayflower/npm directory..."
log "log" "$line";

if [ -d "~/tmp" ];
then
    mkdir ~/tmp/mayflower
else
    mkdir ~/tmp
    mkdir ~/tmp/mayflower
fi

# Copy
line="Copying Pattern Lab build output to ~/tmp/mayflower/npm directory..."
log "log" "$line";
cp -r public/assets/. ~/tmp/mayflower >/dev/null
cp package.json ~/tmp/mayflower
cp npm-shrinkwrap.json ~/tmp/mayflower
cp README.md ~/tmp/mayflower
cp LICENSE ~/tmp/mayflower
cp -a ./.npmignore ~/tmp/mayflower

# Get to tmp directory
cd ~/tmp/mayflower

# run npm pack to test
npm pack

# 8. Clean up tmp directory + #9 get back to where we want to be.
#cleanup
