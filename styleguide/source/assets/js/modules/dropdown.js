// ****** basic custom select that uses mobile select keyboard ******
let dropdownMenu = document.querySelectorAll(".js-dropdown");

if(null !== dropdownMenu){

  let length = dropdownMenu.length;

  for (let i = 0; i < length; i++ ) {
    let parent = dropdownMenu[i],
        select = parent.querySelector(".js-dropdown-select"),
        link = parent.querySelector(".js-dropdown-link")

    if(null === select || null === link) {
      break;
    }

    select.onchange = function() {
      let elem = (typeof this.selectedIndex === "undefined" ? window.event.srcElement : this);
      link.innerText = elem.text || elem.options[elem.selectedIndex].text;
    }
  }
}
