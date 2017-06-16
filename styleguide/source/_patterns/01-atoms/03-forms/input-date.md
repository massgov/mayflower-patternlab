---
title: Input Date
---
Description: An `<input> [type='date']`  element with its corresponding `<label>` element.

## State: ALPHA

### Notes:
- restrict controls whether the user can pick any date (''), today and prior ('max') or today and future ('min')

### Used In:


### Variables:
~~~
  inputDate: {
    labelText:
      type: string\required,
    required: 
      type: boolean,
    id: 
      type: string\unique\required
    name: 
      type: string\required
    placeholder:
      type: string
    restrict:
      type: string ('','max','min')
  }
~~~
