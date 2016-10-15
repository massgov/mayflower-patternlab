#!/bin/sh

# avoid illegal byte sequence error by overriding all individually set encoding
# see: http://stackoverflow.com/questions/11287564/getting-sed-error-illegal-byte-sequence-in-bash
export LC_ALL=C

# variables
GITHUB_REPONAME="massgov/mayflower"
NOW=$(date +"%c")
MESSAGE="GH Pages updated: $NOW"


# build pattern lab site
echo "Building PL..."
gulp build

# make temp directory to copy public  assets
echo "Making tmp directory..."

mkdir ~/tmp

# copy built assets in /public into tmp directory
echo "Copying PL output to tmp directory..."

cp -R public ~/tmp

# replace asset url /assets/ with /mayflower/assets/
echo "Changing directory to tmp..."

cd ~/tmp

echo "Search tmp directory for /assets/ and replace with /mayflower/assets/..."

find ./public -type f -name "*.*" -exec sed -i "" 's/\=\"\/assets\//\=\"\/mayflower\/assets\//g' {} \;


echo "Change directory to public..."
cd public

# initialize temp git repo + push up to gh-pages
echo "Push up to massgov/mayflower gh-pages..."

git init
git add .

git commit -m "$MESSAGE"
git remote add origin git@github.com:$GITHUB_REPONAME.git
git push origin master:refs/heads/gh-pages --force

# cleanup
echo "Cleaning up tmp dir..."
cd
rm -rf tmp


