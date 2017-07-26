### Description
This Displays a styled table used in a Rich Text Editor

### Status
* Stable as of 5.0.0

### Variables
~~~
table {
  head {
    rows [{
      rowSpanOffset:
        type: boolean
      cells [{
        heading:
          type: boolean
        colspan:
          type: string (number) / optional
        rowspan:
          type: string (number) / optional
        text:
          type: string / required
      }]
    }]
  }
  bodies [{
    rows [{
      rowSpanOffset:
        type: boolean
      cells [
        heading:
          type: string ("true" || "false") / required
        colspan:
          type: string (number) / optional
        rowspan:
          type: string (number) / optional
        text:
          type: string / required
      }]
    }]
  }]
}
~~~
