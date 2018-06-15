# Release to production
Mayflower release managers with the necessary repo permissions can follow these steps to deploy code to production (i.e. do a release).

*Note: the following steps assume that your local machine and repository is already set up and functioning according to our [Getting Started docs](../.github/CONTRIBUTING.md#getting-started).*

## Release schedule
Wenesdays
[QUESTION: DEADLINE FOR RELEASE LIKE MASS REPO(NOON)?]

The release occurs during the office hours.

[Sync the `develop` branch on the `mass` repo with the release]() by **5:00 pm** to allow the `ma-crawl` to check 500 errors before the release goes to the  [production](https://www.mass.gov) at Thursday releases of the `mass` repo. 

## Release steps

### Verify that there is code to release

Check the [changelogs folder](https://github.com/massgov/mayflower/tree/dev/changelogs) in the GitHub `dev` branch for any new changes to deploy. If not, stop here.

### Create the release

[QUESTION: Time to cut release???]

1. Open a ticket for the release in JIRA and assign it to yourself.
	*Replace the* `#.#.#` *with the release version below.*
	- Summary:  `Mayflower release #.#.#`
	- Type: `Task`
	- Priority: `Normal`
	- Component/s: `Team Platform Support`
	- Description:  
		
		```
		Create a new Mayflower tag and pull it into Drupal.

		Steps:
		
		(/) Cut a release branch Mayflower repository
		
		(/) Cut a release tag from Mayflower repository
		
		(/) Create a PR in Mass repository to pull in the Mayflower tag
		
		(/) Merge the PR into the Mass repository before 5 p.m. to allow the ma-crawl to crawl develop branch for 500 errors.
		
		Done when:
		Mayflower tag in Drupal has been updated to #.#.#
		
		*Mayflower PR:* place_the_URL_of_the_Mayflower_release_PR_here
		Release notes:
		
		{code}
		
		copy and paste the release note content for the release here.
		
		{code}
		
		*Mass PR:* place_the_URL_of_the_mass_PR_to_update_the_Mayflower_version_here
		```
1. In your local mayflower repo, pull the latest `dev`.
	1. `git checkout dev`
	1. `git pull <remote> dev`
1. Create a release branch from the latest `dev` branch at that moment. 

	1. `git checkout -b release-#.#.#` 	Replace the `#.#.#` with proper version for the release. 

	See [Semantic Versioning](https://github.com/massgov/mayflower/blob/dev/docs/versioning.md) to determine the version, which replaces `#.#.#`. 

1. Run `npm install` in case the release includes new packages.
1. Compile the [release notes](https://github.com/massgov/mayflower/blob/dev/release-notes.md) with the logs in the [changelogs folder](https://github.com/massgov/mayflower/tree/dev/changelogs). 
1. Remove all the log files except for the **template.txt** in the changelogs folder once all changelogs are added to the [release notes](https://github.com/massgov/mayflower/blob/dev/release-notes.md).
1. Commit the change. [QUESTION:  Should this step and 8-6 be skipped and commit all changes -- package updates, changelog, reference screenshot update -- all together below, or separate?  Personally, I prefer to separate them as a record even there are extra steps to take, but what's your thoughts?]
1. Run the Visual Regression Test.
	1. `docker-compose run backstop test`
	2. `open backstopjs/reports/html/index.html`
	3. Check any changes are reflecting the changes in the release.
	4. If all changes are valid, accept  the new screenshots with `docker-compose run backstop approve` 
	5. `git add backstopjs/reference`
	6. `git commit -m "Updating reference screenshots for release-#.#.#"`
1. Update the version of the npm package by updating the `version` value in the `mayflower/styleguide/package.json` with `#.#.#` for the release.
1. Commit the change.
1. Push release branch to `massgov/mayflower` 
	1. `git push <remote> release-#.#.#`
1. Create a new PR against `master` with the release branch.
	1. Add the release notes content to the PR notes.

### Deploy the release
1. Wait for [the circle build](https://circleci.com/gh/massgov/mayflower) to pass, which will deploy your release branch to staging automagically🦄
1. Verify release notes against the site rendered at: `https://mayflower.digital.mass.gov/b/<your-release-branch>/index.html`.
1. Smoke test Mayflower (a quick way to do this is to browse around to some of the different pages in the "pages" menu and do a quick gut check) [QUESTIONS: DO YOU WANT TO ADD MORE SPECIFIC ITEMS/METHODS TO TEST HERE?]
1. Merge the release branch into the `master` branch with `Create a merge commit`, NOT `Squash and merge`.
  
### Create a tag
1. After the release branch is merged into `master` branch, [create a production release](https://help.github.com/articles/creating-releases/) off the `master` branch in GitHub at [Releases](https://github.com/massgov/mayflower/releases).
1. Click the **Draft a new release** at the right top.
1. Fill out the information for the release:
    1. Tag version: `#.#.#` (your release version added to the release branch)
    1. **@ Target: `master`** <<<<<<- important❗
    1. Release title: `#.#.# (mm/dd/yyyy)` (your release version followed by the release date in parethesis.
    1. Describe the release: 
    
	 	- after the release version/date line, add a link to the release PR (protip: type `#` and you'll get an autocomplete dropdown to get to your pr)
	 	- paste your release notes markdown
    	 	
    1. Leave "This is a pre-release" UNCHECKED.
    1. Click the **Publish release** button.  
1. Wait for [the circle builds](https://circleci.com/gh/massgov/mayflower) to pass
1. Smoke test [Production](http://mayflower.digital.mass.gov).
    - Make sure the home page reflects the date and version

### Post Deployment
1. Open a GitHub Pull Request to merge `master` into `dev` (this should only bring an updated `release-notes.md`, `package.json`, `reference screenshots update` if any). If a feature was reverted on the release branch, have a peer do the merge after a review.
1. In JIRA, go to the [DP project](https://jira.state.ma.us/projects/DP/).
    1. Click on the Releases icon on the left side (it looks like a boat/ship).
    1. Add a new release version with today's date.
    1. Go to each shipped JIRA issue and update the Fix Version/s field.
    1. Go to the list of issues contained within the release version and copy the URL (link to this issue from release notes).
1. Follow the [Communicate Releases](https://wiki.state.ma.us/display/massgovredesign/Communicating+Releases) instructions for Deployment Completed to email Release Notes to the team.

	[QUESTION:  FOUND THE LAST MAYFLOWER RELEASE NOTIFICATION BY ISAAC BACK IN FEB AND GRABBED THE FORMAT. WOULD YOU LIKE TO CHANGE THE CONTENTS?]

	```
	Subject:  [Mass.gov Mayflower] Release Complete: #.#.#

	TO:  mass-gov-project@listserv.state.ma.us 

	BODY:

	Hi Team!

	A small, new Mayflower release (#.#.#) is complete, here's what you can expect to find:

	*** paste the release notes here ***

	https://github.com/massgov/mayflower

	Thanks!
	```


### Sync the release with Drupal
1. At this point, the `mass` repo is still pointing to the previous version of Mayflower, forllow the steps in [Updating Mayflower for Mass.gov](https://github.com/massgov/mass/blob/develop/docs/Mayflower.md#updating-mayflower-for-massgov) to use the release version in Drupal.


## Rollback process

[QUESTIONS: DO WE NEED SOME SORT OF PROCESS WHEN THINGS GO BAD HERE?]