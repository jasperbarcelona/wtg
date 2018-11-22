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
