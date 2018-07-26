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

function process_transaction(transaction_id) {
  $('#'+transaction_id+'ActionButton').button('loading');
  $.post('/transaction/process',
  {
    transaction_id:transaction_id
  },
  function(data){
    if (status='success') {
      $('#'+transaction_id+'EntryRight').html(data['template']);
      $('#'+transaction_id+'ActionButton').button('complete');
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
    if (status='success') {
      $('#'+transaction_id+'EntryRight').html(data['template']);
      $('#'+transaction_id+'ActionButton').button('complete');
    }
  });
}

function finish_transaction(transaction_id) {
  $('#'+transaction_id+'ActionButton').button('loading');
  $('#'+transaction_id+'.entry').fadeOut();
  /*$.post('/transaction/done',
  {
    transaction_id:transaction_id
  },
  function(data){
    if (status='success') {
      $('#'+transaction_id+'EntryRight').html(data['template']);
      $('#'+transaction_id+'ActionButton').button('complete');
    }
  });*/
}