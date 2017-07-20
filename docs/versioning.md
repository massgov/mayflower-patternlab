# Semantic Versioning

The Mayflower Style Library is using [Semantic Versioning](http://semver.org/) to convey meaning about the underlying code and what has been modified from one version to the next to help consumers keep their sites up to date with the latest features and bug fixes.

## Our Contract with the consumer
- *Patch:* consumer doesn't need to re-write any Markup, things just get better, nothing new is available, nothing breaks just by updating
- *Minor:* consumer doesn't need to re-write any Markup, has access to new features available, maybe an option to do something a better way, nothing breaks just by updating
- *Major:* consumer has to walk through a 'migration' step to update since this will break things

## The Basics
Versions of Mayflower are denoted by three values 1.0.0 that represent Major, Minor, and Patch changes respectively.  Major changes can contain Minor changes which can contain Patch changes.  When Major and Minor versions are made the numbers to the right will always be reset to zero.

### Key Terms
* Markup - The twig or html code for a pattern
* Artifacts - The SVG icons, fonts, CSS, and JavaScript files
* Data Object - The JSON data variables used for a pattern

### Patch versions (0.0.1) 
A Patch version is created to resolve issues found within a pattern in Mayflower.  The changes made will only be done to Mayflower's Artifacts in a manner that doesn't require changes to the Markup or Data Object.

#### How to upgrade
A Patch version may require updating your site to use one or more newer files within Mayflower's Artifacts.

#### Example of possible changes
* CSS or JavaScript modified to resolve a styling or interaction issue (ie: link color or button trigger).
* SVG icon replaced with a new version
* Fonts changed to include additional font weights

#### Example Version
[5.1.2](https://github.com/massgov/mayflower/pull/475/files) - Was done to resolve a issue found with Comp Heading pattern.  We had recently upgraded the `compHeading.centered` variable in the Data Object to use a Boolean instead of a String, but the logic to make this backward compatible didn't take into consideration truthy values.  To resolve this, we updated the logic in the Markup.

[5.3.1](https://github.com/massgov/mayflower/pull/497) - Was an incorrect Patch version.  We found a mistake in the Data Object where one of the new patterns introduced used `url` in the Data Object and `href` in the Markup.  This seemed like a small fix to correct the Data Object, but this should have been a Major version instead since we required the new variable in the Data Object.  This should have been done in a backward compatible manner that checks for the old variable and uses that if it exists.  


### Minor versions (0.1.0)
A Minor version is created when new features are added to an existing Pattern, a new Pattern is created, or an issue has been resolved that required Markup changes. New features will always be written as an optional extention of the existing pattern without requiring any modifications to the existing Markup or Data Object.

#### How to upgrade
A Minor version may require updating your site to use one or more newer files within Mayflower's Artifacts, enhancing an existing Pattern with new Markup or Data Object, creating new Markup and Data Object for a new Pattern, or modifing existing Markup to resolve an issue.  Markup changes made to resolve an issue, will be noted in the release notes.

#### Example of possible changes
* New Pattern created (ie: a new button atom).
* Additional Markup or Data Object for a new feature added to an existing Pattern (ie: an optional title added to the Link List organism).
* Existing Markup enhanced to work with a new optional feature (ie: new 'centered' variable for the title).
* Broken Markup, CSS, or JS changed to resolve an issue (ie: typo found in a class name, twig variable, or CSS selector)

#### Example version
[5.4.0](https://github.com/massgov/mayflower/pull/507) - We introduced several new patterns and resolved a few issues with existing patterns.  The new patterns were introduced to facilitate a new Executive Order and Policy Advisory pages.  We also resolved several issues we found in the previous 5.3 version.


### Major versions (1.0.0)
A Major version is created when the new code requires changes to the Markup or Data Object to prevent breaking existing styling or functionality.

#### How to upgrade
A Major version will require a carefully updating your site's Artifacts, Markup, or Data Object.  A full site wide regression test is advised.

#### Example of possible changes
* Data Object updated to replace existing variables (ie: renaming 'url' to 'href').
* Data Object changed to use a different Type value (ie: switching the 'centered' value from Type String to Boolean).
* Patterns renamed or moved to a new folder (ie: renaming Action Map to Google Map).
* Markup changed so it becomes dependent on new variables (ie: new 'color' variable required to set background).

#### Example Version
[5.0.0](https://github.com/massgov/mayflower/pull/436) - We had to change the Data Object to introduce a new Announcement Page and fix some issues with our patterns.  The new page required a new pattern with a socialLinks Data Object, but that Data Object was already being used in the footer so we had to rename the existing one to footerSocialLinks.  We also found inconsistency with patterns using `url` instead of `href` variables so those were all updated to use `href`.  
