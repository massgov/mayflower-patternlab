# Atomic Design in Mayflower

## About Atomic Design
The Mayflower style library is built using Atomic Design.  You can find an excellent description of Atomic Design on Brad Frost's [blog](http://atomicdesign.bradfrost.com/chapter-2/).  

The way I tend to think of building a site using Atomic Design is to see it like a LEGO set where you combine a bunch of small pieces together to make a model.  Using those same piece, you can make a variety of other models as well.  Atomic Design is similar in nature, where you define a collection of small html parts called Atoms and then use those to build a variety of web pages.

### Atoms (an "indivisible unit")
An Atom is the smallest logically stylized pattern in Atomic Design.  Dividing an Atom into smaller parts would result in an unstable pattern that would be dependent on another pattern.  As such Atoms would never include other patterns.

An Atom can be a single HTML element (`a`, `h1`, etc...) or a single complex HTML5 elment that has nested dependent children (`table`, `ul`, `figure`, etc...).  It could also be two elements that would never be used seperately like an input with a label.

Since Atoms are so small they are rarely if ever used directly on a page.  Instead they are used as building blocks to create more complex Patterns.

#### Quick guide:
* Contains a single simple or complex HTML element
* Contains multiple HTML elements that cannot be use seperately
* Almost always contains a theme SCSS file
* Can not be broken down into smaller logical elements
* If possible, includes content data (ie: `hr` doesn't include content)


### Molecules - (stylized collections)
Molecules are built by including Atoms or even Molecules to create a more complex stylized pattern.  Molecules can contain HTML elements as well to help layout the included patterns or to render content.

Molecules have the greatest flexibility of all the patterns so you should use caution when using HTML elements to make sure they shouldn't be an included Atoms instead.

#### Quick guide:
* Includes other patterns or HTML elements
* Includes content data
* Usually has a theme SCSS file
 

### Organisms
Like Molecules, Organisms are built by including other patterns to create a more complex pattern.  The difference is that the only HTML5 elements and CSS styling used is for laying out this patterns and all content is passed on to these patterns.  The only styles used in an Organism would be to layout the patterns and include some theming css like background-colors and borders to help define the layout.

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