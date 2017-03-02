export default function (window,document,$,undefined) {

  $('.js-ma-rich-text table').wrap( "<div class='ma__rich-text__table-wrapper'></div>" );

  // find all external links that need an icon
  $('.js-ma-rich-text a').each(function(){
    let $el = $(this);

    if($el.children().length !== 0) {
      return false;
    }

    // wrap the link in a span tag
    $el.wrap('<span class="ma__decorative-link"></span>');
    // append the SVG to the link
    $el.append('&nbsp;<svg aria-hidden="true" id="SvgjsSvg1000" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="18" viewBox="0 0 16 18"><defs id="SvgjsDefs1001"></defs><path id="SvgjsPath1007" d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)"></path></svg>');
  });

}(window,document,jQuery);