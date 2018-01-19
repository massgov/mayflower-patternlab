### Description
Short multi-use teaser with an optional image. This pattern can display the photo and details either stacked, with the 
image on top, or side by side with the image to the left of the details. Note that image size still matters here, and if 
the image is large the details section will wrap and it will appear as a column, even if stacked is set to false. 

If the title's href is omitted, neither the title nor teaser image will link to the content.

### Status
* Stable as of TBA

### Pattern Contains
* Decorative Link
* Image
* Rich Text

### Variables
~~~
generalTeaser : {
  stacked:
    type: boolean / optional
  image:
    type: image / optional
  eyebrow: 
    type: string / optional
  title : {
    type: decorativeLink / required
  },
  level:
    type: number / optional
  emphasizedText: [
    type: array of string / optional,
  ],
  description: {
    type: richText / optional
  },
  more: (optional) [{
    path:
      type: string (path to pattern) / required
    data: {
      type: object / contains data object of pattern to include
    }
  }]
}
~~~
