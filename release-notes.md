# Mayflower Release Notes

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

