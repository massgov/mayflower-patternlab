---
title: Divided inputs
---
Description: a collection of inputs separated by a custom divider

## State: Alpha

### Contains


### Used in:


### Variables

~~~
dividedInputs: {
  title: 
    type: string/optional
  required: 
    type: boolean,
  divider: 
    type: string/optional,
  inputs: [{
    path: 
      type: string/required
    data: {
      type: object/required (matches the pattern in the path)
    }
  }]
}
~~~

