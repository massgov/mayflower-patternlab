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
#   -t Target repo owner: the target remote repo owner whose gh-pages branch is being pushed (required).
#              This will often be the <your-github-username>.  For prod releases, this is "massgov".
#   -c CNAME record: a custom domain to point to Github Pages (required only when deploying to prod: "mayflower.digital.mass.gov")
#   -a Assets path: the root relative path to the assets/ directory i.e. 'mayflower/assets' (only required when passing a cname [-c] for an environment which will not serve Mayflower from the root directory)
#
#   Example: ./scripts/deploy-gh-pages.sh -t massgov -b DP-1234-my-branch-name -c mayflower.digital.mass.gov
#
# Description:
# 1. Validate the passed arguments: build source and target repo
# 2. Attempt to checkout passed build source
# 3. Write config to support hosting from subdirectory, if necessary
# 4. Build pattern lab static assets
# 5. Copy static assets (build output: styleguide/public/) into a new temp directory
# 6. Initialize a temp repo in the temp directory
# 7. Commit all of the static asset files (+ create a CNAME file for stage / prod)
# 8. Add the passed target as remote
# 9. Push all build assets to target remote gh-pages branch
# 10. Get back to mayflower/styleguide directory
# 11. Remove the temp directory
# 12. Check out prior branch

# @todo
# - use AWS cli to push/rsync to bucket
# - build into ci process

# Steps to clean up after script execution
# Runs on success and failure.
function cleanup {
    # 10. Get back to mayflower/styleguide directory
    line="Getting back to previous directory..."
    log "log" "$line";

    cd -

    # 11. Remove temp directory
    line="Cleaning up tmp dir..."
    log "log" "$line";

    rm -rf ~/tmp/mayflower

    # 12. Check out the previous branch
    line="Checking out your previous branch..."
    log "log" "$line";

    git checkout @{-1}
}

# Output success or error log during execution
function log {
    # parameters
    local theLogType=$1
    local theMessage=$2

    if [ "$theLogType" == "success" ]; then
        echo -e "\n\x1B[01;92m [success] "${theMessage}"\x1B[0m \n"
    elif [ "$theLogType" == "error" ]; then
        echo -e "\n\x1B[01;91m [error] "${theMessage}"\x1B[0m \n" >&2
    else
        echo -e "\n\x1B[01;34m [info] "${theMessage}"\x1B[0m \n"
    fi
}

# Default arguments
targetEnv=false
buildSrc=false
cname=false
assetsPath=false

# Get passed arguments
while getopts :b:t:c:a: option
do
    case "${option}" in
        a) assetsPath=${OPTARG};;
        b) buildSrc=${OPTARG};;
        t) owner=${OPTARG}
            targetEnv="${owner}/mayflower";;
        c) cname=${OPTARG};;
        : ) line="Missing argument for parameter [-${OPTARG}]";
              log "error" "$line";
              exit 1;;
        \? ) line="Whoops, this script only accepts arguments for: git build branch/tag [-b] and target repo [-t]";
             log "error" "$line";
             exit 1;;
    esac
done

# 1. Validate build source environment argument exists
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
    line="Hmmm, couldn't find a branch/tag named ${buildSrc}... check spelling and make sure you've pulled it."
    log "error" "$line";
    exit 1;
else
    line="Validated git build source: ${buildSrc}..."
    log "success" "$line";
fi

# Validate that passed target argument is a valid remote repo
TARGET_URL="git@github.com:"${targetEnv}".git"
git ls-remote ${TARGET_URL} &>/dev/null
if [ "$?" -ne 0 ];
then
    line="Unable to reach remote repo at '${TARGET_URL}'. Check your target repo, should be something like '<your-github-username>/mayflower'."
    log "error" "$line";
    exit 1;
else
    line="Validated target remote repo url: ${TARGET_URL}..."
    log "success" "$line";
fi

# Confirm a deploy to prod if "massgov/mayflower" provided as target.
if [ ${targetEnv} = "massgov/mayflower" ];
then
    read -p "You've indicated a deploy to production ([-t] massgov/mayflower), are you sure? [y/n] " -n 1 -r
    echo    # move to a new line
    if [[ ! $REPLY =~ ^[Yy]$ ]];
    then
        line="Aborting deploy.  Execute the script again with a different value for [-t]."
        log "error" "$line";
        exit 1;
    fi

    # Make sure cname argument (i.e. mayflower.digital.mass.gov) is passed for production deploys.
    if [ "${cname}" = false ];
    then
        line="Please include a cname value for production deployments.  Execute the script again with a value for [-c] i.e. 'mayflower.digital.mass.gov'."
        log "error" "$line";
        exit 1;
    fi
fi

# Local variables
NOW=$(date +"%c")
MESSAGE="GH Pages deployed ${buildSrc} on: ${NOW}"

# 2. Checkout the build source
line="Checking out the build source: ${buildSrc}"
log "log" "$line";

git checkout ${buildSrc}

# Get to styleguide directory (inside of repo root), does not assume repo root is "mayflower"
line="Changing directory into mayflower/styleguide..."
log "log" "$line";

cd $(git rev-parse --show-toplevel)/styleguide

# 3. Set the domain and asset path config
# When there is a cname: url.domain = cname, url.assetsPath = assets
# When there is no cname: url.domain = <githug-username>.github.io, url.assetsPath = mayflower/assets
line="Setting the domain and asset path config..."
log "log" "$line";

# If we're deploying something that doesn't have the url.json.example file, create it first
if [ ! -f ./source/_data/url.json.example ];
    then
        urljson='{\n\t"url": {\n\t\t"comment": "Save this file as url.json and enter your domain and the path to the assets folder",\n\t\t"domain": "http://localhost:3000",\n\t\t"assetsPath": "assets"\n\t}\n}'
        echo -e ${urljson} > ./source/_data/url.json.example

        # Set flag to undo these changes in the working directory before leaving script.
        cleanup=true
fi

# Create url.json from the .example and set the appropriate domain and assetsPath values
cp ./source/_data/url.json.example ./source/_data/url.json

# Determine the value of url.domain, url.assetsPath based on whether or not we have a cname argument
domain="https://${owner}.github.io"
assetsPath="mayflower/assets"

if [ ! "${cname}" = false ];
then
    domain="http://${cname}"
    if [ ! "${assetsPath}" = false ];
    then
        assetsPath="${assetsPath}"
    else
        assetsPath="assets"
    fi
fi

# Set url.domain and url.assetsPath
find ./source/_data -type f -name "url.json" -exec sed -i "" "s!http://localhost:3000!${domain}!g" {} \;
find ./source/_data -type f -name "url.json" -exec sed -i "" "s!assets\"!${assetsPath}\"!g" {} \;

# 4. Build pattern to generate prod static assets
line="Building mayflower static assets..."
log "log" "$line";
gulp build >/dev/null

# Remove url.json to keep repo clean
rm source/_data/url.json

# Make temp directory to copy public  assets
line="Making ~/tmp/mayflower directory..."
log "log" "$line";

if [ -d "~/tmp" ];
then
    mkdir ~/tmp/mayflower
else
    mkdir ~/tmp
    mkdir ~/tmp/mayflower
fi

# 5. Copy built assets in /public into temp directory
line="Copying Pattern Lab build output to ~/tmp/mayflower directory..."
log "log" "$line";

cp -R public ~/tmp/mayflower >/dev/null

# Get to temp directory build output
line="Changing directory to ~/tmp/mayflower/public..."
log "log" "$line";

cd ~/tmp/mayflower/public

# 6. Initialize temp git repo + push up to gh-pages
line="Creating temporary repo and committing build to master branch..."
log "log" "$line";

git init
git add . >/dev/null

# 7. Commit the built assets, and CNAME if passed
git commit -m "$MESSAGE" >/dev/null

# Create CNAME if argument passed
 if [ "${cname}" != false ];
    then
        line="Creating CNAME for '${cname}'";
        log "log" "$line";

        echo "${cname}" >> CNAME
        git add .
        git commit -m "Create CNAME for '${cname}'"
fi

# 8. Add target as remote repo
line="Adding ${TARGET_URL} as a remote and force pushing build to gh-pages branch..."
log "log" "$line";

git remote add target ${TARGET_URL}

# 9. Make sure we can push to remote, return success or error based on result.
if [[ "$(git push target master:refs/heads/gh-pages --force --porcelain)" == *"Done"* ]]
then
    line="Git push was successful!"
    log "success" "$line";
    cleanup
    # Success message.
    if [ "${cname}" != false ];
    then
        line="Woo-hoo! Deploy complete! \n You should see your updates at ${cname}!"
    else
        line="Woo-hoo! Deploy complete! You should be able to see your updates at your Mayflower fork's Github Pages: \n https://${owner}.github.io/mayflower"
    fi
    log "success" "$line";
else
    line="Hmmm, looks like we couldn't push.  Check your remote repo permissions."
    log "error" "$line";
    cleanup
    line="Bummer! Deploy unsuccessful. Check your spellings for git branches + remotes.  And check your permissions.  Then try again!"
    log "error" "$line";
    exit 1;
fi
