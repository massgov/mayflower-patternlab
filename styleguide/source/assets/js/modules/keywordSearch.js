export default function (window,document,$,undefined) {

  $('.js-keyword-search').each(function(){
    let $el = $(this),
      $form = $el.find('form'),
      $container = $el.parents('.ma__action-finder__container');

    $form.on('submit', function (e) {
      e.preventDefault();
      $container.addClass('is-dirty');
    });

    $form.on('reset', function () {
      $container.removeClass('is-dirty');
    });
  });

}(window,document,jQuery);
