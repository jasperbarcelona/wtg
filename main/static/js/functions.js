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
  quantity = parseInt($('#'+element_id).val());
  quantity += 1;
  $('#'+element_id).val(quantity);
}

function subtract_quantity(element_id) {
  quantity = parseInt($('#'+element_id).val());
  if (quantity > 0){
    quantity -= 1;
  }
  $('#'+element_id).val(quantity);
}