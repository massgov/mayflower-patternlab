### Description
A Pattern that displays the Name, Location, Time, Date and a brief description of an event

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link

### Variant options
* Can be shown with the Date as a [graphic](./?p=molecules-event-teaser-with-graphic)

### Usage Guidelines
* The start and end month variables should always be a three letter month abreviation.
* The `time` variable should be formated as '12 p.m.' (not 12:00 p.m.)

### Variables
~~~
eventTeaser: {
  title: 
    type: decorativeLink / optional
  location: 
    type: string (address) / optional
  date: {
    summary: 
      type: string (human readable date) / required
    startMonth: 
      type: string (ie: Mar) / optional
    startDay:
      type: string (number) / optional
    endMonth: 
      type: string (ie: Apr) / optional
    endDay:
      type: string (number) / optional
  }
  time: 
    type: string / optional
  description: 
    type: string / optional
}
~~~
