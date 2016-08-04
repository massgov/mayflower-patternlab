export default function (window,document,$,undefined) {

  $('.js-util-nav').each(function() {
    let openClass = "is-open",
        closeClass = "is-closed",
        $parent = $(this),
        waitForIt = null;

    $parent.find('.js-util-nav-toggle a').on('click', function(e) {
      e.preventdefault;

      let open = $(this).hasClass(openClass),
        $content = $(this).next('.js-util-nav-content'),
        $openContent = $parent.find('.js-util-nav-content.' + openClass);

      // hide other content
      hide($openContent);
      
      if(open) { 
        return;
      }
      // add open class to this item
      $(this).addClass(openClass);
      // add open class to the correct content based on index
      $content.attr("aria-hidden","false");

      setTimeout(function(){
        $content
          .removeClass(closeClass)
          .addClass(openClass);
      }, .1);
    });

    $parent.find('.js-close-util-nav').on('click', function(e){
      e.preventDefault;

      hide( $(this).closest('.js-util-nav-content') );
    });

    function hide($content) {
      $parent.find("." + openClass).removeClass(openClass);
      $content
        .removeClass(openClass)
        .addClass(closeClass);

      if(waitForIt) {
        clearTimeout(waitForIt);
      }
      waitForIt = setTimeout(function(){
        $content.attr("aria-hidden","true");
      }, 1000);
    }

  });

}(window,document,jQuery);
