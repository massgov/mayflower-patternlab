## Adding new Park Typle SVG icons
### These are the steps involved to add a new SVG icon to the site
1. Add SVG file to this folder
2. Modify the code within the svg file
* removed <desc> tags
* Add/modify <title> tag to contain short text discribing the icon
* Make sure the svg has a viewBox matching it's height and width
* remove fill color
3. Create a new twig file in patterns/01-atoms/icons-location
4. Copy SVG code from the SVG file to the new twig file
