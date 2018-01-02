#!/bin/bash
#
# Shared functions used when deploying Mayflower to Amazon S3
# -------------------------------------------------------------

# Steps to clean up after script execution
# Runs on success and failure.
function cleanup {
    # Remove temp directory
    line="Cleaning up tmp dir..."
    log "log" "$line";

    rm -rf ~/tmp/mayflower

    # Check out the previous branch
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

# Determines if a build source is a prod tag (i.e. 5.10.0 with no letters)
function isProdTag {
    local theTag=$1

    if [[ ${theTag} =~ ^[0-9]+\.+[0-9]+\.+[0-9]+$ ]];
    then
        echo "true"
    else
        echo "false"
    fi
}

# Determines major version from a passed parameter (i.e. 5.10.0 -> 5)
function getMajorVersion {
    local theTag=$1

    if [[ $(isProdTag "$theTag") == "true" ]];
    then
        # Split the buildSrc by '.' and put into an array.
        IFS='.' read -ra VERSION <<< "$theTag";
        echo ${VERSION[0]}
    else
        echo "false";
    fi
}

# Validate the -b argument is an actual git branch or tag
function validateBuildSource {
    # Validate build source environment argument exists
    if [ "$buildSrc" = false ];
    then
        line="Whoops, we need a git branch or tag name to checkout and build from [-b]."
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
}

# Check out the build source
function checkoutBuildSource {
    line="Checking out the build source: ${buildSrc}"
    log "log" "$line";

    if ! git checkout ${buildSrc};
    then
        line="Could not check out $buildSrc, please make sure your working directory is clean."
        log "error" "$line";
        exit 1;
    fi
}

# Get to the styleguide directory
function cdStyleguide {
    # Get to styleguide directory (inside of repo root), does not assume repo root is "mayflower"
    line="Changing directory into <mayflower>/styleguide..."
    log "log" "$line";

    cd $(git rev-parse --show-toplevel)/styleguide
}

# Creates a url.json file
function createUrlJson {
    line="Setting the domain and asset path config..."
    log "log" "$line";

    # If we're deploying something that doesn't have the url.json.example file, create it first
    if [ ! -f ./source/_data/url.json.example ];
        then
            echo $PWD
            line="Could not find url.json.example so creating it now..."
            log "log" "$line";
            urljson='{\n\t"url": {\n\t\t"comment": "Save this file as url.json and enter your domain and the path to the assets folder",\n\t\t"domain": "http://localhost:3000",\n\t\t"assetsPath": "assets"\n\t}\n}'
            echo -e ${urljson} > ./source/_data/url.json.example

            # Set flag to undo these changes in the working directory before leaving script.
            cleanup=true
    fi

    # Create url.json from the .example and set the appropriate domain and assetsPath values
    line="Copying url.json.example into url.json for assets path config..."
    log "log" "$line";
    echo $PWD
    cp ./source/_data/url.json.example ./source/_data/url.json
}

# Write the asset path config values to url.json
function writeAssetsPathConfig {
    line="Writing domain: ${domain} and assetsPath: ${assetsPath} to the build config."
    log "log" "$line";

    if [ CIRCLECI ];
    then # Use GNU sed syntax
         # See: https://stackoverflow.com/questions/43171648/sed-gives-sed-cant-read-no-such-file-or-directory
        # Set url.domain and url.assetsPath
        find ./source/_data -type f -name "url.json" -exec sed -i "s!http://localhost:3000!${domain}!g" {} \;
        find ./source/_data -type f -name "url.json" -exec sed -i "s!assets\"!${assetsPath}\"!g" {} \;
    else # Assume MacOS sed syntax
         # See: https://stackoverflow.com/questions/11287564/getting-sed-error-illegal-byte-sequence-in-bash
        # Set url.domain and url.assetsPath
        find ./source/_data -type f -name "url.json" -exec sed -i "" "s!http://localhost:3000!${domain}!g" {} \;
        find ./source/_data -type f -name "url.json" -exec sed -i "" "s!assets\"!${assetsPath}\"!g" {} \;
    fi


}


# Build patterns to generate prod static assets
function buildMayflower {
    line="Generating mayflower patterns..."
    log "log" "$line";
    php core/console --generate >/dev/null

    line="Building mayflower static assets..."
    log "log" "$line";
    gulp prod >/dev/null

    # Remove url.json to keep repo clean
    rm source/_data/url.json
}
