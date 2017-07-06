# Semantic Versioning

The Mayflower Style Library is currently using the Semantic Versioning method to help maintain dependencies with consumers of the patterns contained within.  This method will help convey what will be required to upgrade a site to a newer version of Maylfower.

You can read more about Semantic Versioning [here](http://semver.org/)

## The Basics and how they apply to Mayflower.
Versions on Mayflower are denoted in by three values 1.0.0 that represent Major, Minor, and Patch changes respectively.  Major changes can contain Minor changes which can contain Patch changes.  When Major and Minor releases are made the numbers to the right will always be reset to zero.


### Patch versions (0.0.1) 
A patch is a done when we've corrected an issue with a pattern in Mayflower.  These fixes will always be done in a backwards compatible manner to prevent them from causing issues with older markup (twig/html) and data objects.  It should always be safe to pull in a patch version with only minimal testing needed.

To resolve all the issues, you will eventually need to make sure your markup (twig/html) matches Mayflower's.

Example:

1. Changing CSS or JS without modifing an existing pattern's markup (twig/html).
2. Correcting a typo with a CSS class name in the markup (twig/html)
3. Adding a missing CSS class attribute
4. Adjusting a twig file to use the proper twig variable defined in the data object (.json).


### Minor versions (0.1.0)
A minor version is done when new features are added to a pattern or a new pattern has been introduced into Mayflower.  These fixes should always be done in a backwards compatible manner to prevent them from causing issues with older date obects (.json).  It should be safe to pull in a minor versions, but you will need to make sure that your markup (twig/html) matches Mayflower's.

If you wish to take advantage of the new features or patterns you may have to update some code (twig/html and or data object) on your site.

Example:

1. Creating a new atom, molecule, or organism.
2. Expanding a pattern's twig file to include new markup (twig/html)
3. Modifying markup in a pattern's twig file.
4. Adding new variables to a pattern's data object (.json or .twig).


### Major versions (1.0.0)
A Major version is done when it was not possible to correct an issue or add a new feature to an existing pattern in a backward compatible manner or that a pattern may have been removed or renamed.  These changes will always denote that you will need to carefully test and upgrade your site to work with the new code.

Example:

1. Removing or renaming a variable in a pattern's data object (.json or .twig).
2. Renaming or moving a pattern.
