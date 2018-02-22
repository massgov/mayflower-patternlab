# Theming Strategy for mass.gov
## Background
The mass.gov site is made up of a two separate systems for backend development / data architecture and frontend development / design.  
* The backend development is built on the Open Mass project (https://github.com/massgov/openmass) which is built on the Drupal 8 (http://drupal.org) content management system.
* Then, this system integrates with a frontend development / design system called Mayflower (https://github.com/massgov/mayflower) that is built on the Pattern Lab (http://patternlab.io/) atomic design system.  

The idea of this model is to allow designers and frontend developers to work independent from the constraints of the system that implements them, in this case Drupal 8.

This document details two of the items that came out of research for implementing proper cache invalidation.  These were summarized in a table at the beginning of the following document: https://docs.google.com/document/d/1x4Apg8b8bJZxZRrsy8PagXDKd30L-yt78xIy8MTCXTo/edit.  Because of this colorful table, you will see the preprocess methodology referred to as “Yellow column theming” (even though it looks brown now) and the entity mapping methodology referred to as “Purple column theming” (I still can’t decide if it is purple or pink).

## Preprocessing into node templates (Yellow column)
Until recently, the strategy for integrating data from Mayflower into the Drupal system was to preprocess all of the data into the node template.  Whether the data is simply a field of this content type (node) or whether it is a field on a referenced node or whether it is a list of content (a view) based on a similar entity reference or taxonomy term, all of the data was loaded, collected, and formatted into a structure that the top level page pattern (template) could process.

This works nicely to keep Mayflower completely separate from Drupal, but instead of just being separate, it also creates some inflexibility, makes cache invalidation more complicated, and prevents being able to leverage the Drupal render caching system.

**Inflexibility**

On the Mayflower side, by having all of the page level patterns include all of the sub-level patterns (organism, molecule, or atom) without having ways to override different parts, we are forced to provide all data at once on that level instead of being able to override some sections and map smaller data structures to some of the sub-level patterns.

**Cache Invalidation Complexity**

When caching data in Drupal 8, cache tags are used to represent the dependencies of this cache.  When you render an entity in Drupal’s version of Twig, there are Drupal specific functions that add the entity to the cache object as a cache tag.  In this way, when a referenced entity is updated, the cache associated with the object doing the referencing can be invalidated so that it doesn’t preserve the stale content.  With preprocessing, we can still pass cache tags from referenced content back to the referencing item, but we have to remember to do this in code.  It is no longer done automatically by rendering an entity when we are pulling data from it.

**Render cache**

When different render arrays (like the one per entity) are rendered with Drupal’s version of twig, a new render cache object is created.  Because we are mostly processing data into one render array instead of a tree of render arrays, the entire node data is saved as one cache object.  When one part of it is updated, the whole piece of content must be recalculated.  If we had a tree of multiple render arrays, they would be separate cache objects.  With dynamic page caching, only the specific item needs to be recalculated and inserted into parent items.  

## Entity mapping (Purple column)
A new strategy for this project is being slowly adopted.  It is called entity mapping or sometimes render array mapping.  This involves only printing things that are stored on the current entity within that entity’s template file.  If it is a reference to another entity, it should be rendered as an entity where the separate entity’s template file can take over.  In order to do this, but still integrate with the Mayflower pattern lab instance, we need to provide twig blocks in Mayflower to allow these sections to be overridden in Drupal.  Then, when we override the block, we can print the entity as is instead of pulling individual fields.

An example might be helpful.  This is part of the Press Listing template as it currently exists in Mayflower (https://mayflower.digital.mass.gov/?p=organisms-press-listing):

  ```{% if pressListing.items %}
    <div class="ma__press-listing__items">
      {% for pressTeaser in pressListing.items %}
        {% set pressTeaser = 
          pressTeaser|merge({"level":teaserHeading}) %}
          {% include "@molecules/press-teaser.twig" %}
      {% endfor %}
    </div>
  {% endif %}
  ```

In the implementation of this pattern on the Drupal side, the pressListing.items are entity references from an organization page to two highlighted news articles.  Currently, we are getting the exact structure that we need in the preprocess function for the organization page.  

To update this to use entity mapping, we would first need this section in the Mayflower pattern to be a twig block.

```{% if pressListing.items %}
    <div class="ma__press-listing__items">
      {% block pressListingFeaturedBlock %}
        {% for pressTeaser in pressListing.items %}
          {% set pressTeaser = 
            pressTeaser|merge({"level":teaserHeading}) %}
            {% include "@molecules/press-teaser.twig" %}
        {% endfor %}
      {% endblock %}
    </div>
  {% endif %}
  ```

Then, in the normal place that we include this pattern, we would instead embed it and override the block.

```
{% embed “@organisms/by-author/press-listing.twig” %}
  {% block pressListingFeaturedBlock %}
    {{ content.field_org_featured_news_items }}
  {% endblock %}
{% endembed %}
```
Now, we are just printing the news entity in whatever view mode is set up in the display settings of the content type.  We should be able to use a new template file for node--news--teaser.html.twig and map the content directly to the @molecules/press-teaser.twig file with the twig ‘include with’ or ‘include with only’ functionality.

## For Future Development
**Case by Case**

The entity mapping method will be a great move for certain tasks, but there are quite a few tasks that could be done fairly quickly if they continue to use the preprocess (yellow column) theming.  Unless there is a very clear advantage to doing these tasks using the entity mapping (purple column) theming, it will advised to continue to use preprocessing.  For new content types or new blocks or sections of a content type that can be isolated, using entity mapping should be used.

**Render arrays and Combinations**

There will be some instances where a pattern joins together a few different types of entities in a way that preprocessing those into a custom type of render array could allow mapping items and taking advantage of some of the benefits but still requiring preprocessing.  Preprocessing is a part of theming in Drupal.  There is no reason to rule it out.  There will be circumstances that call for both preprocess and entity mapping.

**Entity Views Attach**

It is possibly unclear on how views data would get onto a content type page without preprocessing the data.  Because we are not using Drupal blocks, layouts, panels, or some other mechanism to pull in views content, the module Entity Views Attach should be helpful.  With this module, a view can be attached to a content type, passing in information from the entity that it is attaching to.  This enables integrating views data into the entity mapping based theming where the view itself is the entity.

