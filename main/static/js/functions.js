function show_destinations() {
  $('#contentLoader').removeClass('hidden');
  $('.nav-item').removeClass('active');
  $('#navDestinations').addClass('active');
  $.get('/adminpanel/destinations',
  function(data){
    $('.admin-content').html(data);
    $('#contentLoader').addClass('hidden');
  });
}

function save_destination_info() {
	$('#saveDestinationInfoBtn').button('loading');

	name = $('#addDestinationName').val();
	desc = $('#addDestinationDesc').val();
	address = $('#addDestinationAddress').val();
	city = $('#addDestinationCity').val();
	link = $('#addDestinationLink').val();

	$.post('/adminpanel/destination/save',
	{
		name:name,
		desc:desc,
		address:address,
		city:city,
		link:link
	},
	function(data){
		$('.admin-content').html(data['template']);
		$('#addDestinationInfoModal').modal('hide');
		$('#saveDestinationInfoBtn').button('complete');
		setTimeout(function() {
			$('#saveDestinationInfoBtn').attr('disabled', true);
		}, 200);
	});
}

function show_destination(destination_id) {
	$.post('/adminpanel/destination/info',
	{
		destination_id:destination_id
	},
	function(data){
		$('.admin-content').html(data['template']);
	});
}