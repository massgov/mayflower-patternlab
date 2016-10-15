#!/bin/sh
#
# Deploying Mayflower to Github Pages:
# -----------------------------------------------------
#
# Run from mayflower/styleguide from a clean working directory
#
# THIS SCRIPT WILL:
# Checkout latest release from massgov/mayflower
# Build PL assets
# Copy public/ into tmp directory
# Correct the asset urls for being served at /mayflower
# Initialize a temp repo in the tmp public/ directory
# Commit all files (includes updates URLs)
# Add massgov/mayflower as remote
# Push contents of tmp public/ to mass/mayflower gh-pages
# Clean up tmp dir
# Get back to mayflowr/styleguide dir
# Checkout prior branch
#
# @todo
# - harden this process/script
# - build into ci process
# - regex'ify the find/replace process
#

# avoid illegal byte sequence error by overriding all individually set encoding
# see: http://stackoverflow.com/questions/11287564/getting-sed-error-illegal-byte-sequence-in-bash
export LC_ALL=C

# variables
GITHUB_REPONAME="massgov/mayflower"
NOW=$(date +"%c")
MESSAGE="GH Pages updated: ${NOW}"
LATESTTAG=$(git fetch upstream --tags && git describe --tags `git rev-list --tags --max-count=1`)

# checkout the latest tag/release
echo "Checking out the latest tag: ${LATESTTAG}"
git checkout ${LATESTTAG}

# build pattern lab site
echo "Building PL..."
gulp build

# make temp directory to copy public  assets
echo "Making tmp directory..."
mkdir ~/tmp

# copy built assets in /public into tmp directory
echo "Copying PL output to tmp directory..."
cp -R public ~/tmp

# get to tmp directory
echo "Changing directory to ~/tmp/public..."
cd ~/tmp/public

# Search temp directory + replace asset url /assets/ with /mayflower/assets/
echo "Searching directory for /assets/ and replace with /mayflower/assets/..."
find . -type f -name "*.*" -exec sed -i "" 's/\"\/assets\//\"\/mayflower\/assets\//g' {} \;
find . -type f -name "*.*" -exec sed -i "" "s/\'\/assets\//\'\/mayflower\/assets\//g" {} \;

# initialize temp git repo + push up to gh-pages
echo "Creating repo and pushing up to massgov/mayflower gh-pages..."

git init
git add .

git commit -m "$MESSAGE"
git remote add origin git@github.com:$GITHUB_REPONAME.git
git push origin master:refs/heads/gh-pages --force

# cleanup
echo "Getting back to styleguide directory..."
cd -
echo "Cleaning up tmp dir..."
rm -rf tmp

# check out the previous branch
echo "Checking out prior branch"
git checkout @{-1}
