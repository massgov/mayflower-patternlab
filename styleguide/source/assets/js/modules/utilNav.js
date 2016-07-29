export default function (window,document,$,undefined) {

  $('.js-util-nav').each(function() {
    let openClass = "is-open",
        closeClass = "is-closed",
        $parent = $(this);

    $parent.find('.js-util-nav-toggle').on('click', function(e) {
      e.preventdefault;

      let index = $(this).index(),
          open = $(this).hasClass(openClass),
          $openContent = $parent.find('.js-util-nav-content.' + openClass);

      // hide other content
      hide($openContent);
      
      if(open) { 
        return;
      }
      // add open class to this item
      $(this).addClass(openClass);
      // add open class to the correct content based on index
      let $content = $parent.find('.js-util-nav-content').eq(index);

      $content
        .removeClass(closeClass)
        .addClass(openClass);
    });

    $parent.find('.js-close-util-nav').on('click', function(e){
      e.preventdefault;

      hide( $(this).closest('.js-util-nav-content') );
    });

    function hide($content) {
      $parent.find("." + openClass).removeClass(openClass);
      $content
        .removeClass(openClass)
        .addClass(closeClass);
    }

  });

}(window,document,jQuery);
