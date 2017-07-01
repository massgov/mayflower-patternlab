#!/bin/bash
#
# Deploying Mayflower to Github Pages
# -----------------------------------------------------
#
# Run from the repo root, must have a clean working directory.
#
# Usage:
# ./scripts/deploy-gh-pages.sh [-b (git-branch-or-tag)] [-t (remote-repo)]
#   -b Build source: the git branch or tag to build from (required)
#   -t Target: the remote repo whose gh-pages branch is being pushed to (required)
#
#   Example: ./scripts/deploy-gh-pages.sh -t jesconstantine/mayflower -b DP-1234-my-branch-name
#
# Description:
# 1. Validate the passed arguments: build source and target repo
# 2. Attempt to checkout passed build source
# 3. Build pattern lab static assets
# 4. Copy static assets (build output: styleguide/public/) into a new temp directory
# 5. Initialize a temp repo in the temp directory
# 6. Commit all of the static asset files
# 7. Add the passed target as remote
# 8. Push all build assets to target remote gh-pages branch
# 9. Remove the temp directory
# 10. Get back to mayflower/styleguide directory
# 11. Check out prior branch
#
# @todo
# - use AWS cli to push/rsync to bucket
# - build into ci process

# Steps to clean up after script execution
# Runs on success and failure.
function cleanup {
    # Cleanup
    echo "Getting back to previous directory..."
    cd -

    echo "Cleaning up temp dir..."
    rm -rf ~/tmp/mayflower

    # Check out the previous branch
    echo "Checking out your previous branch..."
    git checkout @{-1}
}

# Output success or error log during execution
function log {
    # parameters
    local theLogType=$1
    local theMessage=$2

    if [[ "$theLogType" == "success" ]]; then
        echo -e "\n\x1B[01;92m"$theMessage"\x1B[0m \n"
    else
        echo -e "\n \x1B[01;91m"$theMessage"\x1B[0m \n" >&2
    fi
}

# Default arguments
targetEnv=false
buildSrc=false

# Get passed arguments
while getopts :b:t: option
do
    case "${option}" in
        b) buildSrc=${OPTARG};;
        t) targetEnv=${OPTARG};;
        : ) line="Missing argument for parameter [-${OPTARG}]";
              log "error" "$line";
              exit 1;;
        \? ) line="Whoops, this script only accepts arguments for: git build branch/tag [-b] and target repo [-t]";
             log "error" "$line";
             exit 1;;
    esac
done

# Validate build source environment argument exists
if [ "$buildSrc" = false ];
then
    line="Whoops, we need a git branch or tag name to checkout and build from [-b]."
    log "error" "$line";
    exit 1;
fi

# Validate target environment argument exists
if [ "$targetEnv" = false ];
then
    line="Whoops, we need a target repo that we can push to [-t]."
    log "error" "$line";
    exit 1;
fi

# Validate that passed build source is a valid git branch or tag
git rev-parse ${buildSrc} &>/dev/null
if [ "$?" -ne 0 ];
then
    line="Hmmm, couldn't find a branch/tag named ${buildSrc} ... check spelling and make sure you've pulled it."
    log "error" "$line";
    exit 1;
else
    line="Validated git build source: ${buildSrc} ..."
    log "success" "$line";
fi

# Validate that passed target argument is a valid remote repo
TARGET_URL="git@github.com:"${targetEnv}".git"
git ls-remote ${TARGET_URL} &>/dev/null
if [ "$?" -ne 0 ];
then
    line="Unable to reach remote repo at '${TARGET_URL}'. Check your target repo, should be something like 'yourGithubUsername/mayflower'."
    log "error" "$line";
    exit 1;
else
    line="Validated target remote repo url: ${TARGET_URL}..."
    log "success" "$line";
fi

# Confirm a deploy to prod if "massgov/mayflower" provided as target.
if [ ${targetEnv} = "massgov/mayflower" ];
then
    read -p "You've indicated a deploy to prod, are you sure?" -n 1 -r
    echo    # move to a new line
    if [[ ! $REPLY =~ ^[Yy]$ ]];
    then
        exit 1;
    fi
fi

# Local variables
NOW=$(date +"%c")
MESSAGE="GH Pages deployed ${buildSrc} on: ${NOW}"

# checkout the latest tag/release
echo "Checking out the build source: ${buildSrc}"
git checkout ${buildSrc}

# Get to styleguide directory (inside of repo root), does not assume repo root is "mayflower"
echo "Changing directory into mayflower repo root/styleguide"
cd $(git rev-parse --show-toplevel)/styleguide

# Build pattern to generate prod static assets
echo "Building mayflower static assets..."
gulp build prod

# Make temp directory to copy public  assets
echo "Making ~/tmp/mayflower directory..."
if [ -d "~/tmp" ];
then
    mkdir ~/tmp/mayflower
else
    mkdir ~/tmp
    mkdir ~/tmp/mayflower
fi

# Copy built assets in /public into temp directory
echo "Copying PL build output to ~/tmp/mayflower directory..."
cp -R public ~/tmp/mayflower

# Get to temp directory build output
echo "Changing directory to ~/tmp/mayflower/public..."
cd ~/tmp/mayflower/public

# Initialize temp git repo + push up to gh-pages
echo "Creating temporary repo and committing build to master branch..."
git init
git add .
git commit -m "$MESSAGE"

echo "Adding ${TARGET_URL} as a remote and force pushing build to gh-pages branch..."
git remote add target ${TARGET_URL}

# Make sure we can push to remote, return success or error based on result.
if [[ "$(git push target master:refs/heads/gh-pages --force --porcelain)" == *"Done"* ]]
then
    line="Git push was successful!"
    log "success" "$line";
    cleanup
    # Success message.
    line="Woo-hoo! Deploy complete! You should be able to see your updates at: \n http(s)://<username>.github.io/<projectname> \n (i.e. http://jesconstantine.github.io/mayflower)."
    log "success" "$line";
else
    line="Hmmm, looks like we couldn't push.  Check your remote repo permissions."
    log "error" "$line";
    cleanup
    line="Bummer! Deploy unsuccessful. Check your spellings for git branches + remotes.  And check your permissions.  Then try again!"
    log "error" "$line";
    exit 1;
fi
