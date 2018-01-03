# Mayflower / Amazon S3 Architecture

We host Mayflower (i.e. the static output of a Pattern Lab “build”) in an amazon s3 bucket, at which we point mayflower.digital.mass.gov.  The table below describes our architecture for the various bucket subfolders.


|mayflower.digital.mass.gov|
|---|

| |Production|Latest minor|Release|Staging|Dev|Feature branch|
|---|---|---|---|---|---|---|
|**URL path**|/|/<current-major-#>|/<#.#.#>|/release-#.#.#|/dev|/<my-branch-name>|
|**Example**|mayflower.digital.|mass.gov/|/5|/5.10.0|/release-5.11.0|/dev|/DP-1234-my-ticket|
|**Purpose**|The latest and greatest version of Mayflower.  Mostly used for browsing and (soon) implementation documentation from the home page.|The latest minor version within a given major: implementers who link to these css/js/font/icon assets get safe updates automatically|Static snapshot of a given release: implementers who link to these css/js/font/icon assets get updates only when they manually change their links to the next version|A given release branch; used to stage an upcoming release for functional / integration testing.|Bleeding edge of our codebase; used for browsing all of the code that has been merged into dev branch prior to release.|The feature development done on a particular branch; used for internal and external review functional tests.|
|**What code gets deployed here?**|Pattern Lab build artifacts from a production tag (i.e. 5.10.0) cut off master branch..|Pattern Lab build artifacts from a production tag (i.e. 5.10.0) cut off master branch.  Note: if the production tag starts a new major release, then a new /<current-major-#> directory will be created automatically.|Pattern Lab build artifacts from a production tag (i.e. 5.10.0) cut off master branch|Pattern Lab build artifacts from the release branch.|Pattern Lab build artifacts from the dev branch. |Pattern Lab build artifacts from the feature branch.|
|**When does code get deployed here?**|During the release process, when a release branch is merged into master.|During the release process, when a release branch is merged into master.|During the release process, when a release branch is merged into master.|When a release branch (which has an open PR) has a new commit pushed.|When a feature PR is squashed and merged into dev branch.|When a feature branch (which has an open PR) has a new commit pushed.|
|**How does code get deployed here?**|Release manager executes a script command.  See release docs.|Release manager executes a script command.  See release docs.|Release manager executes a script command.  See release docs.|CircleCI deploys as part of build for the release branch.|CircleCI deploys as part of build for the  dev branch.|CircleCI deploys as part of build for the feature branch.|
|**Permanent or temporary?**|Permanent (and dynamic, i.e. the contents change when a new release is deployed here)|Permanent (and dynamic, i.e. the contents change when a new release is deployed here)|Permanent (and static, i.e. once is a release is deployed here it will never change)|Temporary (can be deleted when the release testing is done) @TODO script this|Permanent (and dynamic, i.e. the contents change when new work is merged in)|Temporary (can be deleted when the feature testing is done) @TODO script this|
