export default function (window,document,$,undefined) {

  $(".js-scroll-anchors").each(function() {
    let $el = $(this),
        $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent(),
        elHeight,
        headerBuffer,
        windowSize,
        lowerLimit,
        upperLimit,
        debounceTimer;

    setVariables();

    // update variables one more time to catch any post page load changes
    window.setTimeout(function(){
      setVariables();
    },1000);

    $el.find('a').on('click',function(e) {
      e.preventDefault();
      // find the location of the desired link and scroll the page
      let href = $(this).attr('href'),
          anchorName = href.substring(1, href.length),
          position = $('a[name=' + anchorName + ']').offset();

      $("html, body").stop(true,true).animate({scrollTop:position.top}, '750');
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
      },300);
    });

    $(window).scroll(function () {
      setPosition();
    });

    function setVariables() {
      elHeight = $el.outerHeight(true);
      windowSize = $(window).innerWidth();
      upperLimit = $elParent.offset().top;

console.log('elHeight',elHeight);
console.log('$elParent.outerHeight(true)',$elParent.outerHeight(true));
console.log($('.post-content').offset().top);

      if(windowSize <= 780) {
        headerBuffer = $('.js-sticky-header').height() || 0;
        upperLimit -= headerBuffer;
console.log('headerBuffer',headerBuffer);
      }

      lowerLimit = upperLimit + $elParent.outerHeight(true) - $el.height();
    }

    function setPosition() {
      var windowTop = $(window).scrollTop();
console.log('windowTop',windowTop);
console.log('lowerLimit',lowerLimit);
      
      if(windowSize <= 780) {
        $elParent.css({'paddingTop':elHeight});
      }

      if(typeof(upperLimit) !== "undefined" && windowTop <= upperLimit) {
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

  });

}(window,document,jQuery);
