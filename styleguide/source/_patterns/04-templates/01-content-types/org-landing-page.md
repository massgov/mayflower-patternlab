---
title: Org Landing Page
---
Description: A pattern representing an org landing page content type.  This pattern renders everything inside of the `<main>` element, in other words, it includes type-specific content without the global `<header>` and `<footer>` elements.

## State: alpha

## Structured Data

### Available schema.org data objects
schema:
- [governmentOrganization](/?p=meta-government-organization)

### Schema.org property / Mayflower organisms variable maps (MVP):

#### governmentOrganization:
~~~
Schema.org property name = Mayflower (.json) variable
--------------------------------------------------------

    schema.governmentOrganization.name = pageBanner.title
    schema.governmentOrganization.alternateName = pageBanner.titleSubText
    schema.governmentOrganization.disambiguatingDescription = actionHeader.pageHeader.subTitle
    schema.governmentOrganization.description = stackedRowSections[0].pageContent[0].data.rteElements[1].data.paragraph.text
    schema.governmentOrganization.logo = actionHeader.widgets[0].data.image.src
    schema.governmentOrganization.url = urlDomain }}{{ urlPath
    schema.governmentOrganization.sameAs = [
        stackedRowSections[0].sideBar[1].data.iconLinks.items[INDEX].link.href
    ]     
~~~

### Rendered json+ld data objects (MVP)

#### governmentOrganization
~~~
<script type="application/ld+json">
{
  "@context": "http://schema.org/",
  "@id": "http://mayflower.digital.mass.gov/?p=pages-ORG-Health-Services/#governmentorganization",
  "@type": "governmentOrganization",
  "name": "Executive Office of Health and Human Services",
  "alternateName": "EOHHS",
  "disambiguatingDescription": "EOHHS oversees health and general support services to help people in Massachusetts - from young children to seniors - meet basic needs.",
  "description": "The Executive Office of Health and human Services is responsible through its member agencies for the delivery of a wide range of services to people with financial, health, social, protective, rehabilitation, and correctional needs. Online information is available for consumers, providers, researchers, and social workers to find out what types of assistance are offered.",
  "logo": "http://mayflower.digital.mass.gov/assets/images/placeholder/230x130.png",
  "url": "http://mayflower.digital.mass.gov/?p=pages-ORG-Health-Services",
  "sameAs": [
    "https://twitter.com/masshhs",
    "https://www.flickr.com/people/mass_hhs",
    "http://blog.mass.gov/hhs/"
  ]
}
</script>
~~~

## Resources
- [schema.org](https://schema.org/)
  - [schema: Government Organization](https://schema.org/GovernmentOrganization)  
  - [schema: Government Office](https://schema.org/GovernmentOffice)  
  - [schema: Government Service](https://schema.org/GovernmentService)  
  - [schema: Service Channel](https://schema.org/ServiceChannel)
  - [schema: Offer Catalog](https://schema.org/OfferCatalog)
- [(google) structured data testing tool](https://search.google.com/structured-data/testing-tool)
- [structured data linting tool](http://linter.structured-data.org/)
- [structured data playground](http://json-ld.org/playground/index.html)
  - [org page schema.org playground](http://tinyurl.com/gn72pa4)
- [Some context for civic service vocabulary being added to schema.org](https://www.w3.org/wiki/images/0/03/Services_for_schema.org_%28DRAFT_2013-06-27%29.pdf)

## Future iterations
Once we've added contacts, locations to the Org Page then we can add address and contact point information.

Once we've got a better idea of how to represent topics, subtopics, services and have created content types for these as well as how-tos and guides, then we can add offer catalogs to represent those.

Once we've determined if / how to show a relationship between organizations then we can add information about that here as well.

#### Structured data drafts for future iteration
~~~
Schema.org property name = Mayflower (.json) variable
--------------------------------------------------------
schema += [ 
    address = (TBD),
    contactPoint = (TBD)
    hasOfferCatalog = [{
        id = (page url) + "/#" + stackedRowSections[1].pageContent[0].data.actionFinder.featuredHeading (sluggified?),
        name = stackedRowSections[1].pageContent[0].data.actionFinder.featuredHeading,
        itemListElement = [
            itemOffered = [
                type ="governmentService",
                id = (add in future iteration, once service pages, how-tos, guides are created: 
                stackedRowSections[1].pageContent[0].data.actionFinder.featuredLinks[ key ].href#/governmentService),
                name = stackedRowSections[1].pageContent[0].data.actionFinder.featuredLinks[ key ].text,
             ]
        ]
    },{
        id = (page url) + "/#" + stackedRowSections[1].pageContent[0].data.actionFinder.generalHeading (sluggified?),
        name = stackedRowSections[1].pageContent[0].data.actionFinder.generalHeading,
        itemListElement = [
            itemOffered = [
                type ="governmentService"
                id = (add in future iteration, once service pages, how-tos, guides are created:  
                stackedRowSections[1].pageContent[0].data.actionFinder.links[ key ].href + "/#governmentService"),
                name = stackedRowSections[1].pageContent[0].data.actionFinder.links[ key ].text,
             ]
        ]
    },{
         id = (done in future iteration when topic content type has structured data implmented: (page url) + "/#" + stackedRowSections[1].pageContent[2].data.sectionThreeUp.compHeading.text (sluggified?))
         name = stackedRowSections[1].pageContent[2].data.sectionThreeUp.compHeading.text
         itemListElement = [
             itemOffered = [
                 id = stackedRowSections[1].pageContent[2].data.sectionThreeUp.sections[ key ].title.href
                 name = stackedRowSections[1].pageContent[2].data.sectionThreeUp.sections[ key ].title.text
                 NEST Subtopics?
              ]
         ]
         
     }],
     ...
     GovernmentOffice for locations?
     Sub/parent organization for related orgs?  Or another list?
]
~~~

### Draft rendered json+ld object for future iterations
~~~
  append to json+ld <script> object above
  "address": {
    "@type": "PostalAddress",
    "@id": http://mayflower.digital.mass.gov/?p=pages-ORG-Health-Services/#primaryaddress",
    "streetAddress": "1 Ashburton Place, 11th floor",
    "addressLocality": "Boston",
    "addressRegion": "MA",
    "postalCode": "02108"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "@id": "http://mass.gov/eohhs/#primarycontactpoint",
      "contactType": "customer service",
      "contactOption": "Main",
      "telephone": "+1(617) 573-1600",
      "description": "This line is open from 9a.m. - 5p.m., M-F",
      "email": "hello@mass.gov",
      "faxNumber": "1+(413) 499-4262",
      "areaServed": "MA"
    },
    {
      "@type": "ContactPoint",
      "@id": "http://mass.gov/eohhs/#tollfreecontactpoint",
      "telephone": "+1(800) 432-4321",
      "contactType": "customer service",
      "contactOption": "TollFree",
      "description": "This line is open from 9a.m. - 5p.m., M-F",
      "areaServed": "MA"
    },
    {
      "@type": "ContactPoint",
      "@id": "http://mass.gov/eohhs/#ttycontactpoint",
      "telephone": "+1(617) 555-7777",
      "contactType": "customer service",
      "contactOption": "TTY",
      "description": "For those who need accessible services",
      "areaServed": "MA"
    },
    {
      "@type": "ContactPoint",
      "@id": "http://mass.gov/eohhs/#voicerelaycontactpoint",
      "telephone": "+1(617) 555-5255",
      "contactType": "customer service",
      "contactOption": "VoiceRelay",
      "description": "",
      "areaServed": "MA"
    }
  ],
  "hasOfferCatalog": [
    {
      "@type": "OfferCatalog",
      "@id": "http://mayflower.digital.mass.gov/?p=pages-ORG-Health-Services/#featured-actions",
      "name": "Featured Actions",
      "itemListElement": [
        {
          "@type": "Action",
          "@id": "http://mass.gov/eohhs/howToX"
        },
        {
          "@type": "Action",
          "@id": "http://mass.gov/eohhs/howToY"
        },
        {
          "@type": "Action",
          "@id": "http://mass.gov/eohhs/howToZ"
        }
      ]
    },
    {
      "@type": "OfferCatalog",
      "@id": "http://mass.gov/eohhs/#featuredservices",
      "name": "Featured Services",
      "itemListElement": [
        {
          "@type": "Service",
          "@id": "http://mass.gov/eohhs/MassHealth"
        },
        {
          "@type": "Service",
          "@id": "http://mass.gov/eohhs/MentalHealth"
        },
        {
          "@type": "Service",
          "@id": "http://mass.gov/eohhs/IndoorAirQuality"
        }
      ]
    },
    {
      "@type": "OfferCatalog",
      "@id": "http://mass.gov/eohhs/#relatedcontent",
      "name": "Related Content",
      "itemListElement": [
        {
          "@type": "Action",
          "@id": "http://mass.gov/eohhs/howToABC"
        },
        {
          "@type": "Service",
          "@id": "http://mass.gov/eohhs/SeniorCare"
        },
        {
          "@type": "GovernmentOrganization",
          "@id": "http://mass.gov/dor"
        }
      ]
    }
  ],
  "subOrganization": [
    {
      "@type": "governmentOrganization",
      "@id": "http://mass.gov/eohhs/Board-of-Registration-in-Medicine"
    },
    {
      "@type": "governmentOrganization",
      "@id": "http://mass.gov/eohhs/Department-of-Children-and-Families"
    },
    {
      "@type": "governmentOrganization",
      "@id": "http://mass.gov/eohhs/Department-of-Developmental-Services"
    },
    {
      "@type": "governmentOrganization",
      "@id": "http://mass.gov/eohhs/Department-of-Elder-Affairs"
    },
    {
      "@type": "governmentOrganization",
      "@id": "http://mass.gov/eohhs/Department-of-Mental-Health"
    }
  ]
}
</script>
~~~