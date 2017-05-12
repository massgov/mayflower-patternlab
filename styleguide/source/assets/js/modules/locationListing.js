import sticky from "../helpers/sticky.js";
import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  $('.js-location-listing').each(function(){
    let $el = $(this),
        $mapCol = $el.find('.js-location-listing-map'),
        $map = $el.find('.js-google-map');

    sticky.init($mapCol);

    // find the location link
    $el.find('.js-location-listing-link').each(function(index) {
      let $link = $(this);

      // when link is clicked 
      $link.on('click', function(){
        // trigger map to recenter on this item based on it's index.
        $map.trigger('recenter',index);
        // mark this link as active
        $el.find('.js-location-listing-link.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        // focus on the map - mainly for mobile when it is stacked
        let position = $map.offset().top;
        $("html,body").stop(true,true).animate({scrollTop:position}, '750');
      });

      // when link is hovered
      $link.on('mouseenter', function(){
        // trigger map to recenter on this item and make the marker bounce
        $map.trigger('bounce',index);
      });
    });

  });

  // Ensure that locationListing variable was written successfully in location-listing twig template.
  if (typeof locationListing !== "undefined") {
    let listingMarkup = transformLocationListingPromos(locationListing.imagePromos.items);
  }

  // Create new array with generated markup for location listing items, preserving original index.
  function transformLocationListingPromos(promos) {
    // Get template for location listing (organisms > imagePromo)
    let compiledTemplate = getTemplate('locationListingRow');
    let listingMarkup = [];
    promos.map(function (data, index) {
      let infoData = infoTransform(data);
      listingMarkup[index] = compiledTemplate(infoData);
    });
    return listingMarkup;
  }

  function infoTransform(data) {
    let infoData = {
      tagsFormatted: data.tags.map(transformTag)
    };
    return Object.assign({},data,infoData);
  }

  function transformTag(tag) {
    return {
      label: tag.label,
      svg: getSvgMarkup(tag.icon)
    };
  }

  function getSvgMarkup(path) {
    let svgs = {
      "@atoms/05-icons/svg-wheelchair.twig" : '<svg aria-hidden="true" id="SvgjsSvg1011" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="31" height="40" viewBox="0 0 31 40"><defs id="SvgjsDefs1012"></defs><path id="SvgjsPath1013" d="M1311.33 360.136C1310.86 359.644 1310.1899999999998 359.38500000000005 1309.51 359.422L1301.29 359.88300000000004L1305.81 354.69000000000005C1306.46 353.95000000000005 1306.6399999999999 352.96400000000006 1306.3899999999999 352.083C1306.2599999999998 351.47900000000004 1305.8999999999999 350.92900000000003 1305.34 350.57800000000003C1305.32 350.56600000000003 1294.53 344.244 1294.53 344.244C1293.6499999999999 343.728 1292.53 343.84200000000004 1291.77 344.526L1286.5 349.26800000000003C1285.53 350.141 1285.44 351.64300000000003 1286.31 352.62300000000005C1287.1799999999998 353.60200000000003 1288.6699999999998 353.68800000000005 1289.6399999999999 352.814L1293.6399999999999 349.219L1296.9399999999998 351.154L1291.11 357.852C1288.6899999999998 358.25 1286.51 359.37399999999997 1284.8 360.99399999999997L1287.85 364.065C1289.23 362.803 1291.05 362.032 1293.06 362.032C1297.33 362.032 1300.81 365.53799999999995 1300.81 369.846C1300.81 371.866 1300.05 373.71 1298.8 375.098L1301.84 378.16900000000004C1303.87 375.994 1305.12 373.06800000000004 1305.12 369.84600000000006C1305.12 367.9270000000001 1304.6799999999998 366.1120000000001 1303.8899999999999 364.49800000000005L1307.07 364.3190000000001L1306.3 373.8900000000001C1306.19 375.1980000000001 1307.1599999999999 376.3450000000001 1308.46 376.4520000000001C1308.52 376.4570000000001 1308.5900000000001 376.4590000000001 1308.65 376.4590000000001C1309.8700000000001 376.4590000000001 1310.9 375.51800000000014 1311 374.2760000000001L1311.99 361.9880000000001C1312.05 361.3030000000001 1311.81 360.6280000000001 1311.33 360.13600000000014ZM1306.96 349.956C1309.14 349.956 1310.91 348.175 1310.91 345.978C1310.91 343.781 1309.14 342 1306.96 342C1304.78 342 1303.02 343.781 1303.02 345.978C1303.02 348.175 1304.78 349.956 1306.96 349.956ZM1293.06 377.66C1288.78 377.66 1285.31 374.15500000000003 1285.31 369.846C1285.31 368.223 1285.8 366.713 1286.6399999999999 365.462L1283.56 362.358C1281.96 364.422 1281 367.021 1281 369.846C1281 376.559 1286.4 382 1293.06 382C1295.86 382 1298.44 381.033 1300.49 379.415L1297.41 376.31100000000004C1296.17 377.16200000000003 1294.67 377.66 1293.0600000000002 377.66Z " fill-opacity="1" transform="matrix(1,0,0,1,-1281,-342)"></path></svg>',
      "@atoms/05-icons/svg-open-now.twig" : '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="61" height="62" viewBox="0 0 61 62"><path d="M34.67 30.68a2.08 2.08 0 0 0-2.83.84l-3.58 6.64-1.7-.92a2.08 2.08 0 0 0-2.83.84 2.12 2.12 0 0 0 .83 2.86l1.7.92 1.87 1.02c1.01.54 2.28.18 2.83-.86l1-1.86 3.57-6.64a2.1 2.1 0 0 0-.86-2.84zM57.75 47.2L12.3 60.9a3.17 3.17 0 0 1-3.94-2.16l-8.2-27.6a3.2 3.2 0 0 1 2.12-3.98l11.16-3.36 2.53-10.76a8.68 8.68 0 0 0 4.22 1.5l-1.85 7.76 13.29-4-5.77-5.5a8.48 8.48 0 0 0 2.71-3.58l8 7.6 11.16-3.36c1.68-.5 3.45.46 3.95 2.14l8.19 27.62a3.22 3.22 0 0 1-2.13 3.98zM19.33 1.18a5.11 5.11 0 0 0-.95 9.36c1.8.98 4 .76 5.59-.54a5.11 5.11 0 0 0 1.65-5.4 5.05 5.05 0 0 0-6.29-3.42z"/></svg>'
    };
    return svgs[path];
  }

}(window,document,jQuery);
