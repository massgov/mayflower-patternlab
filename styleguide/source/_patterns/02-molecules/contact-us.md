---
Title: Contact Us
---

##Fields:
* Title (optional) - object
  * href (optional) - string/url
  * target (optional) -  string "_blank" or ""
  * text - string
  * chevron - string/boolean - "false"
* Hide (optional) - string "Fax", "Address", or "" - States where the accordion should start.  If blank, the accordion isn't shown.
* Phone (optional) - Object
  * contains a Contact Group partial
* Online (optional) - Object
  * contains a Contact Group partial
* Fax (optional) - Object
  * contains a Contact Group partial
* Address (optional) - Object
  * Address 1 - string
  * Address 2 - string
  * City - string
  * State - string
  * zip - number
  * directions:
    * href - string/url - google map URL with street address
    * target (optional) -  string "_blank" or ""
    * text - string "directions"
    * chevron - string/boolean - "true"

##Partials:
* Contact Group

##Notes: