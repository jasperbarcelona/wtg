function show_active(slice_from) {
  $('#contentLoader').show();
  $('.nav-item').removeClass('active');
  $('#navActive').addClass('active');
  $('.nav-border').css('margin-left', '0');
  $.get('/transactions',
  function(data){
    $('.content').html(data['template']);
    $('#contentLoader').fadeOut();
  });
}

function show_history(slice_from) {
  $('#contentLoader').show();
  $('.nav-item').removeClass('active');
  $('#navHistory').addClass('active');
  $('.nav-border').css('margin-left', '33.33%');
  $.get('/history',
  function(data){
    $('.content').html(data['template']);
    $('#searchHistoryDate').val(data['date']);
    $('#contentLoader').fadeOut();
  });
}

function show_settings(slice_from) {
  $('#contentLoader').show();
  $('.nav-item').removeClass('active');
  $('#navSettings').addClass('active');
  $('.nav-border').css('margin-left', '66.66%');
  $.get('/account',
  function(data){
    $('.content').html(data['template']);
    $('#contentLoader').fadeOut();
  });
}

function show_service_settings(slice_from) {
  $('#settingsContentLoader').show();
  $('.settings-nav-item').removeClass('active');
  $('#settingsNavService').addClass('active');
  $.get('/services',
  function(data){
    $('#settingsContent').html(data['template']);
    $('#settingsContentLoader').fadeOut();
  });
}

function show_user_settings(slice_from) {
  $('#settingsContentLoader').show();
  $('.settings-nav-item').removeClass('active');
  $('#settingsNavUser').addClass('active');
  $.get('/users',
  function(data){
    $('#settingsContent').html(data['template']);
    $('#settingsContentLoader').fadeOut();
  });
}

function show_account_settings(slice_from) {
  $('#settingsContentLoader').show();
  $('.settings-nav-item').removeClass('active');
  $('#settingsNavAccount').addClass('active');
  $.get('/account',
  function(data){
    $('#settingsContent').html(data['template']);
    $('#settingsContentLoader').fadeOut();
  });
}

function show_usage_settings(slice_from) {
  $('#settingsContentLoader').show();
  $('.settings-nav-item').removeClass('active');
  $('#settingsNavUsage').addClass('active');
  $.get('/usage',
  function(data){
    $('#settingsContent').html(data['template']);
    $('#settingsContentLoader').fadeOut();
  });
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
    $(element).css("border", "1px solid #ccc");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border", "1px solid #d9534f");
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
  $('#'+element_id).change();
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
  $('#'+element_id).change();
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

function save_transaction() {
  $('#saveTransactionBtn').button('loading');
  items = {};
  customer_name = $('#addTransactionName').val();
  customer_msisdn = $('#addTransactionMsisdn').val();
  total = $('#transactionTotal').html().substring(4);
  notes = $('#transactionNotes').html().substring(4);
  $('.service').each(function() {
    item_id = $(this).find('.service-quantity-text').attr('id');
    quantity_text = parseFloat($(this).find('.service-quantity-text').val());
    if (quantity_text % 1 != 0){
      quantity = quantity_text.toFixed(2);
    }
    else{
      quantity = quantity_text.toFixed(0);
    }
    items[item_id] = quantity;
    /*alert('id: '+item_id+', quantity: '+quantity);*/
  });
  items['total'] = total;
  items['notes'] = notes;
  items['customer_name'] = customer_name;
  items['customer_msisdn'] = customer_msisdn;
  $.post('/transaction/save',
  items
  ,
  function(data){
    $('.content').html(data['template']);
    $('#addTransactionModal').modal('hide');
  });
}

function initialize_page() {
  $.get('/states',
  function(data){
    var states = data['customers'];
    $('.input-container .typeahead').typeahead({
      hint: true,
      highlight: true,
    },
    {
      name: 'states',
      source: substringMatcher(states)
    });
    setTimeout(function() {
      $('#mainPreloader').fadeOut();
    }, 3000);
  });
}

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    matches = [];
    substrRegex = new RegExp(q, 'i');
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};

function open_transaction(transaction_id) {
  $('.active-entry-action-container').removeClass('visible');
  $('#transactionInfoModal').modal('show');
  setTimeout(function() {
    $('#modalLoader').show();
  }, 200);
  $.post('/transaction',
  {
    transaction_id:transaction_id
  },
  function(data){
    $('#transactionInfoModal .modal-body').html(data['body_template']);
    $('#editTransactionTotal').html('PHP ' + data['total']);
    setTimeout(function() {
      $('#modalLoader').fadeOut();
    }, 500);
  });
}

function open_service(service_id) {
  $('#serviceInfoModal').modal('show');
  setTimeout(function() {
    $('#modalLoader').show();
  }, 200);
  $.post('/service',
  {
    service_id:service_id
  },
  function(data){
    $('#serviceInfoModal .modal-body').html(data['template']);
    setTimeout(function() {
      $('#modalLoader').fadeOut();
    }, 500);
  });
}

function open_bill(bill_id) {
  $('#billInfoModal').modal('show');
  setTimeout(function() {
    $('#modalLoader').show();
  }, 200);
  $.post('/bill',
  {
    bill_id:bill_id
  },
  function(data){
    $('#billInfoModal .modal-body').html(data['template']);
    setTimeout(function() {
      $('#modalLoader').fadeOut();
    }, 500);
  });
}

function open_user(user_id) {
  $('#userInfoModal').modal('show');
  setTimeout(function() {
    $('#modalLoader').show();
  }, 200);
  $.post('/user',
  {
    user_id:user_id
  },
  function(data){
    $('#userInfoModal .modal-body').html(data['template']);
    setTimeout(function() {
      $('#modalLoader').fadeOut();
    }, 500);
  });
}

function process_transaction(transaction_id) {
  $('#'+transaction_id+'ActionButton').button('loading');
  $.post('/transaction/process',
  {
    transaction_id:transaction_id
  },
  function(data){
    if (data['status']='success') {
      $('#'+transaction_id+'EntryRight').html(data['template']);
      $('#'+transaction_id+'ActionButton').button('complete');
    }
    else {
      $('#ErrorSnackbar .snackbar-message').html(data['message']);
      $('#ErrorSnackbar').fadeIn();
      setTimeout(function() {
        $('#ErrorSnackbar').fadeOut();
      }, 4000);
    }
  });
}

function done_transaction(transaction_id) {
  $('#'+transaction_id+'ActionButton').button('loading');
  $.post('/transaction/done',
  {
    transaction_id:transaction_id
  },
  function(data){
    if (data['status']='success') {
      $('#'+transaction_id+'EntryRight').html(data['template']);
      $('#'+transaction_id+'ActionButton').button('complete');
    }
    else {
      $('#ErrorSnackbar .snackbar-message').html(data['message']);
      $('#ErrorSnackbar').fadeIn();
      setTimeout(function() {
        $('#ErrorSnackbar').fadeOut();
      }, 4000);
    }
  });
}

function finish_transaction(transaction_id) {
  $('#'+transaction_id+'ActionButton').button('loading');
  $.post('/transaction/pickup',
  {
    transaction_id:transaction_id
  },
  function(data){
    if (data['status']='success') {
      if (data['total_entries'] == 1) {
        $('#activeCount').html(data['total_entries'].toString() + ' Item')
      }
      else {
        $('#activeCount').html(data['total_entries'].toString() + ' Items')
      }
      $('#'+transaction_id+'ActionButton').button('complete');
      $('#'+transaction_id+'.entry').fadeOut();
    }
    else {
      $('#ErrorSnackbar .snackbar-message').html(data['message']);
      $('#ErrorSnackbar').fadeIn();
      setTimeout(function() {
        $('#ErrorSnackbar').fadeOut();
      }, 4000);
    }
  });
}

function save_service() {
  $('#saveServiceBtn').button('loading');
  service_name = $('#addServiceName').val();
  service_price = $('#addServicePrice').val();
  $.post('/service/save',
  {
    service_name:service_name,
    service_price:service_price
  },
  function(data){
    $('#settingsContent').html(data['template']);
    $('#addTransactionServiceContainer').html(data['transaction_template']);
    $('#saveServiceBtn').button('complete');
    $('#addServiceModal').modal('hide');
  });
}

function edit_service() {
  $('#editServiceBtn').button('loading');
  service_name = $('#editServiceName').val();
  service_price = $('#editServicePrice').val();
  $.post('/service/edit',
  {
    service_name:service_name,
    service_price:service_price
  },
  function(data){
    $('#settingsContent').html(data['template']);
    $('#addTransactionServiceContainer').html(data['transaction_template']);
    $('#editServiceBtn').button('complete');
    $('#serviceInfoModal').modal('hide');
    $('#successSnackbar').find('.snackbar-message').html(data['message']);;
    $('#successSnackbar').fadeIn();
    setTimeout(function() {
      $('#successSnackbar').fadeOut();
    }, 4000);
  });
}

function reset_password() {
  $('#resetPasswordBtn').button('complete');
  password = $('#resetPasswordText').val();
  $.post('/user/password/reset',
  {
    password:password
  },
  function(data){
    $('#resetPasswordModal .form-control').change();
    $('#resetPasswordModal .form-control').val('');
    $('#resetPasswordModal .error-icon-container').addClass('hidden');
    $('#resetPasswordModal .form-control').css('border','1px solid #ccc');
    $('#resetPasswordBtn').button('complete');
    $('#resetPasswordModal').modal('hide');
    $('#successSnackbar .snackbar-message').html('Password successfully reset.');
    $('#successSnackbar').fadeIn();
    setTimeout(function() {
      $('#successSnackbar').fadeOut();
    }, 4000);
  });
}

function reset_user_password() {
  $('#resetUserPasswordBtn').button('complete');
  password = $('#resetPasswordText').val();
  $.post('/user/password/reset/logged_in',
  {
    password:password
  },
  function(data){
    $('#resetPasswordModal .form-control').change();
    $('#resetPasswordModal .form-control').val('');
    $('#resetPasswordModal .error-icon-container').addClass('hidden');
    $('#resetPasswordModal .form-control').css('border','1px solid #ccc');
    $('#resetUserPasswordBtn').button('complete');
    $('#resetPasswordModal').modal('hide');
    $('#successSnackbar .snackbar-message').html('Password successfully reset.');
    $('#successSnackbar').fadeIn();
    setTimeout(function() {
      $('#successSnackbar').fadeOut();
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
    $('#settingsContent').html(data['template']);
    $('#editUserBtn').button('complete');
    $('#userInfoModal').modal('hide');
    $('#successSnackbar').find('.snackbar-message').html(data['message']);;
    $('#successSnackbar').fadeIn();
    setTimeout(function() {
      $('#successSnackbar').fadeOut();
    }, 4000);
  });
}

function change_password() {
  $('#changePasswordModal').modal({
    backdrop: 'static',
    keyboard: false
  });
}

function validate_password(element,value) {
  error_icon_id = $(element).attr('data-error');
  if ((value != '') && (value.length >= 8)) {
    $(element).css("border", "1px solid #ccc");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
}

function validate_password_confirm(element,value) {
  error_icon_id = $(element).attr('data-error');
  password = $('#changePasswordText').val();
  password_confirm = $('#changePasswordConfirmText').val();
  if (password == password_confirm) {
    $(element).css("border", "1px solid #ccc");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
}

function validate_temp_pass(element,value) {
  error_icon_id = $(element).attr('data-error');
  password = $('#addUserPassword').val();
  password_confirm = $('#addUserPasswordConfirm').val();
  if (password == password_confirm) {
    $(element).css("border", "1px solid #ccc");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
}

function validate_password_reset(element,value) {
  error_icon_id = $(element).attr('data-error');
  password = $('#resetPasswordText').val();
  password_confirm = $('#resetPasswordConfirmText').val();
  if (password == password_confirm) {
    $(element).css("border", "1px solid #ccc");
    $('#'+error_icon_id).addClass('hidden');
    $('#'+error_icon_id).addClass('tooltip');
  }
  else {
    $(element).css("border", "1px solid #d9534f");
    $('#'+error_icon_id).removeClass('hidden');
    $('#'+error_icon_id).removeClass('tooltip');
  }
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
    $('#settingsContent').html(data['template']);
    $('#addUserModal').modal('hide');
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
      $('#successSnackbar').find('.snackbar-message').html(data['message']);;
      $('#successSnackbar').fadeIn();
      setTimeout(function() {
        $('#successSnackbar').fadeOut();
      }, 4000);
    }
    else {
      $('#ErrorSnackbar .snackbar-message').html(data['message']);
      $('#ErrorSnackbar').fadeIn();
      $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
      setTimeout(function() {
        $('#ErrorSnackbar').fadeOut();
      }, 4000);
    }
    $('#savePasswordBtn').button('complete');
  });
}

function delete_user() {
  $('#deleteUserBtn').button('loading');
  $.post('/user/delete',
  function(data){
    $('#settingsContent').html(data['template']);
    $('#deleteUserBtn').button('complete');
    $('#editUserModal').modal('hide');
    $('#deleteUserModal').modal('hide');
    $('#userInfoModal').modal('hide');
    $('#successSnackbar .snackbar-message').html('User successfully deleted.');
    $('#successSnackbar').fadeIn();
    setTimeout(function() {
      $('#successSnackbar').fadeOut();
    }, 4000);
  });
}

function upload_file() {
  var form_data = new FormData($('#uploadFileForm')[0]);
  $.ajax({
      type: 'POST',
      url: '/bill/receipt/upload',
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: false,
      success: function(data) {
        $('#billInfoModal .modal-body').html(data['template']);
      },
  });
}