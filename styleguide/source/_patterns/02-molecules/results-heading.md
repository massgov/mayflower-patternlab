---
title: Results Heading
---
Description: a molecule that shows information about the current result set of a list of things (i.e. the various listing organisms).

## Status: Alpha

## Notes:
- Contains an array of tags which represent active filters applied to a related listing, usually applied by inputs on [@molecules/location-filters](/?p=molecules-location-filters)

### Used in:
- [@organisms/by-author/location-listing](/?p=organisms-location-listing)
- [@organisms/by-author/event-listing](/?p=organisms-event-listing)
- [@organisms/by-author/press-listing](/?p=organisms-press-listing)

### Variables
~~~
resultsHeading: {
  numResults:
    type: string 
    description: range representing the  current result set (i.e. "1-12")
  totalResults:
    type: string 
    description: the total results (i.e. "108"),
  sortResults: {
    label: "Sort by:",
    sortButtons: [{
      text: "Date",
      direction: "dsc"
    },{
      text: "Price",
      direction: ""
    },{
      text: "Color",
      direction: ""
    }]
  },
  tags: [
    type: array
    description: arary of filter input values currently applied to listing items
    {
      type:
        type: string (i.e. "keyword")
        description: the "type" of filter (i.e. input label)
      text:
        type: string (i.e. "Beginner")
        description: text displayed on the filter tag
      value: 
        type: string (i.e. "beginner")
        description: machine friendly version of filter text
    },
    // form input data representing active filter tags
    // see @molecules/location-filters.md
    ... 
  ]
}
~~~
