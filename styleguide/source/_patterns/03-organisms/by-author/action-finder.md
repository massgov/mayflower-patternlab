--- 
title: Action Finder
--- 
Description: A collection of featured and general links

## State: Alpha 
### Notes 
- If there are more than six general links to display a search filter input will be included.
- See all link is optional
- If the wide background image is omitted, an alternative styling is applied.
- If the narrow background is provided and wide background must also be provided.

### Contains: 
- [@molecules/keyword-search.twig](?p=molecules-keyword-search) 
- [@molecules/illustrated-link.twig](?p=molecules-illustrated-link) 
- [@molecules/callout-link.twig](?p=molecules-callout-link) 
- [@atoms/11-text/link.twig](?p=atoms-link) 

### Used in 
- [@pages/L2-nature-and-outdoor-activities.twig](?p=pages-L2-nature-and-outdoor-activities) 

### Variables 
~~~ 
{
  actionFinder: {
    id:
      type: string/uniqueID/required 
    bgWide:
      type: string/image-url/optional/(required with bgNarrow)
    bgNarrow:
      type: string/image-url/optional
    title:
      type: string/required
    featuredHeading:
      type: string/required
    generalHeading:
      type: string/required

    seeAll: {
      href: 
        type: string/url/required,
      text: 
        type: string/required,
      chevron:  
        type: 'true'
    }

    featuredLinks: [{
      image: 
        type: string/image-url/optional,
      text: 
        type: string/required,
      type: 
        type: null or 'external',
      href:  
        type: string/url/required,
      label:
        type: string/optional
    }],

    links: [{
      image: 
        type: string/image-url/optional,
      text: 
        type: string/required,
      type: 
        type: null or 'external',
      href:  
        type: string/url/required
    }]
  }
}
~~~ 