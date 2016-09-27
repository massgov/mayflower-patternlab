export default function (window,document,$,undefined) {

  $('form').each(function(){
    let $form = $(this),
        requiredFields = [];

    // find all required fields
    $('.js-is-required').each(function(){
      let $field = $(this),
          type = $field.data('type'),
          value = $field.val(),
          valid = validate(value,type);

      requiredFields.push({type,valid,$el:$field});

      $(this).data('index',requiredFields.length);
    });

    // if there aren't any required fields, don't do anything
    if(requiredFields.length === 0) {
      return;
    }

    $form.on('submit', function(e){
      let submitForm = true;

      // validate each required field
      requiredFields.forEach(function(item) {
        let value = item.$el.val();

        item.valid = validate(value,item.type);

        if(item.valid) {
          item.$el.attr('data-valid','is-valid');
        } else {
          submitForm = false;
          item.$el.attr('data-valid','is-invalid');
        }
      });

      if(!submitForm) {
        // prevent the form from submitting
        e.preventDefault();
        // show the form error message 
        // or blink the message if it is already visible
        $form.find('.js-error-msg')
          .removeClass('show-error');
        setTimeout(function() {
          $form.find('.js-error-msg')
            .addClass('show-error');
          },100);
      }
    });
  });

  function validate(value,type='text'){
    let valid = false;

    switch(type) {
      case 'email':
        valid = !!(value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i));
        break;
      default:
        valid = value.length !== 0;
    }

    return valid;
  }

}(window,document,jQuery);
