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