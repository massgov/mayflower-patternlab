# Adding new SVG icons
## These are the steps involved to add a new SVG icon to the site
1. Add SVG file to the /assets/images/svg-sprite folder
# make sure the file includes a viewBox attribute so we can properly scale the icon and that the fill or stroke colors are not declared on any path elements (unless the colors will never be changed).
2. Create a new twig file in the patterns/01-atoms/icons folder following the design of the other files
# class should be "svg-[name of the svg file]"
# use tag should end in #[name of the svg file]
3. Add a new selector to the assets/scss/01-atoms/svg-icons.scss file that includes the class above to define the height and width of the new svg


## Note when exporting icons from Avocode:
1. The fill and stroke styling need to be removed from the path elements
2. A viewbox attribute has to be added to the SVG element that matched the width and height of the SVG

###See Example:
```html
<svg id="SvgjsSvg1029" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="14" height="16" viewBox="0 0 14 16">
```