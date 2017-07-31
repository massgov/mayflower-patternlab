### Description
This is a location based template.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Header Alerts
* Page Header
* Location Banner
* Colored Heading
* Sticky Nav
* Contact List

### Variant options
* describe the different variants that can be created and link them to the actual variant

### JavaScript Used
* Contact List Accordion (js/modules/accordions.js)
* Google Map (js/modules/googleMap.js)
* Sticky Nav (js/modules/scrollAnchors.js)

### Variables
~~~
{
  location: {
    contentTitle: 
      type: string / required
  },

  headerAlerts: [{
    type: array of headerAlerts / optional
  }],

  pageHeader: {
    type: pageHeader / required
  },
  
  locationBanner: {
    type: locationBanner / required
  },

  stickyNav: { 
    type: stickNav / required
  },

  mainContent: {
    contactList: {
      type: contactList / required.
    }
  },

  sidebar: {
    coloredHeadings: 
      type: boolean (should always be true),
    contactList: {      
      type: contactList / required.
    }
  }
}
~~~
