#!/bin/sh

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
echo "Changing directory to tmp..."
cd ~/tmp

# Search temp directory + replace asset url /assets/ with /mayflower/assets/
echo "Searching tmp directory for /assets/ and replace with /mayflower/assets/..."
find ./public -type f -name "*.*" -exec sed -i "" 's/\"\/assets\//\"\/mayflower\/assets\//g' {} \;
find ./public -type f -name "*.*" -exec sed -i "" "s/\'\/assets\//\'\/mayflower\/assets\//g" {} \;

# initialize temp git repo + push up to gh-pages
echo "Changing directory to public..."
cd public
echo "Creating repo and pushing up to massgov/mayflower gh-pages..."

git init
git add .

git commit -m "$MESSAGE"
git remote add origin git@github.com:$GITHUB_REPONAME.git
git push origin master:refs/heads/gh-pages --force

# cleanup
echo "Cleaning up tmp dir..."
cd
rm -rf tmp


