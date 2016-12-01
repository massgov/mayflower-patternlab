export default function (window,document,$,undefined) {

  $(".js-scroll-anchors").each(function() {
    let $el = $(this),
        $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent(),
        elHeight,
        headerBuffer = 0,
        windowSize,
        lowerLimit,
        upperLimit,
        debounceTimer,
        activeClass = "is-active",
        activeAnchor = 0,
        anchors = [],
        numAnchors = 0,
        isMobile = false,
        linkScrolling = false;

    setVariables();

    // default assumption as to where the screen will load
    $el.attr('data-sticky','top');

    // update variables one more time to catch any post page load changes
    window.setTimeout(function(){
      setVariables();
    },1000);

    $el.find('a').on('click',function(e) {
      e.preventDefault();

      // is the menu closed on mobile
      if(!$el.hasClass('is-open') && isMobile) {     
        // just show the menu
        $el.addClass('is-open');
        return;
      }
       
      // find the location of the desired link and scroll the page
      let position = anchors[$(this).data('index')].position;
      // close the menu
      $el.removeClass('is-open');
      // remove active flag from other links
      $el.find('.' + activeClass).removeClass(activeClass);
      // mark this link as active
      $(this).addClass(activeClass);
      activeAnchor = $(this).data('index');
      // prevent the scroll event from updating active links
      linkScrolling = true;

      $("html,body").stop(true,true).animate({scrollTop:position}, '750', function(){
        linkScrolling = false;
      });
      
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
      let topOffset = 0;

      headerBuffer = 0;
      elHeight = $el.height();
      windowSize = $(window).innerWidth();
      upperLimit = $elParent.offset().top;
      isMobile = checkMobile($el);

      if($elParent[0].hasAttribute("style") && !isMobile) {
        $elParent.removeAttr('style');
      }
 
      if(isMobile) {
        headerBuffer = $('.js-sticky-header').height() || 0;
        upperLimit -= headerBuffer;
        topOffset = elHeight;
      }

      lowerLimit = upperLimit + $elParent.outerHeight(true) - $el.height();

      // locate the position of all of the anchor targets
      anchors = new Array;
      $el.find('a').each(function(i,e){
        let hash = this.hash,
            position = $(hash).offset() ? $(hash).offset().top - headerBuffer - topOffset : upperLimit;

        anchors[i] = { hash, position };

        $(this).data('index',i);
      });

      // record the number of anchors for performance
      numAnchors = anchors.length;
    }

    function setPosition() {
      let windowTop = $(window).scrollTop(),
          attr = $el.attr('data-sticky'),
          top = attr !== 'top' && windowTop <= upperLimit, 
          middle = attr !== 'middle' && windowTop < lowerLimit && windowTop > upperLimit,
          bottom = attr !== 'bottom' && windowTop >= lowerLimit;
      
      if($elParent[0].hasAttribute("style") && !isMobile) {
        $elParent.removeAttr('style');
      }

      if(!$elParent[0].hasAttribute("style") && isMobile && attr === 'middle') {
        $elParent.css({'paddingTop':elHeight});
      }

      if(top) {
        $el.attr('data-sticky','top');

        if(isMobile){
          $elParent.removeAttr('style');
        }
      } 
      else if (middle) {
        $el.attr('data-sticky','middle');

        if(isMobile){
          $elParent.css({'paddingTop':elHeight});
        }
      } 
      else if (bottom) {
        $el.attr('data-sticky','bottom');

        if(isMobile){
          $elParent.removeAttr('style');
        }
      }
    }

    function activateLink() {
      // do we have more than one anchor
      if(numAnchors < 2 || linkScrolling) {
        return;
      }

      // get the current scroll position and offset by half the view port
      let windowTop = $(window).scrollTop() + (window.innerHeight/2),
          currentAnchor = activeAnchor;
      
      // is there a prev target
      // and 
      // is the current scroll position above the current target
      if(currentAnchor > 0 && windowTop < anchors[activeAnchor].position) { 
        // make the prev link active
        --activeAnchor;
      }

      // is there a next target
      // and
      // is the current scroll position below the next target
      else if(currentAnchor < numAnchors-1 && windowTop > anchors[activeAnchor+1].position) { 
        // make the next link active
        ++activeAnchor;
      }

      if (currentAnchor !== activeAnchor) {
        // move the active flag
        $el.find('.' + activeClass).removeClass(activeClass);
        $el.find('a').eq(activeAnchor).addClass(activeClass);
      }
    }

  });

  function checkMobile($el) {
    let value = "true";
    try {
      value = window.getComputedStyle($el[0], ':before').getPropertyValue('content').replace(/\"/g, '');
    } catch(err) {}
    return value === "false" ? false : true;
  };

}(window,document,jQuery);
