function show_active(slice_from) {
  $('.nav-item').removeClass('active');
  $('#navActive').addClass('active');
  $('.nav-border').css('margin-left', '0');
  /*$.get('/history',
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearInboundSearch').addClass('hidden');
    });*/
}

function show_history(slice_from) {
  $('.nav-item').removeClass('active');
  $('#navHistory').addClass('active');
  $('.nav-border').css('margin-left', '33.33%');
  /*$.get('/history',
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearInboundSearch').addClass('hidden');
    });*/
}

function show_settings(slice_from) {
  $('.nav-item').removeClass('active');
  $('#navSettings').addClass('active');
  $('.nav-border').css('margin-left', '66.66%');
  /*$.get('/history',
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearInboundSearch').addClass('hidden');
    });*/
}

function validate_blank(element,value) {
  error_icon_id = $(element).attr('data-error')
  if (value == '') {
    $(element).css("border", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
  else {
    $(element).css("border", "1px solid #ccc");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
}

function validate_msisdn(element,value) {
  if ((value != '') && (value.length == 11)) {
    $(element).css("border-bottom", "1px solid #ccc");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border-bottom", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
}

function add_quantity(element_id) {
  quantity = parseFloat($('#'+element_id).val());
  quantity += 1;
  if (quantity % 1 != 0){
    $('#'+element_id).val(quantity.toFixed(1));
  }
  else{
    $('#'+element_id).val(quantity.toFixed(0));
  }
  get_current_total();
}

function subtract_quantity(element_id) {
  quantity = parseFloat($('#'+element_id).val());
  if (quantity >= 1){
    quantity -= 1;
  }
  else {
    quantity = 0;
  }
  if (quantity % 1 != 0){
    $('#'+element_id).val(quantity.toFixed(1));
  }
  else{
    $('#'+element_id).val(quantity.toFixed(0));
  }
  get_current_total();
}

function get_current_total() {
  var total = 0
  $('.service').each(function() {
    price = parseFloat($(this).find('.service-price').html().substring(4));
    quantity = parseFloat($(this).find('.service-quantity-text').val());

    product = price * quantity
    total = parseFloat(total) + product;
  });
  $('#transactionTotal').html('PHP ' + total.toFixed(2));
}