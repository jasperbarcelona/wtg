$(document).ready(function(){

$('#login-error-container').hide();

$(window).load(function() {
	$("#user_email").focus();
    $('#login-intro').hide();
});

$('#login-form').on('submit', function(e){
      e.preventDefault();
      login();
  });

})
