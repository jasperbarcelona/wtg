function login(){
  $('#login-form-loader').show();
  $('#login-btn').button('loading');
  user_email = $('#user_email').val();
  user_password = $('#user_password').val();
  $.post('/user/admin/authenticate',{
  	user_email:user_email,
  	user_password:user_password
  },
  	function(data){
	  	if (data['status'] == 'failed'){
        $('#login-error-container').show();
	  		$('#login-error').html(data['error']);
	  		$('#login-form-loader').hide();
        $('#login-btn').button('complete');
	  	}
	   	else{
	   		$(location).attr('href', '/adminpanel');
	   	}
  });
}

function go_to_signup() {
  $('#goto-signup-btn').button('loading');
  $.post('/signup',
  function(data){
    $('.form-container').html(data);
    $('#goto-signup-btn').button('complete');
  });
}

function go_to_login() {
  $('#goto-login-btn').button('loading');
  $.post('/login/template',
  function(data){
    $('.form-container').html(data);
    $('#goto-login-btn').button('complete');
  });
}

function sign_up() {
  $('#signup-btn').button('loading');
  name = $('#name').val();
  email = $('#user_email').val();
  msisdn = $('#msisdn').val();
  password = $('#user_password').val();
  confirm_password = $('#user_password_confirm').val();
  $.post('/user/signup',
    {
      name:name,
      email:email,
      msisdn:msisdn,
      password:password,
      confirm_password:confirm_password
    },
  function(data){
    $('.form-container').html(data);
    $('#svc').focus();
    $('#signup-btn').button('complete');
  });
}

function verify_svc() {
  $('#svc-error').addClass('hidden');
  $('#svc-btn').button('loading');
  svc = $('#svc').val();
  $.post('/svc/verify',
    {
      svc:svc
    },
  function(data){
    if (data['status'] == 'success') {
      $(location).attr('href', '/');
    }
    else {
      $('#svc').val('');
      $('#svc').focus();
      $('#svc-error').removeClass('hidden');
      $('#svc-btn').button('complete');
    }
  });
}