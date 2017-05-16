---
title: Event Filters
---

Description: Form with inputs used on Event listing page

## State: Alpha

### Notes

### Used in:


### contains:
- [@atoms/03-forms/input-text](?p=atoms-input-text)
- [@molecules/date-range](?p=molecules-date-range)


### Required Variables
~~~
{
  eventFilters: {
    zipcode: {    
      type: object/inputText/required
    },
    
    dateRange: {
      type: object/dateRange/required
    },

    submitButton:
      type: string/required   
  }

}
~~~

