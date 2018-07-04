/* NAVIGATION */

function show_inbound(slice_from) {
  $('.panel-nav-item').removeClass('active');
  $('#navInbound').addClass('active');
  $.get('/inbound',
  {
    slice_from:slice_from
  },
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearInboundSearch').addClass('hidden');
    });
}

function show_cargo(slice_from) {
  $('.panel-nav-item').removeClass('active');
  $('#navCargo').addClass('active');
  $.get('/cargos',
  {
    slice_from:slice_from
  },
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearCargoSearch').addClass('hidden');
    });
}

function show_history(slice_from) {
  $('.panel-nav-item').removeClass('active');
  $('#navHistory').addClass('active');
  $.get('/history',
  {
    slice_from:slice_from
  },
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearHistorySearch').addClass('hidden');
    });
}

function show_reports(slice_from) {
  $('.panel-nav-item').removeClass('active');
  $('#navReport').addClass('active');
  $.get('/reports',
  {
    slice_from:slice_from
  },
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearReportSearch').addClass('hidden');
    });
}

function show_payment_reminders(slice_from) {
  $('.panel-nav-item').removeClass('active');
  $('#navReminders').addClass('active');
  $.get('/reminders',
  {
    slice_from:slice_from
  },
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearInboundSearch').addClass('hidden');
    });
}

function show_contacts(slice_from) {
  $('.panel-nav-item').removeClass('active');
  $('#navContacts').addClass('active');
  $.get('/contacts',
  {
    slice_from:slice_from
  },
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearInboundSearch').addClass('hidden');
    });
}

function show_groups(slice_from) {
  $('.panel-nav-item').removeClass('active');
  $('#navGroups').addClass('active');
  $.get('/groups',
  {
    slice_from:slice_from
  },
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearInboundSearch').addClass('hidden');
    });
}

function show_users(slice_from) {
  $('.panel-nav-item').removeClass('active');
  $('#navUsers').addClass('active');
  $.get('/users',
  {
    slice_from:slice_from
  },
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#clearInboundSearch').addClass('hidden');
    });
}

function show_usage(slice_from) {
  alert('This feature will be available on paid version.');
}

function user_profile() {
  alert('This feature will be available on paid version.');
}

/* END OF NAVIGATION */

/* START OF PAGINATION */

function inbound_next_page() {
  $.post('/inbound/next',
    function(data){
      $('#inboundTbody').html(data['template']);
      $('#paginationShowingConversation').html(data['showing']);
      $('#paginationTotalConversation').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.conversation').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.conversation').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.conversation').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.conversation').attr('disabled', false);
      }
    });
}

function inbound_prev_page() {
  $.post('/inbound/prev',
    function(data){
      $('#inboundTbody').html(data['template']);
      $('#paginationShowingConversation').html(data['showing']);
      $('#paginationTotalConversation').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.conversation').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.conversation').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.conversation').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.conversation').attr('disabled', false);
      }
    });
}

function blast_next_page() {
  $.post('/blasts/next',
    function(data){
      $('#blastsTbody').html(data['template']);
      $('#paginationShowingBlasts').html(data['showing']);
      $('#paginationTotalBlasts').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.blast').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.blast').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.blast').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.blast').attr('disabled', false);
      }
    });
}

function blast_prev_page() {
  $.post('/blasts/prev',
    function(data){
      $('#blastsTbody').html(data['template']);
      $('#paginationShowingBlasts').html(data['showing']);
      $('#paginationTotalBlasts').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.blast').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.blast').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.blast').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.blast').attr('disabled', false);
      }
    });
}

function reminder_next_page() {
  $.post('/reminders/next',
    function(data){
      $('#remindersTbody').html(data['template']);
      $('#paginationShowingReminders').html(data['showing']);
      $('#paginationTotalReminders').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.reminder').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.reminder').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.reminder').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.reminder').attr('disabled', false);
      }
    });
}

function reminder_prev_page() {
  $.post('/reminders/prev',
    function(data){
      $('#remindersTbody').html(data['template']);
      $('#paginationShowingReminders').html(data['showing']);
      $('#paginationTotalReminders').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.reminder').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.reminder').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.reminder').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.reminder').attr('disabled', false);
      }
    });
}

function contact_next_page() {
  $.post('/contacts/next',
    function(data){
      $('#contactsTbody').html(data['template']);
      $('#paginationShowingContacts').html(data['showing']);
      $('#paginationTotalContacts').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.contact').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.contact').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.contact').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.contact').attr('disabled', false);
      }
    });
}

function contact_prev_page() {
  $.post('/contacts/prev',
    function(data){
      $('#contactsTbody').html(data['template']);
      $('#paginationShowingContacts').html(data['showing']);
      $('#paginationTotalContacts').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.contact').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.contact').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.contact').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.contact').attr('disabled', false);
      }
    });
}

function group_next_page() {
  $.post('/groups/next',
    function(data){
      $('#groupsTbody').html(data['template']);
      $('#paginationShowingGroups').html(data['showing']);
      $('#paginationTotalGroups').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.group').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.group').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.group').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.group').attr('disabled', false);
      }
    });
}

function group_prev_page() {
  $.post('/groups/prev',
    function(data){
      $('#groupsTbody').html(data['template']);
      $('#paginationShowingGroups').html(data['showing']);
      $('#paginationTotalGroups').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.group').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.group').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.group').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.group').attr('disabled', false);
      }
    });
}

function user_next_page() {
  $.post('/users/next',
    function(data){
      $('#usersTbody').html(data['template']);
      $('#paginationShowingUsers').html(data['showing']);
      $('#paginationTotalUsers').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.user').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.user').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.user').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.user').attr('disabled', false);
      }
    });
}

function user_prev_page() {
  $.post('/users/prev',
    function(data){
      $('#usersTbody').html(data['template']);
      $('#paginationShowingUsers').html(data['showing']);
      $('#paginationTotalUsers').html(data['total_entries']);
      $('.pagination-btn').blur();

      if (data['prev_btn'] == 'disabled') {
        $('.pagination-btn.left.user').attr('disabled', true);
      }
      else {
        $('.pagination-btn.left.user').attr('disabled', false);
      }

      if (data['next_btn'] == 'disabled') {
        $('.pagination-btn.right.user').attr('disabled', true);
      }
      else {
        $('.pagination-btn.right.user').attr('disabled', false);
      }
    });
}

/* END OF PAGINATION */

function textCounter(field,field2,maxlimit){
 var countfield = document.getElementById(field2);
  if( field.value.length > maxlimit ){
    field.value = field.value.substring( 0, maxlimit );
  return false;
  }
  else{
    countfield.value = "Remaining: " + (maxlimit - field.value.length);
  }
}

function replyCounter(field,field2,maxlimit){
 var countfield = document.getElementById(field2);
  if( field.value.length > maxlimit ){
    field.value = field.value.substring( 0, maxlimit );
  return false;
  }
  else{
    countfield.value = "Remaining: " + (maxlimit - field.value.length);
  }
}

function open_conversation(conversation_id) {
  $.get('/conversation',
    {
      conversation_id:conversation_id
    },
    function(data){
      $('.content').html(data);
    });
}

function supply_msisdn(msisdn) {
  $('#saveContactMsisdn').val($('#unsavedMsisdn').html());
  $('#saveContactMsisdn').change();
  setTimeout(function(){
    $('#saveContactName').focus();
  }, 800);
}

function save_contact() {
  $('#saveContactBtn').button('loading');

  var groups = [];
  var types = [];
  $( ".contact-type-picker.selected" ).each(function( index ) {
    types.push($(this).attr('id'));
  });

  if (types.length == 2) {
    contact_type = 'Both';
  }
  else {
    contact_type = $( ".contact-type-picker.selected" ).html();
  }

  $( ".group-picker-save.selected" ).each(function( index ) {
    groups.push($(this).attr('id'));
  });
  var name = $('#saveContactName').val();
  var msisdn = $('#saveContactMsisdn').val();
  $.post('/contact/save',
    {
      type:'save',
      name:name,
      msisdn:msisdn,
      groups:groups,
      contact_type:contact_type
    },
    function(data){
      $('#saveContactBtn').button('complete');
      $('#saveContactModal').modal('hide');
      $('.content').html(data);
      $('#saveContactModal .form-control').val('');
      $('#saveContactModal .contact-type-picker').removeClass('selected');
      $('#saveContactModal .group-picker').removeClass('selected');
      $('#saveContactModal .form-control').change();
    });
}

function add_contact() {
  $('#addContactBtn').button('loading');

  var groups = [];
  var types = [];
  $( ".contact-type-picker.add-contact-picker.selected").each(function( index ) {
    types.push($(this).attr('id'));
  });

  if (types.length == 2) {
    contact_type = 'Both';
  }
  else {
    contact_type = $( ".contact-type-picker.add-contact-picker.selected" ).html();
  }

  $( ".group-picker-add.selected" ).each(function( index ) {
    groups.push($(this).attr('id'));
  });
  var name = $('#addContactName').val();
  var msisdn = $('#addContactMsisdn').val();
  $.post('/contact/save',
    {
      type:'add',
      name:name,
      msisdn:msisdn,
      groups:groups,
      contact_type:contact_type
    },
    function(data){
      $('#addContactModal').modal('hide');
      $('.content').html(data);
      $('#addContactBtn').button('complete');
      $('#addContactModal .form-control').val('');
      $('#addContactModal .contact-type-picker').removeClass('selected');
      $('#addContactModal .group-picker').removeClass('selected');
      $('#addContactModal .form-control').change();
    });
}

function edit_contact(type) {
  $('#editContactBtn').button('loading');

  var groups = [];
  var types = [];
  $( ".contact-type-picker.edit-contact-picker.selected").each(function( index ) {
    types.push($(this).attr('id'));
  });

  if (types.length == 2) {
    contact_type = 'Both';
  }
  else {
    contact_type = $( ".contact-type-picker.edit-contact-picker.selected" ).html();
  }
  $( ".group-picker-edit.selected" ).each(function( index ) {
    groups.push($(this).attr('id'));
  });
  var name = $('#editContactName').val();
  var msisdn = $('#editContactMsisdn').val();
  $.post('/contact/edit',
    {
      type:type,
      name:name,
      msisdn:msisdn,
      groups:groups,
      contact_type:contact_type
    },
    function(data){
      $('#editContactModal').modal('hide');
      $('.content').html(data['template']);
      $('#recipientGroupContainer').html(data['groups_template']);
      $('#editContactBtn').button('complete');
      $('#editContactBtn').attr('disabled', true);
    });
}

function supply_contact_info() {
  var msisdn = $('#hiddenMsisdn').val();
  $.get('/contact',
    {
      type:'from_convo',
      msisdn:msisdn
    },
    function(data){
      $('#editContactModal .modal-content').html(data);
      $('#editContactModal .form-control').change();
    });
}

function supply_info_from_contacts(msisdn) {
  $.get('/contact',
    {
      type:'from_contacts',
      msisdn:msisdn
    },
    function(data){
      $('#editContactModal .modal-content').html(data);
      $('#editContactModal .form-control').change();
    });
}

function open_group(group_id) {
  $.get('/group',
    {
      group_id:group_id
    },
    function(data){
      $('#groupMembersModal .modal-body').html(data);
      $('#groupMembersModal .form-control').change();
    });
}

function save_group_change() {
  var group_name = $('#editGroupName').val();
  $.post('/group/edit',
    {
      group_name:group_name
    },
    function(data){
      show_groups('continue')
      $('#groupMembersModal').modal('hide');
    });
}

function delete_group_member() {
  $.post('/group/members/delete',
  function(data){
    $('#groupMembersModal .modal-body').html(data);
    $('#groupMembersModal .form-control').change();
    $('#deleteMemberModal').modal('hide');
  });
}

function get_delete_member(member_id, group_id) {
  $.post('/group/members/delete/get',
  {
    member_id:member_id,
    group_id:group_id
  },
  function(data){
    $('#deleteMemberModal').modal('show');
  });
}

function send_reply() {
  $('#sendReplyBtn').button('loading');
  var content = $('#conversationReply').val();
  $.post('/conversation/reply',
    {
      content:content
    },
    function(data){
      $('#sendReplyBtn').button('complete');
      if (data['status'] == 'success') {
        $('.conversation-container').append(data['template']);
        $('#conversationReply').val('');
        $('#replyCharacterCounter').val('Remaining: 420');
        $('#replySuccess').fadeIn();
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
        setTimeout(function() {
          $('#sendReplyBtn').attr('disabled', true);
        }, 0);
        setTimeout(function() {
          $('#replySuccess').fadeOut();
        }, 4000);
      }
      else {
        $('#replyError').fadeIn();
        setTimeout(function() {
          $('#replyError').fadeOut();
        }, 4000);
      }
    });
}

function initialize_recipients() {
  special = undefined;
  total_recipients = 0;
  $('.no-recipient').show();
  $('#recipientCount').html('('+total_recipients+')');
  $('.recipient-group').removeClass('selected');
  $('.recipient-contact').removeClass('selected');
  $('#recipientContainer').html('<span class="empty-recipient-label">Recipients</span>');
  $('.add-recipient-right-body').html('<div class="no-recipient"><span>Empty</span></div>');
}

function add_recipient(recipient_id) {
  $('#'+recipient_id+'.recipient-group').toggleClass('selected');
  if ($('#'+recipient_id+'.recipient-group').hasClass('selected')) {
    $.post('/recipients/group/add',
    {
      recipient_id:recipient_id
    },
    function(data){
      $('.add-recipient-right-body').append(data['template']);
      total_recipients += parseInt(data['size']);
      $('#recipientCount').html('('+total_recipients+')');
      if (total_recipients == 0) {
        $('.no-recipient').show();
      }
      else {
        $('.no-recipient').hide();
      }
    });
  }

  else {
    remove_group_recipient(recipient_id);
  }
}

function add_everyone_recipient(size) {
  $('#everyoneRecipient').toggleClass('selected');
  if ($('#everyoneRecipient').hasClass('selected')) {
    total_recipients = parseInt(size);
    $('.recipient-group:not(#everyoneRecipient)').addClass('disabled');
    $('.recipient-group:not(#everyoneRecipient)').removeClass('selected');
    $('.recipient-contact').addClass('disabled');
    $('.recipient-contact').removeClass('selected');
    $('.active-recipient.group').remove();
    $('.active-recipient.individual').remove();
    $('.add-recipient-right-body').append("<div id='everyoneRecipient' class='active-recipient group'><span class='active-recipient-name'>Everyone ("+size+")</span><div class='remove-recipient-container'><span class='remove-recipient' onclick='remove_everyone_recipient("+size+")'><i class='material-icons remove-recipient-icon'>&#xE5CD;</i></span></div></div>");
    $.post('/recipients/special/add',
    function(data){
      $('.add-recipient-right-body').append(data['template']);
      total_recipients = parseInt(data['size']);
      total_recipients += parseInt(size);
      $('#recipientCount').html('('+total_recipients+')');
      if (total_recipients == 0) {
        $('.no-recipient').show();
      }
      else {
        $('.no-recipient').hide();
      }
    });
  }
  else {
    remove_everyone_recipient(size);
  }
}

function add_customers_recipient(size) {
  $('#customersRecipient').toggleClass('selected');
  if ($('#customersRecipient').hasClass('selected')) {
    total_recipients = parseInt(size);
    $('.recipient-group:not(#customersRecipient)').addClass('disabled');
    $('.recipient-group:not(#customersRecipient)').removeClass('selected');
    $('.recipient-contact').addClass('disabled');
    $('.recipient-contact').removeClass('selected');
    $('.active-recipient:not(#customersRecipient)').remove();
    individual_recipients = [];
    group_recipients = [];
    individual_recipients_name = [];
    group_recipients_name = [];
    $('.add-recipient-right-body').append("<div id='customersRecipient' class='active-recipient group'><span class='active-recipient-name'>All Customers ("+size+")</span><div class='remove-recipient-container'><span class='remove-recipient' onclick='remove_customers_recipient("+size+")'><i class='material-icons remove-recipient-icon'>&#xE5CD;</i></span></div></div>");
  }
  else {
    remove_customers_recipient(size);
  }
  $('#recipientCount').html('('+total_recipients+')');
  if (total_recipients == 0) {
    $('.no-recipient').show();
  }
  else {
    $('.no-recipient').hide();
  }
}

function add_staff_recipient(size) {
  $('#staffRecipient').toggleClass('selected');
  if ($('#staffRecipient').hasClass('selected')) {
    total_recipients = parseInt(size);
    $('.recipient-group:not(#staffRecipient)').addClass('disabled');
    $('.recipient-group:not(#staffRecipient)').removeClass('selected');
    $('.recipient-contact').addClass('disabled');
    $('.recipient-contact').removeClass('selected');
    $('.active-recipient:not(#staffRecipient)').remove();
    individual_recipients = [];
    group_recipients = [];
    individual_recipients_name = [];
    group_recipients_name = [];
    $('.add-recipient-right-body').append("<div id='staffRecipient' class='active-recipient group'><span class='active-recipient-name'>All Staff ("+size+")</span><div class='remove-recipient-container'><span class='remove-recipient' onclick='remove_staff_recipient("+size+")'><i class='material-icons remove-recipient-icon'>&#xE5CD;</i></span></div></div>");
  }
  else {
    remove_staff_recipient(size);
  }
  $('#recipientCount').html('('+total_recipients+')');
  if (total_recipients == 0) {
    $('.no-recipient').show();
  }
  else {
    $('.no-recipient').hide();
  }
}

function remove_everyone_recipient(size) {
  total_recipients -= size;
  $('#everyoneRecipient.active-recipient').remove()
  $('#everyoneRecipient').removeClass('selected');
  $('.recipient-group:not(#everyoneRecipient)').removeClass('disabled');
  $('.recipient-contact').removeClass('disabled');
  $('#recipientCount').html('('+total_recipients+')');
  if (total_recipients == 0) {
    $('.no-recipient').show();
  }
  else {
    $('.no-recipient').hide();
  }
}

function remove_customers_recipient(size) {
  total_recipients -= size;
  $('#customersRecipient.active-recipient').remove()
  $('#customersRecipient').removeClass('selected');
  $('.recipient-group:not(#customersRecipient)').removeClass('disabled');
  $('.recipient-contact').removeClass('disabled');
  $('#recipientCount').html('('+total_recipients+')');
  if (total_recipients == 0) {
    $('.no-recipient').show();
  }
  else {
    $('.no-recipient').hide();
  }
}

function remove_staff_recipient(size) {
  total_recipients -= size;
  $('#staffRecipient.active-recipient').remove()
  $('#staffRecipient').removeClass('selected');
  $('.recipient-group:not(#staffRecipient)').removeClass('disabled');
  $('.recipient-contact').removeClass('disabled');
  $('#recipientCount').html('('+total_recipients+')');
  if (total_recipients == 0) {
    $('.no-recipient').show();
  }
  else {
    $('.no-recipient').hide();
  }
}

function add_individual_recipient(recipient_id) {
  $('#'+recipient_id+'.recipient-contact').toggleClass('selected');
  if ($('#'+recipient_id+'.recipient-contact').hasClass('selected')) {
   $.post('/recipients/individual/add',
    {
      recipient_id:recipient_id
    },
    function(data){
      $('.add-recipient-right-body').append(data['template']);
      total_recipients += 1;
      $('#recipientCount').html('('+total_recipients+')');
      if (total_recipients == 0) {
        $('.no-recipient').show();
      }
      else {
        $('.no-recipient').hide();
      }
    });
  }
  else {
    return remove_individual_recipient(recipient_id);
  }
  
}

function remove_individual_recipient(recipient_id) {
  $('#'+recipient_id+'.recipient-contact').removeClass('selected');
  $.post('/recipients/individual/remove',
  {
    recipient_id:recipient_id
  },
  function(data){
    $('#'+recipient_id+'.active-recipient.individual').remove()
    total_recipients -= 1;
    $('#recipientCount').html('('+total_recipients+')');
    if (total_recipients == 0) {
      $('.no-recipient').show();
    }
    else {
      $('.no-recipient').hide();
    }
  });
  return
}

function remove_group_recipient(recipient_id) {
  $('#'+recipient_id+'.recipient-group').removeClass('selected');
  $.post('/recipients/group/remove',
  {
    recipient_id:recipient_id
  },
  function(data){
    $('#'+recipient_id+'.active-recipient.group').remove()
    total_recipients -= parseInt(data['size']);
    $('#recipientCount').html('('+total_recipients+')');
    if (total_recipients == 0) {
      $('.no-recipient').show();
    }
    else {
      $('.no-recipient').hide();
    }
  });
  return
}

function save_recipients() {
  if ($('#everyoneRecipient').hasClass('selected')) {
    special = 'Everyone';
  }
  else if ($('#customersRecipient').hasClass('selected')) {
    special = 'All Customers';
  }
  else if ($('#staffRecipient').hasClass('selected')) {
    special = 'All Staff';
  }
  else {
    special = undefined;
  }
  $.post('/recipients/add',
    {
      special:special
    },
    function(data){
      $('#addRecipientModal').modal('hide');
      $('#recipientContainer').html(data);
    });
}

function send_text_blast() {
  $('#sendMessageBtn').button('loading');
  var content = $('#messageBody').val();
  $.post('/blast/send',
    {
      content:content,
      total_recipients:total_recipients,
      special:special
    },
    function(data){
      $('#sendMessageBtn').button('complete');
      $('#messageContainer').hide();
      $('#messageBody').val('');
      initialize_recipients();
      $('.active-recipient').remove()
      $('.recipient-group').removeClass('selected');
      $('.recipient-contact').removeClass('selected');
      $('.recipient-group').removeClass('disabled');
      $('.recipient-contact').removeClass('disabled');
      $('#recipientCount').html('('+total_recipients+')');

      $('#blastOverlay .blast-overlay-body').html(data['template']);
      $('#blastOverlay').removeClass('hidden');
      $('body').css('overflow-y','hidden');
      if (data['pending'] != 0) {
        refresh_blast_progress(data['batch_id']);
      }
      else {
        display_blast_report(data['batch_id']);
      }
    });
}

function refresh_blast_progress(batch_id) {
  $.post('/blast/progress',
    {
      batch_id:batch_id
    },
    function(data){
      $('#blastOverlay .blast-overlay-body').html(data['template']);
      if (data['pending'] != 0) {
        refresh_blast_progress(batch_id);
      }
      else {
        display_blast_report(batch_id);
      }
    });
}

function refresh_reminder_progress(batch_id) {
  $.post('/reminder/progress',
    {
      batch_id:batch_id
    },
    function(data){
      $('#blastOverlay .blast-overlay-body').html(data['template']);
      if (data['pending'] != 0) {
        refresh_reminder_progress(batch_id);
      }
      else {
        display_reminder_report(batch_id);
      }
    });
}

function search_contact_groups() {
  $('#recipientGroupLoading').removeClass('hidden');
  var group_name = $('#searchContactGroups').val();
  $.post('/contacts/groups/search',
    {
      group_name:group_name,
      group_recipients:group_recipients
    },
    function(data){
      $('#recipientGroupContainer').html(data);
      $('#recipientGroupLoading').addClass('hidden');
    });
}

function search_contact_recipients() {
  $('#recipientContactLoading').removeClass('hidden');
  var name = $('#searchRecipientName').val();
  $.post('/contacts/indiv/search',
    {
      name:name,
      individual_recipients:individual_recipients
    },
    function(data){
      $('#recipientContactContainer').html(data);
      $('#recipientContactLoading').addClass('hidden');
    });
}


function refresh_contacts_progress(batch_id) {
  $.post('/contacts/progress',
    {
      batch_id:batch_id
    },
    function(data){
      $('#blastOverlay .blast-overlay-body').html(data['template']);
      if (data['pending'] != 0) {
        console.log(data['batch_id']);
        refresh_contacts_progress(data['batch_id']);
      }
      else {
        display_contacts_report(data['batch_id']);
      }
    });
}

function hide_blast_progress() {
  $('#blastOverlay').addClass('hidden');
  $('body').css('overflow-y','scroll');
}

function display_blast_report(batch_id) {
  $.post('/blast/summary',
    {
      batch_id:batch_id
    },
    function(data){
      $('#blastOverlay .blast-overlay-body').append(data);
    });
}

function display_reminder_report(batch_id) {
  $.post('/reminder/summary',
    {
      batch_id:batch_id
    },
    function(data){
      $('#blastOverlay .blast-overlay-body').append(data);
    });
}

function display_contacts_report(batch_id) {
  $.post('/contacts/summary',
    {
      batch_id:batch_id
    },
    function(data){
      $('#blastOverlay .blast-overlay-body').append(data);
    });
}

function send_reminder() {
  $('#sendReminderBtn').button('loading');
  setTimeout(function(){
    var form_data = new FormData($('#uploadFileForm')[0]);
    $.ajax({
        type: 'POST',
        url: '/reminder/upload',
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        async: false,
        success: function(data) {
          if (data['status'] == 'success') {
            $('#fileErrorMessage').addClass('hidden');
            $('#addReminderModal').modal('hide');
            $('#blastOverlay .blast-overlay-body').html(data['template']);
            $('#blastOverlay').removeClass('hidden');
            $('body').css('overflow-y','hidden');
            if (data['pending'] != 0) {
              refresh_reminder_progress(data['batch_id']);
            }
            else {
              display_reminder_report(data['batch_id']);
            }
            $('#sendReminderBtn').button('complete');
          }
          else {
            $('#fileErrorMessage').html(data['message']);
            $('#fileErrorMessage').removeClass('hidden');
            $('#sendReminderBtn').button('complete');
          }
        },
    });
  }, 800);
}

function upload_contacts() {
  $('#uploadContactsBtn').button('loading');
  setTimeout(function(){
    var form_data = new FormData($('#uploadContactsForm')[0]);
    $.ajax({
        type: 'POST',
        url: '/contacts/upload',
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        async: false,
        success: function(data) {
          if (data['status'] == 'success') {
            $('#contactsFileErrorMessage').addClass('hidden');
            $('#uploadContactsModal').modal('hide');
            $('#blastOverlay .blast-overlay-body').html(data['template']);
            $('#blastOverlay').removeClass('hidden');
            $('body').css('overflow-y','hidden');
            if (data['pending'] != 0) {
              refresh_contacts_progress(data['batch_id']);
            }
            else {
              display_contacts_report(data['batch_id']);
            }
            $('#uploadContactsBtn').button('complete');
          }
          else {
            $('#contactsFileErrorMessage').html(data['message']);
            $('#contactsFileErrorMessage').removeClass('hidden');
            $('#uploadContactsBtn').button('complete');
          }
        },
    });
  }, 800);
}

function save_group() {
  var name = $('#addGroupName').val();
  $.post('/groups/save',
    {
      name:name
    },
    function(data){
      if (data['status'] == 'success') {
        $('#createGroupModal').hide();
        $('#addGroupName').val('');
        $('#addGroupName').change();
        $('#addGroupError').addClass('hidden');
        $('.content').html(data['template']);
        $('#addContactModal .contact-group-container').html(data['group_template']);
      }
      else {
        $('#addGroupError').html(data['message']);
        $('#addGroupError').removeClass('hidden');
      }
    });
}

function open_blast(batch_id) {
  $.get('/blast',
    {
      batch_id:batch_id
    },
    function(data){
      $('.content').html(data);
    });
}

function open_reminder(reminder_id) {
  $.get('/reminder',
    {
      reminder_id:reminder_id
    },
    function(data){
      $('#viewReminderModal .modal-body').html(data);
    });
}

function check_upload_progress() {
  $.get('/progress/existing',
    function(data){
      if (data['in_progress'] == 'blast') {
        $('#blastOverlay .blast-overlay-body').html(data['template']);
        $('#blastOverlay').removeClass('hidden');
        if (data['pending'] != 0) {
          refresh_blast_progress(data['batch_id']);
        }
      }
      else if (data['in_progress'] == 'reminder') {
        $('#blastOverlay .blast-overlay-body').html(data['template']);
        $('#blastOverlay').removeClass('hidden');
        if (data['pending'] != 0) {
          refresh_reminder_progress(data['batch_id']);
        }
      }
      else if (data['in_progress'] == 'contact') {
        $('#blastOverlay .blast-overlay-body').html(data['template']);
        $('#blastOverlay').removeClass('hidden');
        if (data['pending'] != 0) {
          refresh_contacts_progress(data['batch_id']);
        }
      }
    });
}

function search_inbound(active_text) {
  $('#inboundTbody').html('');
  $('#searchLoader').removeClass('hidden');
  var waybill_no = $('#searchWaybillNo').val();
  var type = $('#searchWaybillType').val();
  var destination = $('#searchWaybillDestination').val();
  var recipient = $('#searchWaybillRecipient').val();
  var status = $('#searchWaybillStatus').val();
  var amount = $('#searchWaybillAmount').val();
  var received = $('#searchWaybillReceived').val();
  var arrived = $('#searchWaybillArrived').val();

  if ((waybill_no == '') && (type == null) && (destination == '') && (recipient == '') && (status == null) && (amount == '') && (received == '') && (arrived == '')) {
    $.get('/inbound',
    {
      slice_from:'reset'
    },
    function(data){
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#'+active_text).focus();
    });
  }
  else {
    $.get('/inbound/search',
    {
      waybill_no:waybill_no,
      type:type,
      destination:destination,
      recipient:recipient,
      status:status,
      amount:amount,
      received:received,
      arrived:arrived
    },
    function(data){
      $('#inboundTbody').html(data['template']);
      $('#searchLoader').addClass('hidden');
      if (data['count'] != 0) {
        var start_from = 1;
      }
      else {
        var start_from = 0;
      }
      $('#paginationShowingConversation').html(start_from+' - '+data['count']);
      $('#paginationTotalConversation').html(data['count']);
      $('.pagination-btn').attr('disabled',true);
    });
  }
}

function search_cargo(active_text) {
  $('#cargoTbody').html('');
  $('#searchLoader').removeClass('hidden');
  var cargo_number = $('#searchCargoNumber').val();
  var truck = $('#searchCargoTruck').val();
  var origin = $('#searchCargoOrigin').val();
  var destination = $('#searchCargoDestination').val();
  var departure = $('#searchCargoDeparture').val();
  var arrival = $('#searchCargoArrival').val();

  if ((cargo_number == '') && (truck == '') && (origin == '') && (destination == '') && (departure == '') && (arrival == '')) {
    $.get('/cargos',
    {
      slice_from:'reset'
    },
    function(data) {
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#'+active_text).focus();
    });
  }
  else {
    $.get('/cargos/search',
    {
      cargo_number:cargo_number,
      truck:truck,
      origin:origin,
      destination:destination,
      departure:departure,
      arrival:arrival
    },
    function(data){
      $('#cargoTbody').html(data['template']);
      $('#searchLoader').addClass('hidden');
      if (data['count'] != 0) {
        var start_from = 1;
      }
      else {
        var start_from = 0;
      }
      $('#paginationShowingConversation').html(start_from+' - '+data['count']);
      $('#paginationTotalConversation').html(data['count']);
      $('.pagination-btn').attr('disabled',true);
    });
  }
}

function search_history(active_text) {
  $('#historyTbody').html('');
  $('#searchLoader').removeClass('hidden');
  var history_no = $('#searchHistoryWaybill').val();
  var history_type = $('#searchHistoryType').val();
  var recipient = $('#searchHistoryRecipient').val();
  var amount = $('#searchHistoryAmount').val();
  var payment_date = $('#searchHistoryPayment').val();

  if ((history_no == '') && (history_type == '') && (recipient == '') && (amount == '') && (payment_date == '')) {
    $.get('/history',
    {
      slice_from:'reset'
    },
    function(data) {
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#'+active_text).focus();
    });
  }
  else {
    $.get('/history/search',
    {
      history_no:history_no,
      history_type:history_type,
      recipient:recipient,
      amount:amount,
      payment_date:payment_date
    },
    function(data){
      $('#historyTbody').html(data['template']);
      $('#searchLoader').addClass('hidden');
      if (data['count'] != 0) {
        var start_from = 1;
      }
      else {
        var start_from = 0;
      }
      $('#paginationShowingConversation').html(start_from+' - '+data['count']);
      $('#paginationTotalConversation').html(data['count']);
      $('.pagination-btn').attr('disabled',true);
    });
  }
}

function search_reports(active_text) {
  $('#historyTbody').html('');
  $('#searchLoader').removeClass('hidden');
  var name = $('#searchReportName').val();
  var type = $('#searchReportType').val();
  var staff = $('#searchReportStaff').val();
  var date = $('#searchReportDate').val();

  if ((name == '') && (type == '') && (staff == '') && (date == '')) {
    $.get('/reports',
    {
      slice_from:'reset'
    },
    function(data) {
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#'+active_text).focus();
    });
  }
  else {
    $.get('/reports/search',
    {
      name:name,
      type:type,
      staff:staff,
      date:date
    },
    function(data){
      $('#reportsTbody').html(data['template']);
      $('#searchLoader').addClass('hidden');
      if (data['count'] != 0) {
        var start_from = 1;
      }
      else {
        var start_from = 0;
      }
      $('#paginationShowingConversation').html(start_from+' - '+data['count']);
      $('#paginationTotalConversation').html(data['count']);
      $('.pagination-btn').attr('disabled',true);
    });
  }
}

function search_users(active_text) {
  $('#usersTbody').html('');
  $('#searchLoader').removeClass('hidden');
  var name = $('#searchUserName').val();
  var role = $('#searchUserRole').val();
  var email = $('#searchUserEmail').val();

  if ((name == '') && (role == '') && (email == '')) {
    $.get('/users',
    {
      slice_from:'reset'
    },
    function(data) {
      $('.content').html(data);
      $('#searchLoader').addClass('hidden');
      $('#'+active_text).focus();
    });
  }
  else {
    $.get('/users/search',
    {
      name:name,
      role:role,
      email:email
    },
    function(data){
      $('#usersTbody').html(data['template']);
      $('#searchLoader').addClass('hidden');
      if (data['count'] != 0) {
        var start_from = 1;
      }
      else {
        var start_from = 0;
      }
      $('#paginationShowingConversation').html(start_from+' - '+data['count']);
      $('#paginationTotalConversation').html(data['count']);
      $('.pagination-btn').attr('disabled',true);
    });
  }
}

function select_conversation(entry_id) {
  selected_inbound.push(entry_id);
  if (selected_inbound.length != 0) {
    $('#deleteInboundBtn').removeClass('hidden');
  }
  else {
    $('#deleteInboundBtn').addClass('hidden');
  }
}

function deselect_conversation(entry_id) {
  var entry_index = selected_inbound.indexOf(entry_id);
  selected_inbound.splice(entry_index, 1);
  if (selected_inbound.length != 0) {
    $('#deleteInboundBtn').removeClass('hidden');
  }
  else {
    $('#deleteInboundBtn').addClass('hidden');
  }
}

function select_blast(entry_id) {
  selected_blasts.push(entry_id);
  if (selected_blasts.length != 0) {
    $('#deleteBlastsBtn').removeClass('hidden');
  }
  else {
    $('#deleteBlastsBtn').addClass('hidden');
  }
}

function deselect_blast(entry_id) {
  var entry_index = selected_blasts.indexOf(entry_id);
  selected_blasts.splice(entry_index, 1);
  if (selected_blasts.length != 0) {
    $('#deleteBlastsBtn').removeClass('hidden');
  }
  else {
    $('#deleteBlastsBtn').addClass('hidden');
  }
}

function select_reminder(entry_id) {
  selected_reminders.push(entry_id);
  if (selected_reminders.length != 0) {
    $('#deleteRemindersBtn').removeClass('hidden');
  }
  else {
    $('#deleteRemindersBtn').addClass('hidden');
  }
}

function deselect_reminder(entry_id) {
  var entry_index = selected_reminders.indexOf(entry_id);
  selected_reminders.splice(entry_index, 1);
  if (selected_reminders.length != 0) {
    $('#deleteRemindersBtn').removeClass('hidden');
  }
  else {
    $('#deleteRemindersBtn').addClass('hidden');
  }
}

function select_contact(entry_id) {
  selected_contacts.push(entry_id);
  if (selected_contacts.length != 0) {
    $('#deleteContactsBtn').removeClass('hidden');
  }
  else {
    $('#deleteContactsBtn').addClass('hidden');
  }
}

function deselect_contact(entry_id) {
  var entry_index = selected_contacts.indexOf(entry_id);
  selected_contacts.splice(entry_index, 1);
  if (selected_contacts.length != 0) {
    $('#deleteContactsBtn').removeClass('hidden');
  }
  else {
    $('#deleteContactsBtn').addClass('hidden');
  }
}

function select_group(entry_id) {
  selected_groups.push(entry_id);
  if (selected_groups.length != 0) {
    $('#deleteGroupsBtn').removeClass('hidden');
  }
  else {
    $('#deleteGroupsBtn').addClass('hidden');
  }
}

function deselect_group(entry_id) {
  var entry_index = selected_groups.indexOf(entry_id);
  selected_groups.splice(entry_index, 1);
  if (selected_groups.length != 0) {
    $('#deleteGroupsBtn').removeClass('hidden');
  }
  else {
    $('#deleteGroupsBtn').addClass('hidden');
  }
}

function select_user(entry_id) {
  selected_users.push(entry_id);
  if (selected_users.length != 0) {
    $('#deleteUsersBtn').removeClass('hidden');
  }
  else {
    $('#deleteUsersBtn').addClass('hidden');
  }
}

function deselect_user(entry_id) {
  var entry_index = selected_users.indexOf(entry_id);
  selected_users.splice(entry_index, 1);
  if (selected_users.length != 0) {
    $('#deleteUsersBtn').removeClass('hidden');
  }
  else {
    $('#deleteUsersBtn').addClass('hidden');
  }
}

function delete_inbound() {
  $.post('/inbound/delete',
  {
    selected_inbound:selected_inbound
  },
  function(data){
    show_inbound('continue');
    $('#deleteInboundModal').modal('hide');
  });
}

function delete_blasts() {
  $.post('/blasts/delete',
  {
    selected_blasts:selected_blasts
  },
  function(data){
    show_blasts('continue');
    $('#deleteBlastsModal').modal('hide');
  });
}

function delete_reminders() {
  $.post('/reminders/delete',
  {
    selected_reminders:selected_reminders
  },
  function(data){
    show_payment_reminders('continue');
    $('#deleteRemindersModal').modal('hide');
  });
}

function delete_contacts() {
  $.post('/contacts/delete',
  {
    selected_contacts:selected_contacts
  },
  function(data){
    show_contacts('continue');
    $('#deleteContactsModal').modal('hide');
  });
}

function delete_groups() {
  $.post('/groups/delete',
  {
    selected_groups:selected_groups
  },
  function(data){
    show_groups('continue');
    $('#deleteGroupsModal').modal('hide');
  });
}

function add_number_recipient() {
  recipient = $('#addNumberRecipient').val();
  $.post('/recipients/number/add',
  {
    recipient:recipient
  },
  function(data){
    total_recipients += 1;
    $('#recipientCount').html('('+total_recipients+')');
    $('.add-recipient-right-body').append(data);
    $('#addNumberRecipient').val('');
    $('#addNumberRecipientBtn').attr('disabled',true);
    $('.no-recipient').hide();
  });
}

function remove_number_recipient(msisdn) {
  $.post('/recipients/number/remove',
  {
    msisdn:msisdn
  },
  function(data){
    $('#'+msisdn+'.active-recipient.number').remove()
    total_recipients -= 1;
    $('#recipientCount').html('('+total_recipients+')');
    if (total_recipients == 0) {
      $('.no-recipient').show();
    }
    else {
      $('.no-recipient').hide();
    }
  });
  return
}

function close_message() {
  initialize_recipients();
  $.post('/recipients/clear',
  function(data){
    $('#recipientContainer').html('<span class="empty-recipient-label">Recipients</span>');
  });
}

function toggle_group_save(group_id) {
  $('#'+group_id+'.group-picker-save').toggleClass('selected');
}

function toggle_group_add(group_id) {
  $('#'+group_id+'.group-picker-add').toggleClass('selected');
}

function toggle_group_edit(group_id) {
  $('#'+group_id+'.group-picker-edit').toggleClass('selected');
}

function validate_save() {
  var name = $('#saveContactName').val();
  setTimeout(function(){
    var contact_type = $( ".contact-type-picker.selected.save" ).html();
    if ((name != '') && (contact_type != undefined)) {
       $('#saveContactBtn').attr('disabled', false);
    }
    else{
       $('#saveContactBtn').attr('disabled', true);
    }
  }, 0);
}

function validate_edit() {
  var name = $('#editContactName').val();
  var msisdn = $('#editContactMsisdn').val();
  setTimeout(function(){
    var contact_type = $( ".contact-type-picker.selected.edit" ).html();
    if ((name != '') && (contact_type != undefined) && (msisdn != '') && (!isNaN(msisdn)) && (msisdn.length == 11)) {
       $('#editContactBtn').attr('disabled', false);
    }
    else{
       $('#editContactBtn').attr('disabled', true);
    }
  }, 0);
}

function validate_add() {
  var name = $('#addContactName').val();
  var msisdn = $('#addContactMsisdn').val();
  setTimeout(function(){
    var contact_type = $( ".contact-type-picker.selected" ).html();
    if ((name != '') && (contact_type != undefined) && (msisdn != '') && (!isNaN(msisdn)) && (msisdn.length == 11)) {
       $('#addContactBtn').attr('disabled', false);
    }
    else{
       $('#addContactBtn').attr('disabled', true);
    }
  }, 0);
}

function validate_group() {
  var group_name = $('#addGroupName').val();
  if (group_name != '') {
    $('#saveGroupBtn').attr('disabled', false);
  }
  else {
    $('#saveGroupBtn').attr('disabled', true);
  }
}

function validate_group_edit() {
  var group_name = $('#editGroupName').val();
  if (group_name != '') {
    $('#saveGroupEditBtn').attr('disabled', false);
  }
  else {
    $('#saveGroupEditBtn').attr('disabled', true);
  }
}

function save_waybill_item() {
  $('#saveWaybillItemBtn').button('loading');
  name = $('#waybillItemName').val();
  quantity = $('#waybillItemQuantity').val();
  unit = $('#waybillItemUnit').val();
  price = $('#waybillItemPrice').val();
  $.post('/waybill/item/save',
  {
    name:name,
    quantity:quantity,
    unit:unit,
    price:price
  },
    function(data){
      $('#waybillItemTable tbody').append(data['template']);
      $('#waybillTotal').html('PHP '+data['total']);
      if (data['item_count'] == 1){
        $('#addWaybillTotal').html('Package Content ('+data['item_count']+' item)');
      }
      else {
        $('#addWaybillTotal').html('Package Content ('+data['item_count']+' items)');
      }
      $('#addWaybillItemModal').modal('hide');
      $('#saveWaybillItemBtn').button('complete');
    });
}

function save_waybill_item_edit() {
  $('#saveWaybillItemEditBtn').button('loading');
  name = $('#waybillItemNameEdit').val();
  quantity = $('#waybillItemQuantityEdit').val();
  unit = $('#waybillItemUnitEdit').val();
  price = $('#waybillItemPriceEdit').val();
  $.post('/waybill/item/edit',
  {
    name:name,
    quantity:quantity,
    unit:unit,
    price:price
  },
    function(data){
      $('#waybillItemTableEdit tbody').append(data['template']);
      $('#waybillTotalEdit').html('PHP '+data['total']);
      $('#waybillChangeEdit').html('PHP '+data['change']);
      $('#addWaybillItemEditModal').modal('hide');
      $('#saveWaybillItemEditBtn').button('complete');
    });
}

function delete_waybill_item(item_id) {
  $.post('/waybill/item/remove',
  {
    item_id:item_id
  },
  function(data){
    $('tr#'+item_id).remove();
    $('#waybillTotal').html('PHP '+data['total']);
    if (data['item_count'] == 1){
      $('#addWaybillTotal').html('Package Content ('+data['item_count']+' item)');
    }
    else {
      $('#addWaybillTotal').html('Package Content ('+data['item_count']+' items)');
    }
  });
}

function delete_waybill_item_edit(item_id) {
  $.post('/waybill/item/edit/remove',
  {
    item_id:item_id
  },
  function(data){
    $('tr#'+item_id+'.waybill-item-tr').remove();
    $('#waybillTotalEdit').html('PHP '+data['total']);
    $('#waybillChangeEdit').html('PHP '+data['change']);
  });
}

function supply_date() {
  $.get('/date',
  function(data){
    $('#addWaybillDate').val(data['date']);
    $('#addWaybillDate').change();
  });
}

function open_forgotten_waybill_item () {
  $('#forgotWaybillItemModal').modal('hide');
  $('#addWaybillItemModal').modal('show');
}

function save_waybill() {
  $('#saveWaybillBtn').button('loading');
  waybill_type = $('#addWaybillType').val();
  total = $('#waybillTotal').html().substring(4);
  tendered = $('#waybillTenderedText').val();

  if ($('#waybillItemTable tbody tr').length == 0) {
    $('#forgotWaybillItemModal').modal('show');
    $('#saveWaybillBtn').button('complete');
  }

  else if ((waybill_type == 'Cash') && (tendered == '')) {
    $('.forgot-payment-message').html('Looks like you forgot to add payment (required for <strong>Cash Waybills</strong>). No worries, you can add payment below:');
    $('#forgottenTotal').html($('#waybillTotal').html());
    $('#forgottenTenderedText').val($('#waybillTenderedText').val());
    $('#forgottenChange').html($('#waybillChange').html());
    $('#forgotPaymentModal').modal('show');
    $('#saveWaybillBtn').button('complete');
  }
  else if ((waybill_type == 'Cash') && (parseFloat(tendered) < parseFloat(total))) {
    $('.forgot-payment-message').html('Amount tendered cannot be smaller than total amount due. No worries, you can change it below:');
    $('#forgottenTotal').html($('#waybillTotal').html());
    $('#forgottenTenderedText').val($('#waybillTenderedText').val());
    $('#forgottenChange').html($('#waybillChange').html());
    $('#forgotPaymentModal').modal('show');
    $('#saveWaybillBtn').button('complete');
  }
  else {
    date = $('#addWaybillDate').val();
    waybill_number = $('#addWaybillNumber').val();
    recipient = $('#addWaybillRecipient').val();
    recipient_msisdn = $('#addWaybillRecipientMsisdn').val();
    destination = $('#addWaybillDestination').val();
    recipient_address = $('#addWaybillAddress').val();
    shipper = $('#addWaybillShipper').val();
    shipper_msisdn = $('#addWaybillShipperMsisdn').val();
    notes = $('#waybillNotes').val();
    change = $('#waybillChange').html().substring(4);

    $.post('/waybill/save',
    {
      date:date,
      waybill_number:waybill_number,
      waybill_type:waybill_type,
      recipient:recipient,
      recipient_msisdn:recipient_msisdn,
      destination:destination,
      recipient_address:recipient_address,
      shipper:shipper,
      shipper_msisdn:shipper_msisdn,
      total:total,
      tendered:tendered,
      change:change,
      notes:notes
    },
    function(data){
      if (data['status'] == 'success') {
        $('.content').html(data['template']);
        clear_waybill_data();
        $('#addWaybillModal').modal('hide');
      }
      else {
        $('#cargoItemError').fadeIn();
        $('#cargoItemError .snackbar-message').html(data['message']);
        setTimeout(function(){
          $('#cargoItemError').fadeOut();
        },5000);
      }
      $('#saveWaybillBtn').button('complete');
    });
  }
}

function open_waybill(waybill_id) {
  $.get('/waybill',
  {
    waybill_id:waybill_id
  },
  function(data){
    $('#editWaybillModal .modal-body').html(data['template']);
    $('#editWaybillModal').modal('show');
  });
}

function open_cargo(cargo_id) {
  $.get('/cargo',
  {
    cargo_id:cargo_id
  },
  function(data){
    $('#editCargoModal .modal-body').html(data['template']);
    $('#editCargoModal').modal('show');
  });
}

function clear_waybill_data() {
  $('#cancelWaybillBtn').button('loading');
  $('#addWaybillModal .form-control').val('');
  $('#addWaybillModal .form-control').change();
  $.post('/waybill/item/clear',
  function(data){
    $('#waybillTotal').html('PHP 0');
    $('#waybillChange').html('PHP 0');
    $('#addWaybillTotal').html('Package Content (0 items)');
    $('#addWaybillModal .error-icon-container').addClass('hidden');
    $('#addWaybillModal .form-control').css('border-bottom','1px solid #999');
    $('#addWaybillModal').modal('hide');
    $('#cancelWaybillBtn').button('complete');
    $('#addWaybillModal .modal-body').scrollTop(0);
    $('.waybill-item').remove();
  });
}

function clear_pickup_data() {
  $('#pickupType').prop('selectedIndex',0);
  $('#pickupPerson').val('');
  $('#pickupDate').val('');
  $('#pickupTime').val('');
  $('#pickupModal .form-control').change();
  $('#pickupModal .error-icon-container').addClass('hidden');
  $('#pickupModal .form-control').css('border-bottom','1px solid #999');
}

function compute_change() {
  total = parseInt($('#waybillTotal').html().substring(4));
  tendered = parseInt($('#waybillTenderedText').val());
  if ($('#waybillTenderedText').val() == '') {
    change = 0;
  }
  else {
    change = tendered - total;
  }
  $('#waybillChange').html('PHP '+String(change));
}

function compute_forgotten_change() {
  total = parseInt($('#forgottenTotal').html().substring(4));
  tendered = parseInt($('#forgottenTenderedText').val());
  if ($('#forgottenTenderedText').val() == '') {
    change = 0;
    $('#forgottenPaymentBtn').attr('disabled',true);
  }
  else {
    change = tendered - total;
    if (change < 0) {
      $('#forgottenPaymentBtn').attr('disabled',true);
    }
    else {
      $('#forgottenPaymentBtn').attr('disabled',false);
    }
  }
  $('#forgottenChange').html('PHP '+String(change));
}

function compute_add_payment_change() {
  total = parseInt($('#addPaymentTotal').html().substring(4));
  tendered = parseInt($('#addPaymentTenderedText').val());
  date = $('#addPaymentDateText').val();
  if ($('#addPaymentTenderedText').val() == '') {
    change = 0;
    $('#addPaymentBtn').attr('disabled',true);
  }
  else {
    change = tendered - total;
    if ((change > 0) && (date != '')) {
      $('#addPaymentBtn').attr('disabled',false);
    }
    else {
      $('#addPaymentBtn').attr('disabled',true);
    }
  }
  $('#addPaymentChange').html('PHP '+String(change));
}

function add_forgotten_payment() {
  tendered = $('#forgottenTenderedText').val();
  change = $('#forgottenChange').html();
  $('#waybillTenderedText').val(tendered);
  $('#waybillChange').html(change);
  $('#forgotPaymentModal').modal('hide');
  $('#forgottenTenderedText').val('');
  $('#forgottenTotal').html('PHP 0');
  $('#forgottenChange').html('PHP 0');
  save_waybill();
}

function validate_blank(element,value) {
  error_icon_id = $(element).attr('data-error')
  if (value == '') {
    $(element).css("border-bottom", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
  else {
    $(element).css("border-bottom", "1px solid #999");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
}

function validate_msisdn(element,value) {
  if ((value != '') && (value.length == 11)) {
    $(element).css("border-bottom", "1px solid #999");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border-bottom", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
}

function add_cargo_item(event,waybill_no) {
  event.preventDefault();
  waybill_no = $('#addCargoItemWaybillNumber').val();
  $.post('/cargo/item/add',
  {
    waybill_no:waybill_no
  },
  function(data){
    if (data['status'] == 'success') {
      $('#cargoItemError').fadeOut();
      $('#addCargoItemTable tbody').prepend(data['template']);
      $('#totalCargoItems').html('Total Waybills: '+String(data['item_count']));
      $('#addCargoItemWaybillNumber').val('');
      $('#addCargoWaybillBtn').attr('disabled', true);
      setTimeout(function(){
        $('#addCargoItemTable tbody tr#'+data['waybill_id']).animate(
          {
            'background-color':'#FFFFFF',
            'color': '#373A3C'
          },800);
      },300);
    }
    else {
      $('#cargoItemError').fadeIn();
      $('#cargoItemError .snackbar-message').html(data['message']);
      setTimeout(function(){
        $('#cargoItemError').fadeOut();
      },5000);
    }
  });
}

function delete_cargo_item(waybill_id,waybill_no) {
  $.post('/cargo/item/delete',
  {
    waybill_no:waybill_no
  },
  function(data){
    $('#totalCargoItems').html('Total Waybills: '+String(data['item_count']));
    $('#addCargoItemTable tbody tr#'+waybill_id).remove();
  });
}

function save_cargo_items() {
  $('#saveCargoItemsBtn').button('loading');
  $.post('/cargo/items/save',
  function(data){
    $('#cargoItemTable tbody').html(data['template']);
    if (data['item_count'] == 1){
      $('#addCargoTotal').html('Cargo Content ('+data['item_count']+' item)');
    }
    else {
      $('#addCargoTotal').html('Cargo Content ('+data['item_count']+' items)');
    }
    $('#addCargoItemWaybillNumber').val('');
    $('#addCargoItemTable tbody').html('');
    $('#addCargoItemModal').modal('hide');
    $('#saveCargoItemsBtn').button('complete');
  });
}

function supply_cargo_items() {
  $.post('/cargo/items',
  function(data){
    $('#addCargoItemTable tbody').html(data['template']);
    $('#totalCargoItems').html('Total Waybills: '+String(data['item_count']));
  });
}

function clear_cargo_items() {
  $('#cancelCargoBtn').button('loading');
  $('#totalCargoItems').html('Total Waybills: 0');
  $('#addCargoTotal').html('Cargo Content (0 items)');
  $('#addCargoModal .form-control').val('');
  $('#addCargoModal .form-control').change();
  $.post('/cargo/item/clear',
  function(data){
    $('#addCargoModal .error-icon-container').addClass('hidden');
    $('#addCargoModal .form-control').css('border-bottom','1px solid #999');
    $('#cancelCargoBtn').button('complete');
    $('#addCargoModal').modal('hide');
    $('#addCargoModal .modal-body').scrollTop(0);
    $('.cargo-item').remove();
  });
}

function generate_cargo_number() {
  $.post('/cargo/truck',
  function(data){
    $('#addCargoNumber').val(data['cargo_number']);
    $('#addCargoOrigin').val('Manila');
    $('#addCargoNumber').change();
    setTimeout(function(){
      $('#addCargoTruck').focus();
    },500);
  });
}

function save_cargo() {
  $('#saveCargoBtn').button('loading');

  cargo_number = $('#addCargoNumber').val();
  truck = $('#addCargoTruck').val();
  driver = $('#addCargoDriver').val();
  crew = $('#addCargoCrew').val();
  origin = $('#addCargoOrigin').val();
  destination = $('#addCargoDestination').val();
  departure_date = $('#addCargoDepartureDate').val();
  departure_time = $('#addCargoDepartureTime').val();
  notes = $('#cargoNotes').val();

  $.post('/cargo/save',
  {
    cargo_number:cargo_number,
    truck:truck,
    driver:driver,
    crew:crew,
    origin:origin,
    destination:destination,
    departure_date:departure_date,
    departure_time:departure_time,
    notes:notes
  },
  function(data){
    $('#saveCargoBtn').button('complete');
    if (data['status'] == 'success') {
      $('.content').html(data['template']);
      clear_cargo_items();
      $('#addCargoModal').modal('hide');
    }
    else {
      $('#cargoItemError').fadeIn();
      $('#cargoItemError .snackbar-message').html(data['message']);
      setTimeout(function(){
        $('#cargoItemError').fadeOut();
      },5000);
    }
  });
}

/*function receive_cargo(cargo_id) {
  $.get('/cargo/items/receive',
  {
    cargo_id:cargo_id
  },
  function(data){
    $('#receiveCargoItemsTable').html(data['template']);
    $('#receiveCargoModal').modal('show');
  });
}*/

function validate_cargo_receipt() {
    date = $('#receiveCargoArrivalDate').val();
    time = $('#receiveCargoArrivalTime').val();

    if ((date != '') && (time != '')) {
        $('#saveCargoReceiptBtn').attr('disabled', false);
    }
    else {
        $('#saveCargoReceiptBtn').attr('disabled', true);
    }
}

function receive_cargo() {
  $('#saveCargoReceiptBtn').button('loading');
  cargo_items = [];
  date = $('#receiveCargoArrivalDate').val();
  time = $('#receiveCargoArrivalTime').val();
  $.post('/cargo/items/receive',
  {
    date:date,
    time:time,
    cargo_items:cargo_items
  },
  function(data){
    $('#editCargoModal .modal-body').html(data['template']);
    $('#cargosTbody').find('#'+data['cargo_id']).find('.cargo-arrival-date-td').html(data['arrival_date']);
    $('#receiveCargoModal .form-control').val('');
    $('#receiveCargoModal .form-control').change();
    $('.active-cargo').removeClass('checked');
    $('#receiveCargoModal').modal('hide');

    $('#blastOverlay .blast-overlay-body').html(data['overlay_template']);
    $('#blastOverlay').removeClass('hidden');
    $('body').css('overflow-y','hidden');
    if (data['pending'] != 0) {
      refresh_blast_progress(data['batch_id']);
    }
    else {
      $('#blastOverlay').addClass('hidden');
      $('#blastOverlay .blast-overlay-body').html('');
    }
    $('#saveCargoReceiptBtn').button('complete');
  });
}

function refresh_blast_progress(batch_id) {
  $.post('/blast/progress',
  {
    batch_id:batch_id
  },
  function(data){
    $('#blastOverlay .blast-overlay-body').html(data['template']);
    if (data['pending'] != 0) {
      refresh_blast_progress(batch_id);
    }
    else {
      $('#blastOverlay').addClass('hidden');
      $('#blastOverlay .blast-overlay-body').html('');
    }
  });
}

function supply_cargo_notifications() {
  $.post('/cargo/notifications',
  function(data){
    $('#cargoNotificationsModal .modal-body').html(data['template']);
  });
}

function add_payment_data() {
  $('#addPaymentWaybillNumber').html($('#editWaybillNumber').val());
  $('#addPaymentTotal').html($('#waybillTotalEdit').html());
  $('#addPaymentTenderedText').val($('#waybillTenderedText').val());
  $('#addPaymentChange').html($('#waybillChangeEdit').html());
  $.post('/date',
  function(data){
    $('#addPaymentDateText').val(data['date']);
    $('#addPaymentModal').modal('show');
  });
}

function add_payment() {
  $('#addPaymentBtn').button('loading');
  tendered = parseInt($('#addPaymentTenderedText').val());
  date = $('#addPaymentDateText').val();
  change = $('#addPaymentChange').html().substring(4);
  $.post('/waybill/payment/add',
    {
      tendered:tendered,
      date:date,
      change:change
    },
  function(data){
    $('#editWaybillModal .modal-body').html(data['template']);
    $('#addPaymentTenderedText').val('');
    $('#addPaymentDateText').val('')
    $('#addPaymentTotal').html('PHP 0');
    $('#addPaymentChange').html('PHP 0');
    $('#addPaymentModal').modal('hide');
    $('#addPaymentBtn').button('complete');
  });
}

function print_cargo_items() {
  $.post('/report/cargo/print',
  function(data){
    $('#downloadOverlay .download-body').append(data['template']);
    $('#downloadOverlay').removeClass('hidden');
    update_report_status(data['report_id']);
  });
}

function print_master_list() {
  $.post('/report/master/print',
  function(data){
    $('#downloadOverlay .download-body').append(data['template']);
    $('#downloadOverlay').removeClass('hidden');
    update_report_status(data['report_id']);
  });
}

function update_report_status(report_id) {
  $.post('/report/status',
  {
    report_id:report_id
  },
  function(data){
    if (data['report_status'] == 'Pending') {
      update_report_status(report_id);
    }
    else {
      $('#'+report_id+'.download-item .loadingLines').hide();
      $('#'+report_id+'.download-item .check').show();
      $('#'+report_id+'.download-item .download-action-container').removeClass('hidden');
    }
  });
}

function validate_pickup() {
  var name = $('#pickupPerson').val();
  var date = $('#pickupDate').val();
  var time = $('#pickupTime').val();

  if ((name != '') && (date != '') && (time != '')) {
    $('#savePickupBtn').attr('disabled', false);
  }
  else {
    $('#savePickupBtn').attr('disabled', true);
  }
}

function pickup_waybill() {
  name = $('#pickupPerson').val();
  date = $('#pickupDate').val();
  time = $('#pickupTime').val();
  type = $('#pickupType').val();
  $.post('/waybill/pickup',
  {
    name:name,
    date:date,
    type:type,
    time:time
  },
  function(data){
    $('.content').html(data);
    $('#pickupModal').modal('hide');
    $('#editWaybillModal').modal('hide');
  });
}

function show_report_form(report_type) {
  if ((report_type == 'Master List') || (report_type == 'Packing List')) {
    $('.report-form-text').addClass('hidden');
    $('#addReportCargoNumber').removeClass('hidden');
  }
  else if (report_type == 'Sales Report') {
    $('.report-form-text').addClass('hidden');
    $('#addReportFromDate').removeClass('hidden');
    $('#addReportToDate').removeClass('hidden');
  }
  else if (report_type == 'Waybill') {
    $('.report-form-text').addClass('hidden');
    $('#addReportWaybillNumber').removeClass('hidden');
  }
}

function save_report() {
  $('#saveReportBtn').button('loading');
  report_type = $('#addReportType').val();
  cargo_no = $('#addReportCargoNumber').val();
  waybill_no = $('#addReportWaybillNumber').val();
  from_date = $('#addReportFromDate').val();
  to_date = $('#addReportToDate').val();
  $.post('/report/save',
  {
    report_type:report_type,
    cargo_no:cargo_no,
    waybill_no:waybill_no,
    from_date:from_date,
    to_date:to_date
  },
  function(data){
    $('#saveReportBtn').button('complete');

    if (data['status'] == 'failed') {
      $('#cargoItemError').fadeIn();
      $('#cargoItemError .snackbar-message').html(data['message']);
      setTimeout(function(){
        $('#cargoItemError').fadeOut();
      },5000);
    }
    else {
      $('.content').html(data['content_template']);
      $('#addReportType').prop('selectedIndex',0);
      $('#addReportModal .form-control').val('');
      $('#addReportModal .form-control').change();
      $('#addReportModal').modal('hide');
      $('#downloadOverlay .download-body').append(data['download_template']);
      $('#downloadOverlay').removeClass('hidden');
      update_report_status(data['report_id']);
    }
  });
}

function save_user() {
  $('#saveUserBtn').button('loading');
  name = $('#addUserName').val();
  email = $('#addUserEmail').val();
  temp_pw = $('#addUserPassword').val();
  role = $('#addUserRole').val();

  $.post('/user/add',
  {
    name:name,
    email:email,
    temp_pw:temp_pw,
    role:role
  },
  function(data){
    $('.content').html(data);
    $('#addUserRole').prop('selectedIndex',0);
    $('#addUserModal .form-control').val('');
    $('#addUserModal .form-control').change();
    $('#addUserModal .error-icon-container').addClass('hidden');
    $('#addUserModal .form-control').css('border-bottom','1px solid #999');
    $('#saveUserBtn').button('complete');
    $('#addUserModal').modal('hide');
  });
}

function validate_password(element,value) {
  error_icon_id = $(element).attr('data-error');
  if ((value != '') && (value.length >= 8)) {
    $(element).css("border-bottom", "1px solid #999");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border-bottom", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
}

function validate_password_confirm(element,value) {
  error_icon_id = $(element).attr('data-error');
  password = $('#changePasswordText').val();
  password_confirm = $('#changePasswordConfirmText').val();
  if (password == password_confirm) {
    $(element).css("border-bottom", "1px solid #999");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border-bottom", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
}

function validate_temp_pass(element,value) {
  error_icon_id = $(element).attr('data-error');
  password = $('#addUserPassword').val();
  password_confirm = $('#addUserPasswordConfirm').val();
  if (password == password_confirm) {
    $(element).css("border-bottom", "1px solid #999");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border-bottom", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
}

function validate_password_reset(element,value) {
  error_icon_id = $(element).attr('data-error');
  password = $('#resetPasswordText').val();
  password_confirm = $('#resetPasswordConfirmText').val();
  if (password == password_confirm) {
    $(element).css("border-bottom", "1px solid #999");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border-bottom", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
}

function reset_password() {
  $('#saveResetPasswordBtn').button('complete');
  password = $('#resetPasswordText').val();
  $.post('/user/password/reset',
  {
    password:password
  },
  function(data){
    $('#resetPasswordModal .form-control').change();
    $('#resetPasswordModal .form-control').val('');
    $('#resetPasswordModal .error-icon-container').addClass('hidden');
    $('#resetPasswordModal .form-control').css('border-bottom','1px solid #999');
    $('#saveResetPasswordBtn').button('complete');
    $('#resetPasswordModal').modal('hide');
    $('#replySuccess .snackbar-message').html('Password successfully reset.');
    $('#replySuccess').fadeIn();
    setTimeout(function() {
      $('#replySuccess').fadeOut();
    }, 4000);
  });
}

function edit_user() {
  $('#editUserBtn').button('loading');
  name = $('#editUserName').val();
  email = $('#editUserEmail').val();
  role = $('#editUserRole').val();

  $.post('/user/edit',
  {
    name:name,
    email:email,
    role:role
  },
  function(data){
    $('.content').html(data);
    $('#editUserModal .form-control').val('');
    $('#editUserModal .form-control').change();
    $('#editUserModal .error-icon-container').addClass('hidden');
    $('#editUserModal .form-control').css('border-bottom','1px solid #999');
    $('#editUserBtn').button('complete');
    $('#editUserModal').modal('hide');
    $('#replySuccess .snackbar-message').html('Changes saved.');
    $('#replySuccess').fadeIn();
    setTimeout(function() {
      $('#replySuccess').fadeOut();
    }, 4000);
  });
}

function delete_user() {
  $('#deleteUserBtn').button('loading');
  $.post('/user/delete',
  function(data){
    $('.content').html(data);
    $('#deleteUserBtn').button('complete');
    $('#editUserModal').modal('hide');
    $('#deleteUserModal').modal('hide');
    $('#replySuccess .snackbar-message').html('User successfully deleted.');
    $('#replySuccess').fadeIn();
    setTimeout(function() {
      $('#replySuccess').fadeOut();
    }, 4000);
  });
}

function change_password() {
  $('#changePasswordModal').modal({
    backdrop: 'static',
    keyboard: false
  });
}

function save_password() {
  $('#savePasswordBtn').button('loading');
  password = $('#changePasswordText').val();

  $.post('/user/password/save',
  {
    password:password
  },
  function(data){
    if (data['status'] == 'success') {
      $('#changePasswordModal').modal('hide');
    }
    else {
      $('#cargoItemError .snackbar-message').html(data['message']);
      $('#cargoItemError').fadeIn();
      $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
      setTimeout(function() {
        $('#cargoItemError').fadeOut();
      }, 4000);
    }
    $('#savePasswordBtn').button('complete');
  });
}

function supply_user_info(user_id) {
  $.get('/user',
    {
      user_id:user_id
    },
    function(data){
      $('#editUserModal .modal-body').html(data);
      $('#editUserModal .form-control').change();
    });
}