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
        activeClass = "is-active",
        activeAnchor = 0,
        anchors = [],
        numAnchors = 0,
        linkScrolling = false;

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

      // prevent the scroll event for updating active links
      linkScrolling = true;
      activeAnchor = $(this).index() - 1;

      $("html, body").stop(true,true).animate({scrollTop:position}, '750', function(){
        linkScrolling = false;
      });
      
      // remove active flag from other links
      $el.find('.' + activeClass).removeClass(activeClass);
      // add active flag to this link
      $(this).addClass(activeClass);
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
      activateLink();
      setPosition();
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

      // locate the position of all of the anchor targets
      anchors = new Array;
      $el.find('a').each(function(i,e){
        let hash = this.hash,
            position = $(hash).offset().top;

        anchors[i] = { hash, position };
      });

      // record the number of anchors for performance
      numAnchors = anchors.length;
    }

    function setPosition() {
      let windowTop = $(window).scrollTop();
      
      if(windowSize <= 780) {
        $elParent.css({'paddingTop':elHeight});
      }

      if(windowTop <= upperLimit) {
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
      // do we have more than one anchor
      if(numAnchors < 2 || linkScrolling){
        return;
      }

      // get the current scroll position and offset by half the view port
      let windowTop = $(window).scrollTop() + (window.innerHeight/3);
      // is there a prev target
      // and 
      // is the current scroll position above the prev target
      if(activeAnchor > 0 && windowTop < anchors[activeAnchor-1].position) { 
        // make the prev link active
        --activeAnchor;
      }

      // is there a next target
      // and
      // is the current scroll position below the next target
      if(activeAnchor < numAnchors-1 && windowTop > anchors[activeAnchor+1].position) { 
        // make the next link active
        ++activeAnchor;
      }

      // move the active flag
      $el.find('.' + activeClass).removeClass(activeClass);
      $el.find('a').eq(activeAnchor).addClass(activeClass);
    }

  });

}(window,document,jQuery);
