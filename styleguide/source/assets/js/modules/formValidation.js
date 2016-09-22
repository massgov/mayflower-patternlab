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
          item.$el.attr('data-valid','is-invalid');
        } else {
          submitForm = false;
          item.$el.attr('data-valid','is-valid');
        }

      });

      if(!submitForm) {
        e.preventDefault();
      }

    });
  });

  function validate(value,type='text'){
    switch(type) {
      case 'email':
// TODO - fill this in
      default:
        return value.length !== 0;
    }
    return false;
  }

}(window,document,jQuery);
