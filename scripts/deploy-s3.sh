#!/bin/bash
# include shared functions
. ../scripts/deploy-s3-functions.sh

# Deploying a branch or tag Mayflower to Amazon S3:
#   mayflower.digital.mass.gov/git-branch-or-tag-name
# -----------------------------------------------------
#
# Run from the repo root, must have a clean working directory.
#
# Usage:
# ./scripts/deploy-s3.sh [-b (git-branch-or-tag)]
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
buildSrc=false # Set to true in parseArgs

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

# 3. Get to styleguide directory
cdStyleguide

line="You've indicated a deploy to mayflower.digital.mass.gov/${buildSrc}"
log "log" "$line";

# 4. Set the domain and asset path config
# If we're deploying something that doesn't have the url.json.example file, create it first
createUrlJson

# Determine the url.assetsPath based arguments passed
# For root deploy (passed in -p):  url.assetsPath = assets (already set by default)
# For latest minor deploy (passed in -m): = url.assetsPath = <latest minor determined by build source tag>/assets
# For all other deploys: url.assetsPath = <build source branch or tag name>/assets

domain="https://mayflower.digital.mass.gov"
subDir="$buildSrc"
# Configure assets path accordingly.
assetsPath="$subDir/assets"

# Set url.domain and url.assetsPath
writeAssetsPathConfig

# 5. Build pattern to generate prod static assets
buildMayflower

# 6. Copy built assets in /public into new tmp directory
# Make temp directory to copy public assets
line="Making ~/tmp/mayflower/$subDir directory..."
log "log" "$line";

if [ -d "~/tmp" ];
then
    mkdir ~/tmp/mayflower
    mkdir ~/tmp/mayflower/${subDir}
else
    mkdir ~/tmp
    mkdir ~/tmp/mayflower
    mkdir ~/tmp/mayflower/${subDir}
fi

# Copy
line="Copying Pattern Lab build output to ~/tmp/mayflower/$subDir directory..."
log "log" "$line";
cp -r public/. ~/tmp/mayflower/${subDir} >/dev/null

# 7. Run gulp task to deploy to s3 bucket
line="Uploading contents of ~/tmp/mayflower/$subDir to Mayflower s3 bucket..."
log "log" "$line";
if ! gulp s3; then
    line="gulp s3 task failed"
    log "error" "$line";
    exit 1;
else
    line="Woo-hoo! The deploy completed successfully.\n\n    You should be able to browse to your deployed code at:\n\n     https://mayflower.digital.mass.gov/${subDir}/index.html"
    log "success" "$line";
fi

# 8. Clean up tmp directory + #9 get back to where we want to be.
cleanup
