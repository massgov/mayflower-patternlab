### Description
Displays a collection of components to help describe an available Service on Mass Gov

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Banner 
* Image 
* Video 
* Rich Text 
* Callout Grid 
* Icon Links 
* Link List 
* Featured Callouts
* Mapped Locations 
* Split Columns 
* Form Downloads 


### Variant options
* Most of the elements on the page are optional.  The Page Banner, Intro text, and Google Map are required on this template.


### Notes
* This Pattern's Layout is based off of the Stack Row template
* The 50/50 columns contain a Linked List organism and a Form Downloads organism.

### Variables
~~~
{
  pageBanner: 
    type: pageBanner / required

  introPageContent: {
    video: {
      type: video / optional
    }
    intro: {
      type: richText / required
    },

    calloutGrid: {
      type: calloutGrid / optional
    }
  },

  introSidebar: {
    logo: {
      type: image / optional
    },

    social: {
      iconLinks: {
        type: iconLinks / optional
      }
    },

    linkList : {
      type: linkList / optional
    }
  },

  dofeaturedCallouts: {
    featuredCallouts: {
      type: featuredCallouts / optional
    }
  },

  learnfeaturedCallouts: {
    featuredCallouts: {
      type: featuredCallouts / optional
    }
  },

  mappedLocations: {
    type: mappedLocations / required
  },

  splitColumns: {
    type: splitColumns / optional
  }
}
~~~
