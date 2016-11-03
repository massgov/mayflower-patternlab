---
Title: Suggested Pages
---

##Fields:
* title - string
* view (optional) - string ("guide" or "") - toggles the view between illustrated links and Figure links 
* buttonMinor - object
  * link - string/url,
  * text - string 
* pages - array of objects
  * image - string/url
  * altTag - string - description of the image
  * link - object
    * type - string ("" or "external")
    * href - string/url
    * text - string

##Partials:
* Illustrated link
* Decorative Link
* Button Link 2(secondary) Small

##Notes:
* Component can show Guide links (illustrated links) or Images with a link below, but it can not show both.