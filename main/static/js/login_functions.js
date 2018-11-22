function login(){
  $('#login-form-loader').show();
  $('#login-btn').button('loading');
  client_no = $('#client_no').val();
  user_email = $('#user_email').val();
  user_password = $('#user_password').val();
  $.post('/user/authenticate',{
    client_no:client_no,
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
	   		$(location).attr('href', '/');
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
  name = $('addUserName').val();
  email = $('addUserEmail').val();
  msisdn = $('addUserMsisdn').val();
  password = $('addUserPassword').val();
  confirm_password = $('addUserConfirmPassword').val();

  $('#signup-btn').button('loading');
  $.post('/signup',
    {
      name:name,
      email:email,
      msisdn:msisdn,
      password:password,
      confirm_password:confirm_password
    },
  function(data){
    $('.form-container').html(data);
    $('#signup-btn').button('complete');
  });
}