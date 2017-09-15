# Atomic Design in Mayflower

## About Atomic Design
The Mayflower style library is built using Atomic Design. The way I tend to think of building a site using Atomic Design is to see it as a LEGO set where your combining a collection of small parts  to make a variety of different models.  Atomic Design is similar in nature, where you define a collection of small html parts called Atoms and then use those to build a variety of web pages. 

You can find an excellent description of Atomic Design on Brad Frost's [blog](http://atomicdesign.bradfrost.com/chapter-2/). 

We are following his guide fairly closely, but I differ when it comes to Molecules and Organisms. He sees then as being defined based on their complexity, but I found in practice that it was difficult to make that distinction.  I like to think of Molecules as larger Atoms (components with custom styling or additional content) and Organisms as being smaller templates (component level)  

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
http://mayflower.digital.mass.gov/?p=molecules-image-promo
* This is an example of a molecule that includes other patterns, renders content data and has some theme based css applied.


### Organisms - (layout of patterns)
An Organism is a layout of other patterns.  HTML5 elements and CSS styling used in an Organism are for laying out the included patterns.  All content to be rendered, is passed on to the included patterns.  The only styling done for an Organism would be to help define the layout the patterns, like background-colors and borders.

#### Quick guide:
* Includes other patterns.
* All content data is rendered by included patterns.
* CSS styles used are only for layout (flex box, float ...) or to visually define the layout (backgrounds, borders)
* Often times it doesn't use a theme SCSS file
* Data used by the Organism is used to control the layout

#### Example
http://mayflower.digital.mass.gov/?p=organisms-event-listing
* This is an example of an organism that includes other patterns, passes all content data to another pattern, has theme based css related to layout applied, and has a data variable to switch between a list and grid views.

### Templates
* Template patterns define the layout and basic patterns needed when constructing a page.  Like Organisms, templates contain html elements to determine the layout and can include other patterns.  The also use Twig Blocks to provide locations for including additional patterns or overridding default patterns.

#### Quick guide:
* Similar to Organisms, but at the page level
* Provides the basic layout for a page
* Contains Twig Blocks to include optional patterns or to override default patterns
* Might have some CSS or JavaScript associated with it.

#### Example
http://mayflower.digital.mass.gov/?p=templates-location
* This is an example of a template for location type pages.
* There are several patterns included
* CSS is used to layout the basic structure of the page
* Additional Patterns can be added to two Twig Blocks, pageContent and sidebar
* The page header and the page footer are contained in Twig Blocks, pre-content and post-content, that can be overridden if needed. 

### Pages
Pages are used to show an example of how a template can be used.  Pages should extend an existing template to determine the basic layout for the page, use real content in the JSON similar to that used on the live site, and include any additional optional patterns to complete the page.  The page constructed should closely matche what we expect a final page to look like on the live site.

#### Quick guide:
* Extends a template
* Might include other patterns within a template's Twig Blocks
* Contains real content within the json data (when available)
* Rarely has any CSS or JavaScript associated with it

#### Example
http://mayflower.digital.mass.gov/?p=pages-location-park-content
* This is an example of a Location page
* It extends the location template
* Several patterns are included in the pageContent and sidebar Twig Blocks
* Real Content is used for the future Mt Greylock State Park page
* There is no CSS or JS directly associated with this page
