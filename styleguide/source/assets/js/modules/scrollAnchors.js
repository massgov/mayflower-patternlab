export default function (window,document,$,undefined) {

  $(".js-scroll-anchors").each(function() {
    let $el = $(this),
        $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent(),
        elHeight,
        headerBuffer,
        windowSize,
        lowerLimit,
        upperLimit,
        debounceTimer,
        activeAnchor = 0,
        anchors = [];

    setVariables();

    // update variables one more time to catch any post page load changes
    window.setTimeout(function(){
      setVariables();
    },1000);

    $el.find('a').on('click',function(e) {
      e.preventDefault();
      // find the location of the desired link and scroll the page
      let hash = this.hash,  // TODO try with a span tag
          position = $(hash).offset().top;

      $("html, body").stop(true,true).animate({scrollTop:position}, '750');
      
      // remove active flag from other links
      $el.find('.is-active').removeClass('is-active');
      // add active flag to this link
      $(this).addClass('is-active');
      // close the menu
      $el.removeClass('is-open');
    });

    $el.find(".js-scroll-anchors-toggle").on('click',function() {
      $el.toggleClass('is-open');
    });

    // make the links sticky
    $(window).resize(function() {
      if(typeof debounceTimer === "number") {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(function(){
        setVariables();
        setPosition();
        activateLink();
      },300);
    });

    $(window).scroll(function () {
      setPosition();
      activateLink();
    });

    function setVariables() {
      elHeight = $el.outerHeight(true);
      windowSize = $(window).innerWidth();
      upperLimit = $elParent.offset().top;

      if(windowSize <= 780) {
        headerBuffer = $('.js-sticky-header').height() || 0;
        upperLimit -= headerBuffer;
      }

      lowerLimit = upperLimit + $elParent.outerHeight(true) - $el.height();

      anchors = [];

      $el.find('a').each(function(){
        let hash = this.hash,
            position = $(hash).offset().top;

        anchors[hash] = position;
      });
    }

    function setPosition() {
      let windowTop = $(window).scrollTop();
      
      if(windowSize <= 780) {
        $elParent.css({'paddingTop':elHeight});
      }

      if(typeof(upperLimit) !== "undefined" && windowTop <= upperLimit) {  //TODO
        $el.attr('data-sticky','top');
        $elParent.removeAttr('style');
      } 
      else if (windowTop < lowerLimit && windowTop > upperLimit) {
        $el.attr('data-sticky','middle');

      } 
      else if (windowTop >= lowerLimit) {
        $el.attr('data-sticky','bottom');
      }
    }

    function activateLink() {
      let windowTop = $(window).scrollTop();


    }

  });

}(window,document,jQuery);
