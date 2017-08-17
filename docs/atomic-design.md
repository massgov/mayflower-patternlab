# Atomic Design in Mayflower

## About Atomic Design
This design system is a way of break down a design into smaller re-usable parts.  Starting at the page level, you would look for common patterns between pages, which would be become templates.  You would then look for common components on these pages which might become Organisms or Molecules.  Organisms can then be broken down further into Molecules and Atoms or even other Organisms.  Molecules can then be broken down into Atoms or even Molecules.  Eventually your design is broken down into the smallest indivisible units giving you a re-usable palette to build new patterns from.

As defined by [Brad Frost](http://atomicdesign.bradfrost.com/chapter-2/).


### Atoms
* A single HTML5 element type (includes child elements - ul -> li or figure -> figcaption)
* Should be an "indivisible unit" (ie: Input pattern would always be used with a label, but there wouldn't be a Label pattern since it would never be used on it's own).
* Never includes other patterns.

### Molecules
* Not an Atom and not an Organism
* Can include other patterns
* Can contain any HTML5 elements
* Usually has a theme SCSS file

### Organisms
* Primarily includes other patterns.
* Should only include HTML (div, section, ...) and CSS (flexbox, float, ...) for layout or minor theming (background, border).
* All content variable data is passed on to the included patterns.
* Can include variable data to control the layout


### Templates
* Similar to Organisms, but at the page level
* Provides the base structure for a page
* Contains Twig Blocks to include optional patterns or to override default patterns

### Pages
* Always extends a template
* Only contains include statements used in Twig Blocks.