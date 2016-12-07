---
title: Action Step
---
Description: Displays an icon, optional title and rich text elements in a grouping. 
## Status: ALPHA
### Notes:
It is necessary to use the rich text organism for rendering main copy for the step. The variable structure for the rich text organism has the potneital to be refactored.
### Contains
- [@organisms/by-author/rich-text](/?p=organisms-rich-text)
### Used in:
- [@organisms/by-author/action-steps](/?p=organisms-action-steps)
### Variables
~~~
actionStep: {
    icon:
        string/required
    title:
        string
    rteElements: [{
        path:
            string/required
        data: {
            object/required
        }
    }]
}
~~~
