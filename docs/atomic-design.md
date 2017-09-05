# Atomic Design in Mayflower

## About Atomic Design
The Mayflower style library is built using Atomic Design.  You can find an excellent description of Atomic Design on Brad Frost's [blog](http://atomicdesign.bradfrost.com/chapter-2/).  

The way I tend to think of building a site using Atomic Design is to see it like a LEGO set where you combine a bunch of small pieces together to make a model.  Using those same piece, you can make a variety of other models as well.  Atomic Design is similar in nature, where you define a collection of small html parts called Atoms and then use those to build a variety of web pages.

### Atoms (an "indivisible unit")
An Atom is the smallest logically stylized pattern in Atomic Design.  Dividing an Atom into smaller parts would result in an unstable pattern that would be dependent on another pattern.  As such Atoms would never include other patterns.

An Atom can be a single HTML element (`a`, `h1`, etc...) or a single complex HTML5 elment that has nested dependent children (`table`, `ul`, `figure`, etc...).  It could also be two elements that would never be used seperately like an input with a label.

Since Atoms are so small they are rarely if ever used directly on a page.  Instead they are used as building blocks to create more complex Patterns.

#### Quick guide:
* Could be a single simple (`a`) or complex (`table`) HTML element
* Might contain multiple HTML elements, if one element cannot be rendered without the other
* Almost always uses a theme SCSS file to style the element
* Cannot be broken down into smaller logical elements
* Usually contains content data
* Sometimes includes an icon

#### Examples
1. http://mayflower.digital.mass.gov/?p=atoms-button
    * This is an example of a single html element => `button` or `a` tag.
2. http://mayflower.digital.mass.gov/?p=atoms-input-checkbox
    * This is an example of an atom that can't be broken down any further.  The Mayflower style guide would never use the `input type=checkbox` element by itself so this atom requires the outer span tag and corresponding label. 

### Molecules - (stylized collections)
A Molecules is a stylized collection of Atoms, Molecules, and or HTML elements.  Molecules have the greatest flexibility of all the patterns.

#### Quick guide:
* Includes other patterns or HTML elements
* Usually contains content data
* Almost always uses a theme SCSS file to style the element

#### Example
1. http://mayflower.digital.mass.gov/?p=molecules-image-promo
    * This is an example of a molecule that includes other patterns, renders content data and has some theme based css applied.


### Organisms - (layout of patterns)
An Organism is a layout of other patterns.  HTML5 elements and CSS styling used for an Organism are for laying out the included patterns.  All content to be rendered, is passed on to the included patterns.  The only styling done for an Organism would be to help define the layout the patterns, like background-colors and borders.

#### Quick guide:
* Includes other patterns.
* All content data is rendered by included patterns.
* CSS styles used are only for layout (flex box, float ...) or to visually define the layout (backgrounds, borders)
* Often times it doesn't use a theme SCSS file
* Data used by the Organism is used to control the layout

#### Example
1. http://mayflower.digital.mass.gov/?p=organisms-event-listing
    * This is an example of an organism that includes other patterns, passes all content data to another pattern, has theme based css related to layout applied, and has a data variable to switch between a list and grid views.

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