# Atomic Design in Mayflower

## About Atomic Design
This design system is a way of looking at a design as a collection of smaller re-usable parts.  Starting at the page level, you would look for common patterns between pages, which would be become templates.  You would then look for common components on these pages which might become Organisms or Molecules.  Organisms can then be broken down further into Molecules and Atoms or even other Organisms.  Molecules can then be broken down into Atoms or even Molecules.  Eventually your design is broken down into the smallest indivisible units giving you a re-usable palette to build new patterns from.

As defined by [Brad Frost](http://atomicdesign.bradfrost.com/chapter-2/).


### Atoms (an "indivisible unit")
An Atom is the smallest logical stylized pattern in Atomic Design.  Dividing an Atom into smaller parts would result in an unstable pattern that is dependent on another pattern.  As such Atoms would never include other patterns.

An Atom can be a single HTML element (`a`, `h1`, etc...) or a single complex HTML5 elment that has nested dependent children (`table`, `ul`, `figure`, etc...).  It could also be two elements that would never be used seperately like an input with a label.

Since Atoms are so small they are rarely if ever used directly on a page.  Instead they are used as building blocks to create the more complex Patterns.

#### Quick guide:
* Contains a single simple or complex HTML element
* Contains multiple HTML elements that cannot be use seperately
* Almost always contains a theme SCSS file
* Can not be broken down into smaller logical elements


### Molecules - (stylized collections)
Molecules are similar to Atoms, since they can contain HTML elements, but they can also contain Atoms and even other Molecules as building blocks to create a more complex pattern.

Molecules have the greatest flexibility of all the patterns so you should use caution when using HTML elements to make sure they shouldn't be an included Atoms instead.

#### Quick guide:
* Includes other patterns or HTML elements
* Includes content data
* Usually has a theme SCSS file
 

### Organisms
Like Molecules, Organisms include other patterns to create a more complex pattern.  The difference is that the only HTML5 elements and CSS styling used is for layout only.  All content used in an Organism would be rendered within an Atom or Molecule.  The only styles used in a Organism would be to layout the patterns and include some theming css like background-colors and borders to help define the layout.

#### Quick guide:
* Includes other patterns.
* All content data is rendered by included patterns.
* CSS styles used are only for layout (flex box, float ...) or to visually define the layout (backgrounds, borders)
* Often times it doesn't use a theme SCSS file
* Data used by the Organism is used to control the layout

### Templates
* Template patterns serve the same purpose of an Organism, but they are used to represent a complete page.  Since we're working at the page level, templates should contain Twig Blocks as placeholders to allow pages to add patterns or to override default patterns contained within the Template pattern.


#### Quick guide:
* Similar to Organisms, but at the page level
* Provides the base structure for a page
* Contains Twig Blocks to include optional patterns or to override default patterns

### Pages
Pages are used as an example of what the final Page for the site should look like.  Pages always start by Extending an existing template.

#### Quick guide:
* Always extends a template
* Only contains include statements used in Twig Blocks.