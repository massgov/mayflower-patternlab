# Semantic Versioning

The Mayflower Style Library is using Semantic Versioning to help maintain dependencies with consumers of the patterns contained within.  This method will help convey what will be required to upgrade a site to a newer version of Maylfower.

You can read more about Semantic Versioning [here](http://semver.org/)

## Terms used in this document:
1. Markup - The twig or html code for a pattern
2. CSS - The generated index and base-theme css file generated from the SASS files.
3. JS - The generated index.js JavaScript file
4. Data Oject - The json data used for a pattern


## The Basics
Versions on Mayflower are denoted in by three values 1.0.0 that represent Major, Minor, and Patch changes respectively.  Major changes can contain Minor changes which can contain Patch changes.  When Major and Minor releases are made the numbers to the right will always be reset to zero.

### Patch versions (0.0.1) 
A patch version is created when an issue with a pattern in Mayflower has been resolved.  The changes made will be done in a backward compatible manner that doesn't require changes to markup or data objects.

#### How to upgrade
Patch versions will require an update the CSS or JS files.  In order to get all of the fixes, you may have to update your markup to match Mayflower's, but a patch will always work with older markup from the same minor release.  The data-object will never need to be updated.

#### Example of possible changes

1. CSS or JS modified to resolve an issue.
2. Markup updated to include a missing element or attribute
3. Markup changed to use the proper twig variable defined in the data object.


### Minor versions (0.1.0)
A minor version is created when new features have been added to a pattern or a new pattern has been introduced into Mayflower.  The changes made will be done in a backward compatible manner that doesn't require changes to the data object.

#### How to upgrade
Minor versions will require an update to the markup and may require an update to the CSS or JS files.  You may also need to add some new variables to the data object, but it will work with an older data object from the same major release.

#### Example of possible changes

1. New Pattern created (atom, molecule, organism, ...).
2. Markup added to include feature
3. Markup modified to work with new CSS, JS, or variables.
4. Data object updated to include new variables.
5. CSS or JS changed so it doesn't work on old markup.


### Major versions (1.0.0)
A Major version is created when it was not possible to correct an issue or update a pattern in a backward compatible manner.  The changes made will require a change to the data object.

#### How to upgrade
Major versions will require an update to the data object and may require an update to the CSS or JS files or the markup.

#### Example of possible changes

1. Data object updated to replace existing variables.
2. Patterns renamed or moved.
3. Markup changed so it becomes dependent on new variables.


## Our Contract with you
We will make sure that the data object always works for each Minor and Patch version within a given Major release