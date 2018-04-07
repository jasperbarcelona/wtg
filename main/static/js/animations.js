$(document).ready(function(){

initialize_selected_entries();

$(window).load(function(){
  check_upload_progress();
  setTimeout(function() {
    $('#mainPreloader').fadeOut();
  }, 3000);
});

profile_options = 'closed'

$('#profile-options').hide();
$('.snackbar').hide();

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

$('#user-icon-container').on('click', function () {
    var $this = jQuery(this);
    if ($this.data('activated')) return false;  // Pending, return
    $this.data('activated', true);
    setTimeout(function() {
      $this.data('activated', false)
    }, 500); // Freeze for 500ms

    if ((typeof profile_options === 'undefined') || (profile_options == 'closed')){
        var travel_width = $('#profile-options').width();
        $('#user-icon-container').animate({'margin-right':travel_width+2});
        profile_options = 'open'
        setTimeout(function() {
            $('#profile-options').fadeIn();
        }, 500); // Freeze for 500ms
    }
    else{
        $('#profile-options').fadeOut();
        profile_options = 'closed'
        setTimeout(function() {
            $('#user-icon-container').animate({'margin-right':'0'});
        }, 500); // Freeze for 500ms
    }
});

$('#composeMessage').on('click', function (e) {
    $('#messageContainer').show();
    $('#messageContainer').removeClass('minimized');
    $('#messageBody').focus();
});

$('#minimizeMessage').on('click', function (e) {
    $('#messageContainer').addClass('minimized');
});

$('#closeMessage').on('click', function (e) {
    $('#messageContainer').hide();
    initialize_recipients();
});

(function() {
  $('.message-header div').on('click', function(e){
    if (e.target == this){
      $('#messageContainer').toggleClass('minimized');
    }
  });
})();

(function() {
  $('.contact-type-picker').on('click', function(e){
    $('.contact-type-picker').removeClass('selected');
    $(this).toggleClass('selected');
  });
})();

(function() {
  $('.profile-settings-btn').on('click', function(e){
    alert('This feature will be available on paid version.');
  });
})();

(function() {
  $('#closeCargoItemError').on('click', function(e){
    $('#cargoItemError').fadeOut();
  });
})();

(function() {
  $('#closeReplySuccess').on('click', function(e){
    $('#replySuccess').fadeOut();
  });
})();

$('#createGroupModal').on('shown.bs.modal', function () {
    $('#addGroupName').focus();
});

$('#forgotPaymentModal').on('shown.bs.modal', function () {
    $('#forgottenTenderedText').focus();
});

$('#addContactModal').on('shown.bs.modal', function () {
    $('#addContactName').focus();
});

$('#saveContactModal').on('hidden.bs.modal', function () {
  $('#saveContactModal .form-control').val('');
  $('#saveContactModal .form-control').change();
  $('#saveContactModal .contact-type-picker.selected').removeClass('selected');
  $('#saveContactModal .group-picker-save.selected').removeClass('selected');
  setTimeout(function() {
    $('#saveContactBtn').attr('disabled', true);
    }, 500);
});

$('#addWaybillItemModal').on('hidden.bs.modal', function () {
  $('#addWaybillItemModal .form-control').val('');
  $('#addWaybillItemModal .form-control').change();
  $('#addWaybillItemModal .error-icon-container').addClass('hidden');
  $('#addWaybillItemModal .form-control').css('border-bottom','1px solid #999');
});

$('#addWaybillItemModal .form-control').on('keyup', function () {
  name = $('#waybillItemName').val();
  quantity = $('#waybillItemQuantity').val();
  unit = $('#waybillItemUnit').val();
  price = $('#waybillItemPrice').val();
  if ((name != '') && (quantity != '') && (unit != '') && (price != '')) {
    $('#saveWaybillItemBtn').attr('disabled',false);
  }
  else {
    $('#saveWaybillItemBtn').attr('disabled',true);
  }
});

$('#addCargoItemWaybillNumber').on('keyup', function () {
  if ($(this).val() != '') {
    $('#addCargoWaybillBtn').attr('disabled',false);
  }
  else {
    $('#addCargoWaybillBtn').attr('disabled',true);
  }
});

$('#addWaybillItemEditModal').on('hidden.bs.modal', function () {
  $('#addWaybillItemEditModal .form-control').val('');
  $('#addWaybillItemEditModal .form-control').change();
});

$('#addWaybillModal').on('shown.bs.modal', function () {
  $('#addWaybillNumber').focus();
});

$('#addCargoItemModal').on('shown.bs.modal', function () {
  $('#addCargoItemWaybillNumber').focus();
});

$('#addWaybillItemModal').on('shown.bs.modal', function () {
  $('#waybillItemName').focus();
});

$('#addWaybillItemEditModal').on('shown.bs.modal', function () {
  $('#waybillItemNameEdit').focus();
});

$('#groupMembersModal').on('hidden.bs.modal', function () {
  $('#saveGroupEditBtn').attr('disabled', true);
});

$('#createGroupModal').on('hidden.bs.modal', function () {
  $('#addGroupName').val('');
  $('#addGroupName').change();
  $('#saveGroupBtn').attr('disabled', true);
});

$('#addContactModal').on('hidden.bs.modal', function () {
  $('#addContactModal .form-control').val('');
  $('#addContactModal .form-control').change();
  $('#addContactModal .contact-type-picker.selected').removeClass('selected');
  $('#addContactModal .group-picker-add.selected').removeClass('selected');
  setTimeout(function() {
    $('#addContactBtn').attr('disabled', true);
    }, 500);
});

svg = $('#loaderSVG').drawsvg({
  callback: function() {
    animate();
  }
});

function animate() {
  svg.drawsvg('animate');  
}

animate();

$('.search-inbound').keypress(function(e){
    if (e.which == 13) {
      search_inbound($(this).attr('id'));
    }
});

$('#addNumberRecipient').keyup(function(e){
  if (($(this).val() != '') && ($(this).val().length == 11) && (!isNaN($(this).val()))) {
    $('#addNumberRecipientBtn').attr('disabled',false);
  }
  else {
    $('#addNumberRecipientBtn').attr('disabled',true);
  }
});

$('#searchContactGroups').keypress(function(e){
    if (e.which == 13) {
      search_contact_groups();
    }
});

$('#searchRecipientName').keypress(function(e){
    if (e.which == 13) {
      search_contact_recipients();
    }
});

$('.blasts-check').on('click', function () {
  var entry_id = $(this).attr('data-id');
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).html('&#xE835;');
    deselect_blast(entry_id);
  }
  else {
    $(this).addClass('checked');
    $(this).html('&#xE834;');
    select_blast(entry_id);
  }
});

$('.reminders-check').on('click', function () {
  var entry_id = $(this).attr('data-id');
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).html('&#xE835;');
    deselect_reminder(entry_id);
  }
  else {
    $(this).addClass('checked');
    $(this).html('&#xE834;');
    select_reminder(entry_id);
  }
});

$('.contacts-check').on('click', function () {
  var entry_id = $(this).attr('data-id');
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).html('&#xE835;');
    deselect_contact(entry_id);
  }
  else {
    $(this).addClass('checked');
    $(this).html('&#xE834;');
    select_contact(entry_id);
  }
});

$('.groups-check').on('click', function () {
  var entry_id = $(this).attr('data-id');
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).html('&#xE835;');
    deselect_group(entry_id);
  }
  else {
    $(this).addClass('checked');
    $(this).html('&#xE834;');
    select_group(entry_id);
  }
});

$("#waybillTenderedText").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#waybillItemQuantity").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#waybillItemPrice").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#addWaybillRecipientMsisdn").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#addWaybillShipperMsisdn").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#addWaybillType").change(function (e) {
  if ($(this).val() == 'Charge') {
    $('#waybillTenderedText').val('');
    $('#waybillTenderedText').attr('disabled', true);
  }
  else {
    $('#waybillTenderedText').attr('disabled', false);
  }
});

$('#addWaybillModal .form-control').keyup(function(){
    date = $('#addWaybillDate').val();
    waybill_number = $('#addWaybillNumber').val();
    waybill_type = $('#addWaybillType').val();
    recipient = $('#addWaybillRecipient').val();
    recipient_msisdn = $('#addWaybillRecipientMsisdn').val();
    destination = $('#addWaybillDestination').val();
    recipient_address = $('#addWaybillAddress').val();
    sender = $('#addWaybillShipper').val();
    sender_msisdn = $('#addWaybillShipperMsisdn').val();
    tendered = $('#waybillTenderedText').val();

    if ((date != '') && (waybill_number != '') && (waybill_type != '') && (recipient != '') &&
       (recipient_msisdn != '') && (recipient_msisdn.length == 11) && (destination != '') &&
       (sender != '') && (sender_msisdn != '') && (sender_msisdn.length == 11)) {
      $('#saveWaybillBtn').attr('disabled',false);
    }
    else {
      $('#saveWaybillBtn').attr('disabled',true);
    }
});

$('#addWaybillModal .form-control').change(function(){
    date = $('#addWaybillDate').val();
    waybill_number = $('#addWaybillNumber').val();
    waybill_type = $('#addWaybillType').val();
    recipient = $('#addWaybillRecipient').val();
    recipient_msisdn = $('#addWaybillRecipientMsisdn').val();
    destination = $('#addWaybillDestination').val();
    recipient_address = $('#addWaybillAddress').val();
    sender = $('#addWaybillShipper').val();
    sender_msisdn = $('#addWaybillShipperMsisdn').val();
    tendered = $('#waybillTenderedText').val();

    if ((date != '') && (waybill_number != '') && (waybill_type != '') && (recipient != '') &&
       (recipient_msisdn != '') && (recipient_msisdn.length == 11) && (destination != '') &&
       (sender != '') && (sender_msisdn != '') && (sender_msisdn.length == 11)) {
      $('#saveWaybillBtn').attr('disabled',false);
    }
    else {
      $('#saveWaybillBtn').attr('disabled',true);
    }
});

$('#addCargoModal .form-control').keyup(function(){
    cargo_number = $('#addCargoNumber').val();
    truck = $('#addCargoTruck').val();
    driver = $('#addCargoDriver').val();
    crew = $('#addCargoCrew').val();
    origin = $('#addCargoOrigin').val();
    destination = $('#addCargoDestination').val();
    departure_date = $('#addCargoDepartureDate').val();
    departure_time = $('#addCargoDepartureTime').val();

    if ((cargo_number != '') && (truck != '') && (driver != '') && (crew != '') &&
       (origin != '') && (destination != '') &&
       (departure_date != '') && (departure_time != '')) {
      $('#saveCargoBtn').attr('disabled',false);
    }
    else {
      $('#saveCargoBtn').attr('disabled',true);
    }
});

$('#addCargoModal .form-control').change(function(){
    cargo_number = $('#addCargoNumber').val();
    truck = $('#addCargoTruck').val();
    driver = $('#addCargoDriver').val();
    crew = $('#addCargoCrew').val();
    origin = $('#addCargoOrigin').val();
    destination = $('#addCargoDestination').val();
    departure_date = $('#addCargoDepartureDate').val();
    departure_time = $('#addCargoDepartureTime').val();

    if ((cargo_number != '') && (truck != '') && (driver != '') && (crew != '') &&
       (origin != '') && (destination != '') &&
       (departure_date != '') && (departure_time != '')) {
      $('#saveCargoBtn').attr('disabled',false);
    }
    else {
      $('#saveCargoBtn').attr('disabled',true);
    }
});


});