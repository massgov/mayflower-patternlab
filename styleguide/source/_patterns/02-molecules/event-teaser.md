### Description
A Pattern that displays the Name, Location, Time, Date and a brief description of an event

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link

### Variant options
* Can be shown with the Date as a [graphic](./?p=molecules-event-teaser-with-graphic)


### Variables
~~~
eventTeaser: {
  title: 
    type: decorativeLink / optional
  location: 
    type: string (address) / optional
  date (optional) : {
    summary: 
      type: string (date) / required
    startMonth: 
      type: string / optional
    startDay:
      type: string / optional
    endMonth: 
      type: string / optional
    endDay:
      type: string / optional
  }
  time: 
    type: string / optional
  description: 
    type: string / optional
}
~~~
