### Description
This pattern displays the contents of a rich text editor.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Sidebar Heading
* Acceptable patterns for Rich Text
  * Paragraph
  * Headings 2-6
  * Unordered List
  * Ordered List
  * Table
  * Check List
  * Icon List
  * Figure
* Any pattern can be rendered in these columns by setting the 'path' variable to the location of the pattern and setting the 'data' variable to container of the data object of that pattern.  
  * {% include item.path with item.data %}



### Variant options
* With a [Heading](./?p=organisms-rich-text-with-title)

### JavaScript Used
* This pattern uses JavaScript to wrap tables in a div with scrollbars (js/modules/richText.js)

### Variables
~~~
"richText": {
  "property": 
    type: string,
  "rteElements": [{
    "path": 
      type: string / required,
    "data": {
      type: object / required
    }
  }]
}
~~~
