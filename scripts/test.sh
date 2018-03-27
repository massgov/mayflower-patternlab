#!/bin/bash
# include shared functions
. ../scripts/deploy-s3-functions.sh

# Deploying a branch or tag Mayflower to Amazon S3:
#   mayflower.digital.mass.gov/git-branch-or-tag-name/
# -----------------------------------------------------
#
# Run from /styleguide, must have a clean working directory.
#
# Usage:
# ../scripts/deploy-s3.sh [-b (git-branch-or-tag)]
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
#validateBuildSource "$buildSrc"

# 2. Checkout the build source
#checkoutBuildSource "$buildSrc"
domain="https://mayflower.digital.mass.gov"
subDir="$buildSrc"

echo "$domain/$subDir"

buildMayflower "$domain/$subDir"