# Semantic Versioning

The Mayflower Style Library is using Semantic Versioning to help maintain dependencies with consumers of the patterns contained within.  This method will help convey what will be required to upgrade a site to a newer version of Mayflower.

You can read more about Semantic Versioning [here](http://semver.org/)

## Terms used in this document:
1. Markup - The twig or html code for a pattern
2. CSS - The generated index and base-theme CSS file generated from the SASS files.
3. JS - The generated index.js JavaScript file
4. Data Object - The JSON data used for a pattern


## Our Contract with you
We will make sure that the Data Object for all patterns, except pages, works consistently between Major versions.  Pages are only created to show examples of different ways to combine patterns.


## The Basics
Versions of Mayflower are denoted in by three values 1.0.0 that represent Major, Minor, and Patch changes respectively.  Major changes can contain Minor changes which can contain Patch changes.  When Major and Minor versions are made the numbers to the right will always be reset to zero.

### Patch versions (0.0.1) 
A Patch version is created when an issue found within a pattern in Mayflower has been resolved.  The changes made will be done in a backward compatible manner that doesn't require changes to Markup or Data Objects.

#### How to upgrade
Patch versions may require an update to the CSS, JS or Markup, but the Data Object will never need to be updated.  Any CSS and JS changes will always be done in a way to make them work with older Markup. To get all of the fixes, you may have to update the Markup files.

#### Example of possible changes

1. CSS or JS modified to resolve an issue.
2. Markup updated to include a missing element or attribute
3. Markup changed to use the proper twig variable defined in the Data Object.

#### Example Version
[5.1.2](https://github.com/massgov/mayflower/pull/475/files) - Was done to resolve a issue found with Comp Heading atom.  We had recently upgraded the `centered` variable in Data Object to use a Boolean instead of a string, but the logic to make this backward compatible didn't take into consideration truthy values.  To resolve this we updated the Twig files logic.

[5.3.1](https://github.com/massgov/mayflower/pull/497) - Was an incorrect Patch version.  We found a mistake in the Data Object where one of the new patterns introduced used `url` in the Data Object and `href` in the twig.  This seemed like a small fix to correct the Data Object, but this should have been a Major version instead since we renamed a variable in the Data Object.  



### Minor versions (0.1.0)
A Minor version is created when new features have been added to a pattern or a new pattern has been introduced into Mayflower.  The changes made will be done in a backward compatible manner that doesn't require changes to the Data Object.

#### How to upgrade
Minor versions may require an update to the CSS, JS, Markup or adding new variables to the Data Object, but the changes will always work with an older Data Object from the same Major version.  In order to use the new Patterns, you may have to update the Data Object to include the new variables.

#### Example of possible changes

1. New Pattern created (atom, molecule, organism, template, or page).
2. Markup added to include a new feature
3. Markup modified to work with new CSS, JS, or Data Object variables.
4. Data Object updated to include new variables.
5. CSS or JS changed so it doesn't work on old Markup.

#### Example version
[5.4.0](https://github.com/massgov/mayflower/pull/507) - We introduced several new patterns and a resolved a few issues with existing patterns.  The new patterns were introduced to facilitate new Executive Order and Policy Advisory pages.  We also resolved several issue we found in the previous 5.3 version.



### Major versions (1.0.0)
A Major version is created when it was not possible to correct an issue, or update a pattern in a backward compatible manner.  The changes made will require a change to the Data Object.

#### How to upgrade
Major versions will require an update to the Data Object and may require an update to the CSS, JS, or Markup.

#### Example of possible changes

1. Data Object updated to replace existing variables.
2. Patterns renamed or moved.
3. Markup changed so it becomes dependent on new variables.

#### Example Version
[5.0.0](https://github.com/massgov/mayflower/pull/436) - We had to change the Data Object in order to introduce a new Announcement Page and fix some issues with our patterns.  The new page required a new pattern with a socialLinks Data Object, but that Data Object was already being used in the footer so we had to rename the existing one to footerSocialLinks.  We also found inconsistency with patterns using `url` instead of `href` variables so those were all updated to use `href`.  
