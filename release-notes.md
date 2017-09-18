# Mayflower Release Notes

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

```
<ticket/issue #>: Human-friendly description, with hyperlinked patterns (<Link to #PR>)
```

**For example**
- DP-1234: The short description text on a [service detail](http://mayflower.digital.mass.gov/?p=pages-detail-for-service-howto-location) page banner ([@organisms/by-template/page-banner](http://mayflower.digital.mass.gov/?p=organisms-page-banner)) should now render ([PR #493](https://github.com/massgov/mayflower/pull/493)) 

## Upcoming (add in progress changes here)

### Added

### Changed

### Removed

### Migrate Path

## 6.0.0

### Added

### Changed

- Patterns move to an Archived folder
    - Blog Feed
    - Action Cards
    - Action Gallery
    - Banner Carousel
    - Change Log
    - Feedback Form
    - Test Feed
    - Top Actions
    - Collage Header
    - Breadcrumbs
    - Callout Links

### Removed
- Organisms
    - Action Details
    - Quick Actions
    - Sidebar Contact
    - Sidebar Promo
    - Sidebar Widgets
    - Rich Text Description
    - Teaser Text
    - Split50
- Molecules
    - Action Event
    - Action Image
    - Header Contact
    - State Util
    - Wait Time
    - Field Submit
    - Related Action
- Atoms
    - Button Link

### Migrate Path
- Input Checkbox
    - `inputCheckbox.checked` is now a boolean value
- Input Radio
    - `inputRadio.checked` is now a boolean value
- Comp Heading 
    - `centered` is now a boolean value
- Video
    - Updated Twig markup

## 5.7.2

### Added

### Changed

- DP-5466 - Users can now enter in a zip or town in the town/zip location listing filter and press enter (i.e. without selecting an item from the autocomplete dropdown) AND select an autocomplete item from teh drop down to sort locations.

## 5.7.1

### Added

### Changed

- DP-5466 - Users can now enter in a zip or town in the town/zip location listing filter and press enter (i.e. without selecting an item from the autocomplete dropdown) to sort locations.

### Removed

### Migration path

## 5.7.0

### Added

- DP-4730 - Users will now notice there is now an option to render an [Event page with an end date](http://mayflower.digital.mass.gov/?p=pages-event-end-date). ([PR #566](https://github.com/massgov/mayflower/pull/566))
- DP-4881 - The [Press release page](http://mayflower.digital.mass.gov/?p=pages-press-release) now renders with (optional) subtitle content. ([PR #556](https://github.com/massgov/mayflower/pull/556))
- DP-3235 - Screen reader users are now informed of the [download link](http://mayflower.digital.mass.gov/?p=molecules-download-link) file size. ([PR #522](https://github.com/massgov/mayflower/pull/522))
- DP-3234 - Screen reader users are now informed of a page's category (i.e. Decision, Regulation) in [the context of the page title](http://mayflower.digital.mass.gov/?p=organisms-page-header).  (See also [`@organisms/by-template/illustrated-header`](http://mayflower.digital.mass.gov/?p=organisms-illustrated-header), [PR #509](https://github.com/massgov/mayflower/pull/509))
- DP-3232, 1369 - Screen reader users can now associate key actions link content with their respective heading content.  Also, there is now a [variant to the Comp heading](http://mayflower.digital.mass.gov/?p=atoms-comp-heading-as-sidebar-heading) which renders styled as a Sidebar Heading. ([PR #518](https://github.com/massgov/mayflower/pull/518))
- DP-5175 - A "more" link will now render on different sections of [Service](http://mayflower.digital.mass.gov/?p=pages-service) and [Service Detail](http://mayflower.digital.mass.gov/?p=pages-detail-for-service-howto-location) pages. ([PRs #570](https://github.com/massgov/mayflower/pull/570), [#551](https://github.com/massgov/mayflower/pull/551))
- DP-4591 - A "learn more" link has been added to the [contact us molecule](http://mayflower.digital.mass.gov/?p=molecules-contact-us-collapsed-with-more-link), as seen on [How-To pages](http://mayflower.digital.mass.gov/?p=pages-howto) which can provide a link to learn more about an organization referenced by a contact. ([PR #542](https://github.com/massgov/mayflower/pull/542))
- DP-4508 - A new component ([content eyebrow](http://mayflower.digital.mass.gov/?p=organisms-content-eyebrow)) i.e. "relationship indicators") has been created and added to pages that use [illustrated header](http://mayflower.digital.mass.gov/?p=organisms-illustrated-header) (i.e. [guides](http://mayflower.digital.mass.gov/?p=pages-guide)) and [page banner](http://mayflower.digital.mass.gov/?p=organisms-page-banner-as-columns) (i.e. [topic pages](http://mayflower.digital.mass.gov/?p=pages-topic) and [services](http://mayflower.digital.mass.gov/?p=pages-service)). ([PR #539](https://github.com/massgov/mayflower/pull/539))
- DP-3909 - [Tabular data](http://mayflower.digital.mass.gov/?p=organisms-tabular-data) (i.e. Fees) can now have an optional text description, as seen on the [How-to page](http://mayflower.digital.mass.gov/?p=pages-howto). ([PR #538](https://github.com/massgov/mayflower/pull/538))
- DP-4211 - We created a new [iframe](http://mayflower.digital.mass.gov/?p=atoms-iframe) pattern. (PRs [#510](https://github.com/massgov/mayflower/pull/510), [#574](https://github.com/massgov/mayflower/pull/574))

### Changed

- DP-1900 - Contact address "Directions" (i.e. in [page header organism as seen on Location Pages](http://mayflower.digital.mass.gov/?p=organisms-page-header-for-location) links now remain on one line; fixed for Firefox browser. ([PR #543](https://github.com/massgov/mayflower/pull/543))
- DP-3189 - The details of a piece of contact information (i.e. the hours of operation for a phone number) are now easier to read (i.e. stronger, italics removed). ([PR #512](https://github.com/massgov/mayflower/pull/512))
- DP-4311 - The content for the [Org. Landing Page](http://mayflower.digital.mass.gov/?p=pages-organization) "finder" subheadings in Mayflower are now service-oriented ([PR #540](https://github.com/massgov/mayflower/pull/540))
- DP-4103 - Card titles on Topic page cards are now properly aligned when using the IE 11 browser. ([PR #526](https://github.com/massgov/mayflower/pull/526))
- DP-3195 - Visitors navigating using a keyboard will have an easier time keeping track of their cursor focus through the [main navigation pattern](http://mayflower.digital.mass.gov/?p=molecules-main-nav). ([PR #495](https://github.com/massgov/mayflower/pull/495))
- DP-4195 - When a visitor uses Google translator the [callout links](http://mayflower.digital.mass.gov/?p=molecules-callout-link) boxes will render correctly. ([PR #535](https://github.com/massgov/mayflower/pull/535))
- Fix typos and adhere to style guide ([PRs #549](https://github.com/massgov/mayflower/pull/549), [#563](https://github.com/massgov/mayflower/pull/563), [#562](https://github.com/massgov/mayflower/pull/562), [#561](https://github.com/massgov/mayflower/pull/561), [#560](https://github.com/massgov/mayflower/pull/560)).
- DP-4877 - Vertical spacing between multiple signees for press release has been increased. ([PR #555](https://github.com/massgov/mayflower/pull/555))
- DP-3228 - Accordion functionality (as seen in [Emergency Alerts](http://mayflower.digital.mass.gov/?p=organisms-emergency-alerts) and mobile [Section Links](http://mayflower.digital.mass.gov/?p=organisms-section-links) now properly announce their open/closed state to screen reader users. ([PR #499](https://github.com/massgov/mayflower/pull/499))
- DP-5394 - Location listings functionality works in IE11 ([PR #580](https://github.com/massgov/mayflower/pull/580))

### Removed
- DP-4480 - The filter for the [action finder](http://mayflower.digital.mass.gov/?p=organisms-action-finder) has been removed (as seen on [Service pages](http://mayflower.digital.mass.gov/?p=pages-service)).  Soon, when there are +6 links, "More" links will render to replace this functionality.  ([PR #536](https://github.com/massgov/mayflower/pull/536))

### Migrate path

- DP-4730 - To use this new end date feature, update [`@molecules/event-teaser.twig`](https://github.com/massgov/mayflower/blob/dev/styleguide/source/_patterns/02-molecules/event-teaser.twig) by adding the `raw|nl2br` filters to the `eventTeaser.date.summary` variable as seen in [PR #566](https://github.com/massgov/mayflower/pull/566/commits/e7568e32d5f7005b82ca0c2eb980ee9a57d1b3b1).
- DP-3235 - To use this new accessibility feature, update `@molecules/download-links.twig` with the visually hidden span element as seen in [PR #522](https://github.com/massgov/mayflower/pull/522/files).
- DP-3234 - To use this new accessibility feature, update `@organisms/by-tempate/page-header`, `@organisms/by-template/illustrated-header` with visually hidden span and aria-hidden attribute; and populate the `prefix` or `category` variable as seen in [PR #509](https://github.com/massgov/mayflower/pull/522/files).
- DP-3232, 1369 - To use this new accessibility feature, populate the `keyActions.compHeading.id` variable and add the 'aria-labelledby' property to [`@organisms/by-author/key-actions`](http://mayflower.digital.mass.gov/?p=organisms-key-actions) as seen in [PR #518](https://github.com/massgov/mayflower/pull/518/files).  To use the new feature which renders a sidebar set `compHeading.sidebar` to `true` and add the conditional block to the top of [`@organisms/by-author/key-actions`](http://mayflower.digital.mass.gov/?p=organisms-key-actions) as seen in [PR #518](https://github.com/massgov/mayflower/pull/518/files).
- DP-3195 - To use this new accessibility feature, add the tabindex to the [@molecules/main-nav](http://mayflower.digital.mass.gov/?p=molecules-main-nav) pattern as seen in [PR #495](https://github.com/massgov/mayflower/pull/495).
- DP-4195 - To get this fix, update [`@molecules/callout-link`](http://mayflower.digital.mass.gov/?p=molecules-callout-link) as seen in [PR #535](https://github.com/massgov/mayflower/pull/535).
- DP-5175 - To get this new "more" link functionality for link list and form downloads, populate the `linkList.more` and `formDownloads.more` variables and update the [`@organisms/by-author/link-list`](http://mayflower.digital.mass.gov/?p=organisms-link-list) and [`@organisms/by-author/form-downloads`](http://mayflower.digital.mass.gov/?p=organisms-form-downloads) templates as seen in [PR #551](https://github.com/massgov/mayflower/pull/551/files).
- DP-4591 - To use this new contact us "learn more" link functionality, populate the `contactUs.decorativeLink` variable and update [`@molecules/contact-us`](http://mayflower.digital.mass.gov/?p=molecules-contact-us) as seen in [PR #542](https://github.com/massgov/mayflower/pull/542/files).
- DP-4508 - To use this new component, populate the `contentEyebrow` variable and create [`@organisms/by-template/content-eyebrow`](http://mayflower.digital.mass.gov/?p=organisms-content-eyebrow) as seen in [PR #539](https://github.com/massgov/mayflower/pull/539/files).
- DP-3909 - To use this new description feature, populate the `tabularData.description` variable and update [`@organisms/by-author/tabular-data`](http://mayflower.digital.mass.gov/?p=organisms-tabular-data) as seen in [PR #538](https://github.com/massgov/mayflower/pull/538/files).
- DP-3228 - To use this accessibility fix, update the [`@molecules/button-alert`](http://mayflower.digital.mass.gov/?p=molecules-button-alert) [`@organisms/by-template/emergency-alerts`](http://mayflower.digital.mass.gov/?p=organisms-emergency-alerts) and [`@molecules/section-links`](http://mayflower.digital.mass.gov/?p=organisms-section-links) patterns as seen in [PR #499](https://github.com/massgov/mayflower/pull/499/files).

## 5.6.1

## Added

## Changed
- For developers - update the deploy script to not require an asset path by default for a prod or fork deploy and to not set the default to mayflower/assets for prod releases.

## Removed

## 5.6.0

### Added
- DP-4181 - Folks browsing through the repository will notice new documentation which explains how to get set up, develop, and make other contributions to Mayflower!  This documentation is linked from the [shiny new repo readme](https://github.com/massgov/mayflower). ([PR #532](https://github.com/massgov/mayflower/pull/532)) 
- DP-4053 - Developers can now follow a documented build + deploy process to ship their code to their own GitHub Pages where their work can be seen and tested! This documentation is linked from the [shiny new repo readme](https://github.com/massgov/mayflower). ([PR #530](https://github.com/massgov/mayflower/pull/530))
- DP-4046 - The change above is possible because we can now host Mayflower from a subdirectory (i.e. <myname>.github.io/mayflower)! ([PR #503](https://github.com/massgov/mayflower/pull/503))
- DP-4080 - Developers, reviewers, and release managers can (and should!) now follow documentation on Semantic Versioning as it applies to Mayflower.  This means we have guidelines to help reviewers understand what kind of change the code they are reviewing is and to help release managers understand what kind of version of Mayflower they are releasing. This documentation is linked from the [shiny new repo readme](https://github.com/massgov/mayflower). ([PR #504](https://github.com/massgov/mayflower/pull/504))
- We documented all the things!  Well, almost all. :)  Check out patterns used on [Service](http://mayflower.digital.mass.gov/?p=pages-service), [How-To's](http://mayflower.digital.mass.gov/?p=pages-howto), [Guides](http://mayflower.digital.mass.gov/?p=pages-guide), [Locations](http://mayflower.digital.mass.gov/?p=pages-location-park-content), [Topics](http://mayflower.digital.mass.gov/?p=pages-topic), and [Events](http://mayflower.digital.mass.gov/?p=pages-event) and prepare ready to be informed! (Remember you can navigate to child patterns by clicking links down in the "Lineage" section.)  More goodness coming soon. (PRs [#521](https://github.com/massgov/mayflower/pull/521), [#523](https://github.com/massgov/mayflower/pull/523), [#524](https://github.com/massgov/mayflower/pull/524), [#527](https://github.com/massgov/mayflower/pull/527), [#529](https://github.com/massgov/mayflower/pull/529), [#533](https://github.com/massgov/mayflower/pull/533))

### Changed
- Outside contribution from @sghoweri - Developers will notice that we now use a fork of Pattern Lab maintained by a Drupal Pattern Lab GitHub organization, with hopes of innovating, and iterating on Pattern Lab and merging changes back upstream to the main Pattern Lab fork.  

  This also allows us to see pattern inheritance: browse to a pattern, click the cog icon in the top-right corner, click show pattern info, and see where else patterns are used and which child patterns a given pattern contains. (PRs [#488](https://github.com/massgov/mayflower/pull/488) and [#519](https://github.com/massgov/mayflower/pull/519))  Thanks Salem!
 - Outside contribution from @evanlovely - Developers will notice an improvement to the automatic  build + browser reload during local development. ([PR #506](https://github.com/massgov/mayflower/pull/506)) Thanks Evan! 
- Developers will notice standardization on a pattern for writing pattern modification classes, this accounts for nearly all of the backwards-compatible `.twig` changes in this release.
- Developers and implementers will notice that [`@molecules/footnote`](http://mayflower.digital.mass.gov/?p=molecules-footnote) now has an option to render as plain text (as seen in Mass.gov Regulation pages, etc.) ([PR #541](https://github.com/massgov/mayflower/pull/541))
- Contribution from our very own @meghandavis - See that typo on the [Press Listing page](http://mayflower.digital.mass.gov/?p=pages-press-listing)?  Nope.  That's because it's fixed!  Thanks Meghan!!

### Removed
- DP-4603 - For developers, the `phing deploy`  task which circle kicks off to deploy to `massgov/mayflower-artifacts` no longer writes to `env.js` (since it's been removed) to set a theme path for js.  ([PR #544](https://github.com/massgov/mayflower/pull/544))  Implementers should do this work in their site codebase.  See an example of this at [Mass.gov PR #1065](https://github.com/massgov/mass/pull/1065)

### Migrate path

- See note for DP-4603 above for steps to implement this change.

## 5.5.0

Here comes another Mayflower release, hot off the summertime presses!  We've got 2 new page types and lots of little improvements and fixes coming your way.
 
 **JIRA fans can check out the [release tickets](https://jira.state.ma.us/projects/DP/versions/14642) for more information.*
 **Mayflower project consumers can take a look at PR's below to confirm, make, and test any markup changes introduced by this release prior to updating in production.*
 
### New Features
- New page type: [Board Decisions](http://mayflower.digital.mass.gov/?p=pages-board-decision), which is used for rulings, decisions and opinions issued by agency boards or individuals given the authority to decide specific matters. ([@pages/board-decision](http://mayflower.digital.mass.gov/?p=pages-board-decision), See [PR #494](https://github.com/massgov/mayflower/pull/494))
- We've also added an example [Form Page](http://mayflower.digital.mass.gov/?p=pages-form-page-example) to highlight form styles (projects likely implement forms using other services) (See [PR #490](https://github.com/massgov/mayflower/pull/490) - Markup)
- News ([@organisms/by-author/press-listing](http://mayflower.digital.mass.gov/?p=organisms-press-listing)) and events ([@organisms/by-author/event-listing](http://mayflower.digital.mass.gov/?p=organisms-event-listing)) are now surfaced on additional page types (See [PR #498](https://github.com/massgov/mayflower/pull/498) - Markup)

### Improvements
- We've added some keyboard functionality to our google map ([@molecules/googlemap](http://mayflower.digital.mass.gov/?p=molecules-google-map)) pattern (See [PR #489](https://github.com/massgov/mayflower/pull/489) - JS only)
- We've made the [Regulation page type](http://mayflower.digital.mass.gov/?p=pages-regulation)  more uniform to other "law" page types (See [PR #494](https://github.com/massgov/mayflower/pull/494) - Markup))

### Fixes
- The short description text on a [service detail](http://mayflower.digital.mass.gov/?p=pages-detail-for-service-howto-location) page banner ([@organisms/by-template/page-banner](http://mayflower.digital.mass.gov/?p=organisms-page-banner)) should render (See [PR #493](https://github.com/massgov/mayflower/pull/493))
- Assistive tech like screenreaders will now read callout stats ([@molecules/callout-stats](http://mayflower.digital.mass.gov/?p=molecules-callout-stats)) more naturally (See [PR #500](https://github.com/massgov/mayflower/pull/500) - Markup + CSS)
- Semantic search form ([@molecules/header-search]()) label and placeholder text are more understandable (See [PR #485](https://github.com/massgov/mayflower/pull/485) - Markup + demo content)
 
## 5.4.0
In this new minor release, we've introduced two new Law pages: Policy Advisory and Executive Order, along with several improvements and fixes.

**Projects implementing Mayflower should see the [release tickets](https://jira.state.ma.us/projects/DP/versions/14641) and confirm, make, and test any markup changes introduced by this release prior to updating in production.*

### New Features
- Created a [Policy Advisory](http://mayflower.digital.mass.gov/?p=pages-policy-advisory-directive) page type (`@pages/policy-advisory-directive`, `@templates/01-content-types/policy-advisory`) used for Directives, Letter Rulings, Administrative Procedures, Opinions, TIRs. (DP-3825)
- Created an [Executive Order](http://mayflower.digital.mass.gov/?p=pages-executive-order) page type (`@pages/executive-order.twig
`, touched `@molecules/image-promo.twig`, `@molecules/listing-table.twig`) (DP-3829)

### Improvements
- We now have a medium icon (`@atoms/05-icons/svg-medium`) available for patterns like the social media link lists (DP-3495)
- News items can now have an optional featured image (`@templates/01-content-types/press`) (DP-3831)
- Detail page (for service, how-to, location - `@pages/detail-for-service-howto-location`) has been updated: removed key actions, added video (`@atoms/09-media/video`) and map (`@organisms/by-author/mapped-locations`) (DP-3891)

### Fixes
- We've made "Directions" link text (`@molecules/contact-group`) more helpful for screen readers (DP-3227)
- Callout alert links (`@organisms/by-author/callout-alert`)  are now more semantic and accessible (DP-3236)
- The "Go to class Mass.gov" link no longer overlaps with the skip-to link (`@organisms/by-template/header`) for keyboard users (DP-3191)
- Sticky nav links (`@molecules/sticky-nav`) for location and location detail pages are now consistent (DP-3822)
- Inactive (i.e. clickable) sort buttons (`@atoms/01-buttons/button-sort`) now appear clickable, like a link (DP-3890)
-  Homepage > popular searches underline (`@organisms/search-banner.scss`) is now centered (DP-3895)
-  Background images on illustrated links (`@molecules/illustrated-link`) no longer repeats right edge (DP-4026)
- Long text renders in the sidebar correctly (`@atoms/content_link.scss`) (DP-2352)
- Page banner images (`@organisms/page_banner.scss`) will scale as large as possible (be zoomed out) to cover the page banner. (DP-4310)

## 5.3.0
We've added some functionality to the location listings organism ([@organisms/by-author/location-listing](http://mayflower.digital.mass.gov/?p=organisms-location-listing))!  You can sort, filter, and paginate listing results! 

Note: The location listing organism is made up of lots of other patterns:
  - [@molecules/location-filters](http://mayflower.digital.mass.gov/?p=molecules-location-filters)
  - [@molecules/results-heading](http://mayflower.digital.mass.gov/?p=molecules-results-heading)
  - [@molecules/google-map](http://mayflower.digital.mass.gov/?p=molecules-google-map)
  - [@molecules/pagination](http://mayflower.digital.mass.gov/?p=molecules-pagination)
  - [@organisms/by-author/image-promos](http://mayflower.digital.mass.gov/?p=organisms-image-promos)
  
  And of course, you can still use those patterns in other components!

## 5.2.0

In this short-but-sweet minor release we add a new pilot logo to the header, create a new fixed call to action that floats left/right down at the bottom of the page (see: `@molecules/floating-action.md`), and fix a pesky bug that was centering many headings that should not have been centered.

## 5.1.0

To kick June off, there's a new Mayflower minor release. Announcements Listings and Events are the headliners, but lots of improvements make an appearance at the concert too.

For folks that want to see all the notes:
https://jira.state.ma.us/projects/DP/versions/14638

### NEW FEATURES

- Announcing all the things! Announcement Listing pages cover everything from press releases to speeches. Additionally, content on this page can be filtered by type, agency, topic, and other classifications.
- Event listings and event details for single instance events and those that recur.
- Directions link now appears after clicking on map pins
- All available activities at a location are now listed on Location pages
- Video description/transcript page has been added
- "Your Government" version of Topic pages now exist

### IMPROVEMENTS

- The main menu (at the top of all pages) is much more accessible with improved ordering if you're tabbing between links.
- Consistent spacing between patterns has been added.
- Southbridge location page had its banner coursel replaced with a banner image and Google map.
- Coloring and spacing fixes on the homepage.
- Wording and width adjusted on guides.
- Adjustments to the Location page, with some items removed (quick actions, breadcrumbs, wait times) and added (key actions, contact list).
- Key actions added to Location Park page.
- Details content type is more adaptive to different screen sizes.
- Small label/text changes and other tiny adjustments on Org, G2G, Section Landing, Topic Transition, Helpful Links, Service, Location, and Event Listin pages.

## 5.0.0

Sometimes you have to break a few eggs to make an Omlette.  For our next major release (5.0), we're introducing a new Announcement page type and had to change some existing code in progress.

**Note:** This bump from 4.* to 5.* is considered a major release, which means all of our friends who make their sites Mayflowery with this code should read on and integrate locally before updating anything in production.  If you're interested, you can see our integration test steps for Drupal in this [google doc](https://docs.google.com/document/d/1pbb-l0G39y9o8QMElxGzSi7nBBxDaV9k7hHdxmWAiaU/edit#).

### SUMMARY
If you'd like to see the tickets in JIRA:

- [DP-3167 [MF] News/Announcement Detail Page](https://jira.state.ma.us/browse/DP-3167)

### NEW FEATURES
- Mayflower now has a new Announcement Content Type and Page

### IMPROVEMENTS
1. Page Header
  a. Added Category field
  b. Added Social Icons pattern
2. Linked List
  a. removed v3.5 compatibility code
  b. Added optional eyebrow and date elements
3. Personal Message (breaking change)
  a. updated styling, html, json (Pilot version) to match designs for Announcement page
4. Footer (breaking change)
  a. Change data variable for socialLinks to footerSocialLinks
  b. moved custom styling for social links into the footer.scss file
5. Social Links
  a. Added optional label
  b. Added data attribute to record type of social icon (for JavaScript)
6. SVG Social icons
  a. now have a default color (fill value set on the path)
7. Header Tags (breaking change)
  a. Changed label to use JSON content
8. Image Promo
  a. Added missing height and width variables to image data
  b. Using image atom instead of img tag.
9. Video
  a. width and height variables were not coded correctly

## 4.2.0

### SUMMARY
If you'd like to read about these changes in JIRA:

* [DP-2956](https://jira.state.ma.us/browse/DP-2956) - 	[mf] Update "Pages" names on Mayflower to reflect internal language
* [DP-2977](https://jira.state.ma.us/browse/DP-2977) - [dev] Locations not displayed on service page
* [DP-2981](https://jira.state.ma.us/browse/DP-2981) - [mf] Fix style for time callout and downloads area in Guide sections
* [DP-2983](https://jira.state.ma.us/browse/DP-2983) - [mf] Sidebar headers appear when there is no sidebar information.
* [DP-3077](https://jira.state.ma.us/browse/DP-3077) - [MF] G2G Color Styles

### NEW FEATURES
We have a new color scheme for Gov to Gov pages and patterns!  Take a look under the new Pages > G2G dropdown!  Bonus: if you're on a different page, you can switch over to the G2G theme by typing "cranberry" into the header search and clicking "submit". :) (do this again to get back to the regular theme)

### IMPROVEMENTS
We updated the page patterns (see the Pages dropdown) to match our more generic page type names

### FIXED
As part of this release we fixed a few issues.

1. We fixed a bug where some addresses with special characters weren't showing up on maps.
2. Time callouts and downloads are now aligned with the rest of the page content, even when there is no sidebar content on the page or page section
3. We should no longer see any sidebar widget markup when there is no content for them.

## 4.1.0

### SUMMARY
If you'd like to read about these changes in JIRA:

* [DP-2042](https://jira.state.ma.us/browse/DP-2042) - [Pattern Lab] Location Listings
* [DP-2078](https://jira.state.ma.us/browse/DP-2078) - [dev] Update Interstitial Page Code
* [DP-2400](https://jira.state.ma.us/browse/DP-2400) - [a11y] Add more context to the linked text "Log in to..."
* [DP-2693](https://jira.state.ma.us/browse/DP-2693) - [dev] Update template to remove arrow in Activities
* [DP-2734](https://jira.state.ma.us/browse/DP-2734) - [Pattern Lab] Regulations
* [DP-2853](https://jira.state.ma.us/browse/DP-2853) - [dev] Contact section appears even when there is no additional contact added.
* [DP-2963](https://jira.state.ma.us/browse/DP-2963) - [Pattern Lab] Update color variable names
* [DP-3094](https://jira.state.ma.us/browse/DP-3094) - [mf] Update "Service Detail" page to match inputs on build specs
* [DP-3149](https://jira.state.ma.us/browse/DP-3149) - [mf] - Ordered Steps - remove number if only one step
* [DP-3151](https://jira.state.ma.us/browse/DP-3151) - [mf] - Rich Text - nested ordered list
* [DP-3152](https://jira.state.ma.us/browse/DP-3152) - [mf] - Image Promo - optional description
* [DP-3155](https://jira.state.ma.us/browse/DP-3155) - [mf] - Location Filters - Refactor layout to accommodate more tags

### NEW FEATURES

- Ahem... introducing the latest page type to our family: Regulation Details! (Pages > REG 930 CMR 6).  This is a great page type to use to make it easy to read information regarding a specific regulation.
- Wait there's more... We also created a new Service Detail Page (Pages > Service Details).  Services might give you the top level information, but this is where the real information is for a specific service.

### IMPROVEMENTS

1. We've revisited how we named our Sass color variables.  Instead of using $c-theme-blue for example we are now using $c-theme-primary.  This update will make it easy for others to create new color schemes for the Mayflower Patterns.
2. The Location Listing page (Pages > Map listing human services) has been updated from the MVP version to the final version.  The Filters area was expanded to include additonal choices.  The Results area was updated to include tags to show which filters are currently being applied along with pagination.  The Results are also using a newer design that highlights the active or hovered location and makes the corresponding map marker bounce.
3. For the Image Promo pattern, we've changed the description from being a required field to being an optional field.
4. After testing the transition page with low to no vision users, we identified that changing the message from a paragraph to an H1 tag was an added benefit.    

### FIXED

As part of this release we fixed a few issues.

1. If a location didn't have any additional contacts the right rail contact us pattern was still showing the "Contacts" heading.  This pattern has been updated to check if it has contacts before rendering any html.
2. The Image Promo pattern was updated to check to check if the read more link has a "text" value before adding that link to prevent an empty link from being added.
3. When an Ordered Step pattern was added to a page with only one step, the number icon was still being shown and the html was being read as a list of one.  This pattern now checks the length of steps to render and only renders it as a numbered list if there are multiple steps.  Otherwise it just outputs a single Action Step item.
4. When a nested ordered list was added to a Rich Text pattern, the nested list items were also being rendered as numbers.  We've updated this to render letters instead.
5. The utility nav was having issue with accessibilty trying to understand the "login to..." link found in the utility nav.  A hidden element has been added to the link to provide more information that screen readers can see.

## 4.0.0

Mayflower turns 4.0.0!  Oh man.  We've been in the lab creating a new page type called How-To (formerly known as Action) and we've got lots of other ~candies~ updates and ~peeps~ goodies packed in to this ~easter basket~ release. :)

**Note:** This bump from 3.* to 4.* is considered a major release, which means all of our friends who make their sites Mayflowery with this code should read on and integrate locally before updating anything in production.  If you're interested, you can see our integration test steps for Drupal in this [google doc](https://docs.google.com/document/d/1pbb-l0G39y9o8QMElxGzSi7nBBxDaV9k7hHdxmWAiaU/edit#).

### SUMMARY
If you'd like to see the tickets in JIRA:

- [DP-2228 [pattern lab] How-to page updates](https://jira.state.ma.us/browse/DP-2228)
- [DP-2685 [mf] Add Tabular Fees module to How To Page](https://jira.state.ma.us/browse/DP-2685)

### NEW FEATURES
- Goodbye Action and hellooooooo How-To page.  Give her a spin at `Pages > HOWTO Unemployment`.
- That same left sticky nav that we all know and love in a How-To (Action) page is now it's own component. ;)  See `Molecules > Sticky Nav`
- We've got a nifty new list of contacts that can optionally be collapsed / expanded in an accordion, like in the main column of a How-To.  See `Organisms > By Author > Contact List`
- Since we were using it on a couple different page types, we created a Details template that contains the meat (or tofu) of the content area for How-Tos and Locations (they're similar in layout - remember right rail?!).  See `Templates > Content Types > Details`
- We now have a mobile-friendly pattern for data tables!  This new component displays as a table on wide screens and as a list on narrow screens.  See `Organisms > By Author > Tabular Data` - and remember you can change display size in pattern lab to see it change layout!

### IMPROVEMENTS
- We've renamed the Action Activities component to Image Promos (See `Organisms > By Author > Image Promos`).  This is a list of image promo molecules (See `Molecules > Image Promo`) that we see on location pages as recommended activities and on map listing pages.
- The Action Sequential List molecule has moved up in the world.  It's now called Steps Ordered and it's an organism!  This is the pattern that lists steps displayed as a numbered list.  See `Organisms > By Author > Steps - Ordered`
- Similarly, the Action Steps organism is now called Steps Unordered and it's got a new look!  This lists steps displayed as accordions that you can collapse and expand. See `Organisms > By Author > Steps Unordered`, `Molecules > Action Step` (with lots of variations!)
- We've made our downloads organism more flexible with an optional heading.  This allowed us to remove the Action Downloads molecule. We updated this new organism name to Form Downloads (replacing Form Download -- See `Organisms > By Author > Form Downloads`).  Finally, this organism includes several singular download link molecules.  See `Molecules > Download Link`.
- Finally, our Page Header organism (See `Organisms > By Template > Page Header`) is shiny like new!  It's still got the title and divider, but now you can also add some optional components to the sidebar (widgets) or under the Title and Sub Title (optional contents).  You can see this flexible pattern in action on the Org Page (`Pages > Org Landing Page`) -- it's all the content in white in between the page banner (title/image) and the action finder (What would you like to do?).

## 3.7.1
In this release of Mayflower, we're just stitching together a little patch with some TLC for the Topic page and also improving our accessibility.

### SUMMARY
Please feel free to check these tickets out in JIRA:

- [DP-2399](https://jira.state.ma.us/browse/DP-2399) The site name is not announced correctly in Voiceover
- [DP-2401](https://jira.state.ma.us/browse/DP-2401) The close button is announced as "close plus".
- Github #398 JavaScript Type Errors

### FIXED
- The site logo now introduces itself more accurately, as Mass.gov (instead of Mass gov which was mistaken for Mass Governor), to screen readers and other machines.
- The nifty little "X"  icon found on "close" buttons (think utility nav dropdown or mobile accordions for sub headings and cards) are now safely ignored by screen readers, since we already use text to describe the button.
- We squashed a pesky javascript bug that might have been preventing other javascript from running on the site. (perhaps functionality for a video or map wasn't loading)

## 3.7.0

### SUMMARY
We've updated the topic page!

If you'd like to read about this changes in JIRA:

* [DP-2117](https://jira.state.ma.us/browse/DP-2117) - [pattern lab] Topic Page Updates

### Improvements
* We've updated the Topic page! (Pages > Topic State Parks and Recreation) - and we're talking more than just a new name (no more L1's here!):
    * The new header layout includes a a spot for a description and a nifty new image size.
    * We've introduced some new variations to the card component (Molecules > Section Links) on the Topic Page:
        * You can now choose between regular links (by default) or callout links (Molecules > Section Links Callout Links).  This will help to call out How-To's and tasks associated with a service on a given topic page.
        * For those times when we don't want to fill the card up with too many links but we want people to know there are more goodies, we've add an optional more link to the bottom of the card.   

## 3.6.0

### SUMMARY
If you'd like to read about these changes in JIRA:

* [DP-2114](https://jira.state.ma.us/browse/DP-2114) - [pattern lab] Service Page
* [DP-2181](https://jira.state.ma.us/browse/DP-2181) - Update Guide Page in Mayflower
* [DP-2206](https://jira.state.ma.us/browse/DP-2206) - Implement org page level structured data json+ld object in Mayflower
* [DP-2569](https://jira.state.ma.us/browse/DP-2569) - Change header in Service page
* [DP-2471](https://jira.state.ma.us/browse/DP-2471) - Mayflower: guide section with all possible elements

### NEW FEATURES
- Ahem... introducing the latest page type to our family: Services! (Pages > Service Unemployment Benefits).  This is a great page type to use to help surface tons of information related to services, including: branding information, instructional videos, links to how-to's, location information listings, etc.
- We're making Org Landing Pages (Pages > Org Landing Page) more machine and search friendly by adding a Government Organization structured data pattern (Meta > Schema > Government Organization) to the bottom of the page markup.
- For Mayflower implementers, we've created an example Guide page which shows all of the possible elements that can go into a Guide section (Pages > Guide Section Example)  

### IMPROVEMENTS
- We've revisited the guide page with some updates.  We've consolidated the formerly 3 guide pages into one shiny new guide page with just those components that our content friends have identified as being pertinent:
  - removed the testimony component
  - alerts links are now optional
  - section key agencies are now optional
  - the related guides show the guide card treatment as opposed to the related pages image thumbnail treatment.

## 3.5.0

### DS-5
* DP-1307 - Display spacing issue in Agency Links area on subtopic (L2) pages
* DP-1734 - Word "Unemployment" not resizing correctly on Subtopic page on iPhone 5
* DP-1838 - Standardize on one icon for both internal and external links
* DP-1853 - Related Things - topics do not have the correct icon
* DP-2095 - SVG icons not being added properly to Rich Text links
* DP-2104 - Implement thumbnail scaling in PatternLab
* DP-2109 - Print Styles - Go to Classic Mass.gov appears at the top of every page, hiding text.
* DP-2110 - Print Styles - In Firefox, the Featured Topics menu has inches of margin on top and bottom

### DS-8
* DP-1370 - The keyboard focus on the "yes" and "no" radio buttons is barely visible on feedback form
* DP-1795 - Implement HIGH PRIORITY accessibility fixes from accessibility vendor SEE SUBTASKS
* DP-1849 - On location page, there are multiple links labeled "directions"
* DP-1878 - Fix focus when navigating by keyboard
* DP-1880 - Change focus style of "Go to classic Mass.gov" to be more visible
* DP-1881 - Focus indicator in top nav dropdowns is not visually clear enough
* DP-1893 - Modify alert show/hide code to use ARIA expanded

### Maintaince & Support
* DP-1995 - CLONE - Addresses in Contact Groups not showing all line breaks

## 3.4.2
* DP-1434 - Update location and design of feedback form

## 3.4.1
* Reset the gulp copy task to include the svg files

## 3.4.0 (Sprint 13)

### DS-5
* DP-1653 - Implement static MVP Map page in Patternlab
* DP-1670 - Remove static label "Guide:" from illustrated link
* DP-1673 - Size of cards varies in common actions, using Safari browser
* DP-1731 - Location icon cut off on home page on mobile
* DP-1763 - Stacked Row Icon Links - Text wrapping issue
* DP-1848 - Related Things - allow for org partners to highlight one or two actions
* DP-1996 - Google translate is only showing in Chrome & Safari browsers
* DP-2040 - Update language in Patternlab on Location Row

### Maintaince & Support
* DP-1434 - Update location and design of feedback form

## 3.3.0 (Sprint 12)

### DS-5
* DP-691 - Implement Google Translate in Pattern Lab
* DP-981 - PatternLab - Refactor header contact us
* DP-1535 - Modify topic nav in Pattern Lab in keeping with touch / desktop design update
* DP-1759 - Implement Location Row on Org Page in Patternlab
* DP-1737 - Key Actions - illustrated links don't grow in height
* DP-981 - PatternLab - Refactor header contact us
* DP-1264 - Header - Adding Back to Classic MG button
* DP-1264 - Patch for generalizing utility nav panels.

### DS-8
* DP-1367 - The "Top" button does not move keyboard focus to the top of the page.
* DP-1554 - The social media icons in the footer do not have appropriate alternative text.
* DP-1374 - The state of the Common Actions dropdown menu is not conveyed to screen readers.

### DS-23
* DP-1270 - Implement the structure data markup for location page type to mayflower

### Other
* DP-1521 - Interstitial page not displaying when clicking on common actions & guide links for topic and subtopic pages

## 3.2.2
* Fixes bump version bug

## 3.2.1 (Sprint 11)

### DS-5
* DP-1103 - Implement default file/download icon in Patternlab
* DP-976 - Implement topic funnel icons in Patternlab
* DP-686 - Design print styles for location pages
* DP-671 - Design print styles for organizational pages
* DP-644 - Design print styles for guides
* DP-658 - Design print styles for How-to pages

### DS-23 - External Search
* DP-1267 - Implement the structure data markup for page elements to mayflower

### DS-41
* DP-787 - Create Park Icons for Park Types, Activities, Users

### Bugs
* DP-1278 - [Action] Link & text alignment issue in action steps
* DP-1312 - Activities Paragraph shows link icon when there is no link
* DP-1279 - Spacing issue between numbered steps & rich text field
* DP-1521 - External links under jclickable containers were not firing the interstitial js

## 3.1.0 (Sprint 10)

### Org Page
* DP-708 - Implement Organization Page in PatternLab
* DP-867 - FE - Action Finder
* DP-874 - FE - Org: Implement Header

### Print Styles
* DP-671 - Design print styles for organizational pages
* DP-644 - Design print styles for guides
* DP-686 - Design print styles for location pages
* DP-658 - Design print styles for How-to pages

### Other
* DP-712 - Handle Stacked Row Optional Header Image variants
* DP-821 - Ensure that link chevron is never bumped to a new line
* DP-980 - Update handicap icon in Patternlab
* DP-730 - Implement footer in Pattern Lab
* DP-796 - Implement MVP Header - Utility Nav in Patternlab

## 3.0.0 (Sprint 9)

### Homepage search
* MGRP-339 - FE: Homepage build-out
* MGRP-304 - FE: Homepage - Multi-row template - refactor
* MGRP-311 - FE: Updated Header

### Org page
* MGRP-302 - FE: Org - Action Finder - enhance
* MGRP-300 - FE: Org - Icon Links
* MGRP-312 - FE: Section Divider
* MGRP-305 - FE: Org - section three up

### Bugs
* MQA-81 - [L2] - 'Featured' and 'All actions & guides' should be headers
* MGRP-290 - Vertically Align Callout links

### Print Styles
* MGVDU-141 - Design print styles for How-to pages
* MGVDU-438 - Design print styles for location pages
* MGVDU-439 - Design print styles for guides

### Other
* MGRP-258 - Updated Pattern Lab Documentation (molecules)
* MGRP-344 - FE - Update rich text image to allow captions and different classes.
* MGVDU-448 - Pilot Header update

## 2.2.0 (Sprint 8)

### MQA bugs

* MQA-23 - Links in the body are turning into a weird display
* MQA-62 - Pilot Homepage Header on mobile has wrong coloring
* MQA-65 - Opening the Common Actions menu in mobile also opens the common actions section on the pilot homepage
* MQA-67 - Cannot collapse Common Actions when open in menu in mobile
* MQA-74 - [action page] - ma__page-header__sub-title is marked-up wrong
* MQA-84 - [Action] - Contact markup headings are non-semantic

### Other
* MGVDU-202 - Action Finder - entire action item should be clickable
* MGVDU-354 - FE Dev - RTE columns - refactor
* MGVDU-357 - FE Dev: Action Steps - refactor
* MGRP-278 - FE Dev: Emergency alert bar
* MGRP-258 - Updated Pattern Lab Documentation (atoms)

## 2.1.0 (Sprint 7)

### Error pages
* MGVDU-253 - Front end: 404 page
* MGVDU-256 - Front end: 403 page
* MGVDU-259 - Front end: 500 page

### Other
* MGVDU-269 - Site Settings (utility nav) language dropdown
* MGVDU-283 - FE Dev: Location Banner - swap stacking order
* MGVDU-312 - FE Dev - Contact Group - refactor address
* MGVDU-313 - Firefox text wrapping bug on Related Topics section on some but not all pages

## 1.1.0 (Sprint 6)

### MGVDU-219 - FE Dev: Guide Page
* MGVDU-216 - FE Dev: Guide Page - Header Banner
* MGVDU-217 - FE Dev: Guide Page - Action Steps
* MGVDU-218 - FE Dev: Guide Page - Guide Sections
* MGVDU-270 - FE Dev: Guide Page - Jump Links
* MGVDU-271 - FE Dev: Guide Page - Callout Alert
* MGVDU-272 - FE Dev: Guide Page - Download Forms
* MGVDU-293 - FE Dev: Guide Page - Callout Time
* MGVDU-294 - FE Dev: Guide Page - Key Actions
* MGVDU-295 - FE Dev: Guide Page - Suggested Guides
* MGVDU-296 - FE Dev: Guide Page - Sidebar title
* MGVDU-300 - FE Dev: Guide - Rich Text 3 up

### MGVDU-208 - Basic Content Page
* MGVDU-88 - Page Discourse Component - using rich-text component instead
* MGVDU-278 - FE Dev: Breadcrumbs - collapsable

### Other
* MGVDU-138 - FE Dev: Modifications to Location/Action page: Multiple contacts
* MGVDU-287 - FE Dev: Alert Bar - Hides globally
* MGVDU-273 - Need fax icon for action page
* MGVDU-282 - Remove Javascript autopopulation of Quick Actions on Location page
* MGRP-154 - Callout Link - bottom margin
* MGRP-156 - Email link doesn't wrap.

## 0.5.0 (Sprint 5)

### MGVDU-181 - Location Page
* MGVDU-172 - Component: Hero Banner Carousel (Location Page)
* MGVDU-204 - FE Dev: Location - Wait Time Indicator
* MGVDU-203 - FE Dev: Location - Icon Indicators
* MGVDU-210 - FE Dev: Location - updated page header
* MGVDU-212 - FE Dev: Location - suggested pages
* MGVDU-213 - FE Dev: Location - inline gallery
* MGVDU-214 - FE Dev: Location - Action Activities section

### MGVDU-208 - Basic Content Page
* MGVDU-88 - Page Discourse Component
* MGVDU-275 - FE Dev - Basic Content - side bar Promo
* MGVDU-278 - FE Dev: Breadcrumbs - collapsable

### Other
* MGVDU-220 - FE Dev: Image credit component

## 0.4.0 (Sprint 4)

### Action Detail page modifications
* MGVDU-120 - FE Dev: Modifications to Action page: Image / diagram
* MGVDU-118 - FE Dev: Modifications to Action page: Sequential Lists
* MGVDU-119 - FE Dev: Modifications to Action page: Map
* MGVDU-137 - FE Dev: Modifications to Action page: OR Lists
* MGVDU-139 - FE Dev: Action Page Header

### Location Page
* MGVDU-174 - Component: Location Hero Banner
* MGVDU-171 - Component: Alert
* MGVDU-175 - Component: Upcoming Events

### Pilot Page
* MGVDU-87 - Feedback Form

## 0.3.0 (Sprint 3)

### Level 0,1,2 pages - Action Funnel
* MGVDU-53 - FE Dev: L0 Page (contains sub tickets)
* MGVDU-54 - FE Dev: L1 Page
* MGVDU-55 - FE Dev: L2 Page (contains sub tickets)

### Pilot Home page
* MGVDU-56 - FE Dev: Pilot homepage (contains sub tickets)

### Action Detail page modifications
* MGVDU-115 - FE Dev: Quick Action Component
* MGVDU-114 - FE Dev: Action Page - tabular data
* MGVDU-106 - FE Dev: Action Page - checklist
* MGVDU-116 - Responsive RTE Video
* MGVDU-139 - Action Page Header Update
* MGVDU-117 - Forms/Downloads

## 0.2.0 (Sprint 2)

### Action Detail page
* MGRV-89 - Related Contact Call-Out
* MGRV-88 - Task Detail Section
* MGRV-90 - Related Task Call-Out
* MGRV-92 - Breadcrumbs
* MGRV-91 - Task Detail Header

## 0.1.0 (Sprint 1)

### Header and Footer
* MGRV-38 - Header plus navigation
* MGRV-51 - Global Styling for elements
* MGRV-39 - Footer

## Sprint A

### Environment Setup
* MGRV-66 - Breakpoints (mobile desktop flow)
* MGRV-37 – Create Github Repo
* MGRV-40 – Setup Pattern Lab
* MGRV-42 – Setup Gulp
* MGRV-41 – Review 18F standards
* MGRV-45 - Create base styling (normalize, typography, RTE)
* MGRV-44 - Create partial sass files (colors, fonts, mixins)
* MGRV-46 - Populate asset folder with icons used (generate SVG sprite)
* MGRV-47 - setup up Web-Based Styleguid outline and scaffolding
* MGRV-50 - Setup dev environment
