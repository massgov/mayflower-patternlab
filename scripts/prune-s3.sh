#!/bin/bash
# include shared functions
. ../scripts/deploy-s3-functions.sh

# Remove Mayflower S3 subdirectory/object for git branch whose PR has been closed/merged
# --------------------------------------------------------------------------------------
#
# Run from /styleguide, must have a clean working directory.
#
# Usage:
# ../scripts/prune-s3.sh [-r (pull request)]
#   -r Pull request: the github PR event (required)
#
# Description:
# 1. Validate the passed arguments: pull request
# 2. Attempt to get pull request event object from passed endpoint
# 3. Determine if the pull request was closed (includes merged)
# 3. Validate that humans have aws cli installed
# 4. Get the branch name from the PR endpoint event object
# 5. Remove the aws object (recursive) which corresponds to the branch name

# Default variables
prEndpoint=false

if [ ! CI_PULL_REQUEST ];
then
     line="This build is not associated with a pull request so there is nothing to prune; exiting..."
    log "log" "$line";
    exit 1
fi

echo CI_PULL_REQUEST
echo CI_PULL_REQUESTS

# Set pull request environment variable in local variable.
prEndpoint=CI_PULL_REQUEST

# 1. Validate build source environment argument exists and is valid git branch or tag
# validateBuildSource
line="This is CI_PULL_REQUEST for this build:\n\n ${prEndpoint}"
log "log" "$line";

# Confirm latest minor and production deploys if a human is executing this script.
if [ ! CIRCLECI ];
then
    read -p "This script requires the use of aws cli.\n\nSee: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html.\n\nDo you have aws cli installed on your machine? [y/n] " -n 1 -r
    echo    # move to a new line
    if [[ ! $REPLY =~ ^[Yy]$ ]];
    then
        line="Aborting execution... Download and install the cli, then execute the script again."
        log "error" "$line";
        exit 1;
    fi
fi

