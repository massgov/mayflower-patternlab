export default function (window,document,$,undefined) {

  $('textarea[maxlength]').each(function(){
    const $el = $(this);
    const maxlength = $el.attr('maxlength');

    let remaining = maxlength - $el.val().length;
    let message = `${remaining}/${maxlength}`;

    $el.wrap('<div class="ma__textarea__wrapper"></div>');

    $el.parent().attr('data-char-left',message);

    $el.on('keyup mouseup', function(){
      remaining = maxlength - $el.val().length;
      message = `${remaining}/${maxlength}`;
      $el.parent().attr('data-char-left',message);
    });

  });


}(window,document,jQuery);
