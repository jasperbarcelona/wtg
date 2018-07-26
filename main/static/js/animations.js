$(document).ready(function(){
  
$(window).load(function(){
  initialize_page();
});

$('.snackbar').hide();
$('#modalLoader').hide();
$('#contentLoader').hide();

$('.form-control.floatlabel').floatlabel({
    labelEndTop:'-2px'
});

$(".datepicker").datepicker({
    dateFormat: "MM dd, yy"
});

$('.clockpicker').clockpicker({
    twelvehour: true,
    donetext: 'Done',
    autoclose: false
});

$('.tooltip').tooltipster({
   animation: 'grow',
   delay: 200,
   theme: 'tooltipster-shadow',
   trigger: 'hover'
});

$('.active-entry-right').on('click', function () {
  $('.active-entry-action-container').removeClass('visible');
  $(this).find('.active-entry-action-container').addClass('visible');
});

$('.close-action-icon').on('click', function (e) {
  e.stopPropagation();
  button_id = $(this).attr('data-button-id');
  $('#'+button_id).button('complete');
  $('.active-entry-action-container').removeClass('visible');
});

$('.fixed-action-btn').floatingActionButton();

$('.service-quantity-text').on('keyup', function () {
  quantity = $(this).val();
  if (quantity == '') {
    quantity = 0;
    $(this).val(quantity);
    $(this).select();
  }
  get_current_total();
});

$('#addTransactionModal .form-control').on('keyup', function () {
  customer_name = $('#addTransactionName').val();
  customer_msisdn = $('#addTransactionMsisdn').val();
  total = $('#transactionTotal').html();

  if ((customer_name != '') && (customer_msisdn != '') && (customer_msisdn.length == 11) && (total != 'PHP 0.00')) {
    $('#saveTransactionBtn').attr('disabled', false);
  }
  else {
    $('#saveTransactionBtn').attr('disabled', true);
  }
});

$('#addTransactionModal .form-control').on('change', function () {
  customer_name = $('#addTransactionName').val();
  customer_msisdn = $('#addTransactionMsisdn').val();
  total = $('#transactionTotal').html();

  if ((customer_name != '') && (customer_msisdn != '') && (customer_msisdn.length == 11) && (total != 'PHP 0.00')) {
    $('#saveTransactionBtn').attr('disabled', false);
  }
  else {
    $('#saveTransactionBtn').attr('disabled', true);
  }
});

$('#addTransactionModal').on('hidden.bs.modal', function () {
  $('#addTransactionModal .error-icon-container').addClass('hidden');
  $('#addTransactionName').val('');
  $('#addTransactionMsisdn').val('');
  $('#addTransactionModal .service-quantity-text').val('0');
  $('#addTransactionModal .form-control').change();
  $('#addTransactionName').css('border','1px solid #ccc');
  $('#addTransactionMsisdn').css('border','1px solid #ccc');
  $('#saveTransactionBtn').button('complete');
  $('#transactionTotal').html('PHP 0.00');
  setTimeout(function() {
    $('#saveTransactionBtn').attr('disabled', true);
  }, 500);
});

$('#transactionInfoModal').on('hidden.bs.modal', function () {
  $('#modalLoader').hide();
});

$('#addTransactionModal').on('shown.bs.modal', function () {
  $('#addTransactionName').focus();
});

$('.typeahead').on('typeahead:selected', function(evt, item) {
  
});

});