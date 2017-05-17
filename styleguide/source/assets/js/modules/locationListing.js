import sticky from "../helpers/sticky.js";
import getTemplate from "../helpers/getHandlebarTemplate.js";
import getSvgFromPath from "../helpers/getSvgFromPath.js"

export default function (window,document,$,undefined) {

  // Only run this code if we have a js object from location-listing.twig with location listing data.
  if (typeof locationListing === "undefined") {
    return;
  }

  let maxItems = locationListing.maxItems ? locationListing.maxItems : locationListing.imagePromos.items.length,
    masterListing = locationListing.imagePromos.items,
    masterListingMarkup = transformLocationListingPromos(masterListing),
    masterData = [];

  $('.js-location-listing').each(function(){
    let $el = $(this),
        $mapCol = $el.find('.js-location-listing-map'),
        $map = $el.find('.js-google-map');

    sticky.init($mapCol);

    // Set up click, hover handlers for location listing rows.
    $el.on('click', '.js-location-listing-link', function(e){
      let index = $(e.currentTarget).index();
      // trigger map to recenter on this item based on it's index.
      $map.trigger('recenter',index);
      // mark this link as active
      $el.find('.js-location-listing-link.is-active').removeClass('is-active');
      $(e.currentTarget).addClass('is-active'); // in case the event is triggered on a child element.
      // focus on the map - mainly for mobile when it is stacked
      let position = $map.offset().top;
      $("html,body").stop(true,true).animate({scrollTop:position}, '750');
    });
    $el.on('mouseenter', '.js-location-listing-link', function(e){
      // remove active state from previously selected list item
      $el.find('.js-location-listing-link.is-active').removeClass('is-active');

      let index = $(e.currentTarget).index();
      // trigger map to recenter on this item and make the marker bounce
      $map.trigger('bounce',index);
    });

    // Handle location listings form interaction (triggered by locationFilters.js).
    $el.on('ma:LocationListing:FormInteraction', function(e, data) {
        transformData(data);
    });

    // Handle active filter/tag button interactions (triggered by resultsHeading.js).
    $el.on('ma:LocationListing:ActiveTagInteraction', function(e, data) {
      transformData(data);
    });

    // Handle map update, marker sort event (triggered by googleMap.js).
    $el.on('ma:LocationListing:MarkersSorted', function(e, sortedData) {
      // Render our new sorted location listing.
      renderListingPage(sortedData);
    });

    // Populate master data structures.
    $el.on('ma:LocationListing:MapInitialized', function(e, markers) {
      masterData.resultsHeading = locationListing.resultsHeading;
      masterData.items = getMasterListingWithMarkupAndMarkers(masterListing, masterListingMarkup, markers);
      masterData.pagination = locationListing.pagination;
      $el.trigger('ma:LocationListing:ListingInitialized', [masterData]);
    });
  });

  // Create a master data source with listing information and markup.
  function getMasterListingWithMarkupAndMarkers(listing, markup, markers) {
    let items = [];
    markers.forEach(function (item, index) {
      items[index] = {
        marker: item,
        markup: markup[item._listingKey],
        promo: listing[item._listingKey]
      };
    });
    return items;
  }

  // Create new array with generated markup for location listing items, preserving original index.
  function transformLocationListingPromos(promos) {
    // Get template for location listing (organisms > imagePromo)
    let compiledTemplate = getTemplate('locationListingRow');
    let listingMarkup = [];
    promos.map(function (data, index) {
      let promoData = promoTransform(data);
      listingMarkup[index] = compiledTemplate(promoData);
    });
    return listingMarkup;
  }

  function transformData(data) {
    console.log('transformData: ', data);
    let filters = data.resultsHeading.tags;
    if (!filters.length) {
      // No filters, sort masterData alphabetically.
      let sortedData = sortDataAlphabetically(data);
      $('.js-location-listing').trigger('ma:LocationListing:UpdateMarkers', [sortedData]);
      renderListingPage(sortedData);
    }
    else {
      // Determine which filter / sort values are present.
      let hasPlace = hasFilter(filters, 'location'),
        hasTags = hasFilter(filters, 'tag'),
        filteredData = [];

      // If tag filter is present, filter the master list based on current tag values.
      if (hasTags) {
        // Get just the tag values from the filters array.
        let tags = getFilterValues(filters, 'tag');
        filteredData = filterDataByTags(tags, data);
      }

      // If place (zip/city/address field) value is present, sort (filtered) master list based on the value.
      if (hasPlace) {
        // Get just the place value from the filters array.
        let place = getFilterValues(filters, 'location'),
          placeData = hasTags ? filteredData : makeAllActive(data);
        $('.js-location-listing').trigger('ma:LocationListing:UpdateMarkers', [placeData, place]);
      }
      else {
        let sortedData = sortDataAlphabetically(filteredData);
        $('.js-location-listing').trigger('ma:LocationListing:UpdateMarkers', [sortedData]);
        renderListingPage(sortedData);
      }
    }
  }

  function hasFilter(filters, type) {
    return filters.some(function (filter) {
      return hasValue(filter, 'type', type);
    });
  }

  function hasValue(obj, key, value) {
        return obj.hasOwnProperty(key) && obj[key] === value;
      }

  function getFilterValues(array, filter) {
    return array.filter(function(data) {
      return data.type === filter;
    }).map(function(data) {
      return data.value;
    })
  }

  // Do any necessary data transformation to make imagePromo data fit locationListingRow template.
  function promoTransform(data) {
    let tagsData = {
      tagsFormatted: data.tags.map(transformTag)
    };
    return Object.assign({},data,tagsData);
  }

  // Transform tag template, get svg code from twig template path.
  function transformTag(tag) {
    return {
      label: tag.label,
      svg: getSvgFromPath(tag.icon)
    };
  }

  // Reorder listingMarkup array, based on the order of the map markers.
  function sortDataAlphabetically(data) {
    let items = data.items.sort(function(a, b) {
      let nameA = a.promo.title.text.toUpperCase(),
        nameB = b.promo.title.text.toUpperCase();
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    });

    data.items = items;
    return data;
  }

  function makeAllActive(data) {
    data.items = data.items.map(function(item){
      item.isActive = true;
      return item;
    });
    return data;
  }

  // Filter listings by tags.
  function filterDataByTags(tags, data){
    // renderListingPage(currentListing.slice(0, maxItems));
    data.items = data.items.map(function(item) {
      item.isActive = doesPromoContainTags(item.promo.tags, tags);
      return item;
    });

    return data;
  }

  // @todo abstract this to be useful elsewhere
  function doesPromoContainTags(haystack, needle) {
    return needle.every(function(v) {
      return Boolean(haystack.filter(function(item){
        return Object.values(item).indexOf(v) !== -1;
      }).length);
    });
  }

  // Remove the imagePromos children content on the current location listing page.
  function clearListingPage() {
    $('.js-location-listing-results').find('.ma__image-promos').html('');
  }

  // Render new imagePromo items.
  function renderListingPage(data) {
    clearListingPage();
    let $el = $('.js-location-listing-results').find('.ma__image-promos');

    // Create an array of shown items.
    data.resultsHeading.shownItems = [];

    data.items.slice(0, maxItems).map(function(item, index){
      if (item.isActive) {
        data.resultsHeading.shownItems.push(index);
        $el.append(item.markup);
      }
    });
    sticky.init($('.js-location-listing-map'));

    $('.js-location-listing').trigger('ma:LocationListing:ListingsUpdated', [data]);
  }

}(window,document,jQuery);
