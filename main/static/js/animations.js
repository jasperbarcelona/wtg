$(document).ready(function(){

$('.destination').height($('.destination').width()+130);

$(window).resize(function(){
  $('.destination').height($('.destination').width()+130);
});
  
$(window).load(function(){
  setTimeout(function() {
    $('#mainPreloader').fadeOut();
  }, 3000);
});

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

$('#menuToggleBtn').on('click', function () {
  if ($('#navigation').hasClass('open')) {
    $('#navigation').animate({'left':'-70%'},500);
    $('#navigation').removeClass('open');
  }
  else {
    $('#navigation').animate({'left':0},500);
    $('#navigation').addClass('open');
  }
});

$('#addDestinationInfoModal .form-control').on('keyup', function () {
  name = $('#addDestinationName').val();
  address = $('#addDestinationAddress').val();
  city = $('#addDestinationCity').val();
  map_link = $('#addDestinationLink').val();

  if ((name != '') && (address != '') && (city != '') && (map_link != '')) {
    $('#saveDestinationInfoBtn').attr('disabled', false);
  }
  else {
    $('#saveDestinationInfoBtn').attr('disabled', true);
  }
});

$('#addDestinationInfoModal').on('hidden.bs.modal', function () {
  $(this).find('.form-control').val('');
  $('#saveDestinationInfoBtn').attr('disabled', true);
});

var ctx = document.getElementById("topDestinationChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Destination 1", "Destination 2", "Destination 3", "Destination 4", "Destination 5", "Destination 6", "Destination 7", "Destination 8", "Destination 9", "Destination 10"],
        datasets: [{
            label: 'Rating',
            data: [5,5,4.7,4.6,4.2,4,4,3.9,3.7,3.5],
            backgroundColor: [
                'rgba(0,187,149, 0.8)',
                'rgba(0,187,149, 0.8)',
                'rgba(0,187,149, 0.8)',
                'rgba(0,187,149, 0.8)',
                'rgba(0,187,149, 0.8)',
                'rgba(0,187,149, 0.8)',
                'rgba(0,187,149, 0.8)',
                'rgba(0,187,149, 0.8)',
                'rgba(0,187,149, 0.8)',
                'rgba(0,187,149, 0.8)',
            ],
            borderColor: [
                'rgba(0,187,149, 1)',
                'rgba(0,187,149, 1)',
                'rgba(0,187,149, 1)',
                'rgba(0,187,149, 1)',
                'rgba(0,187,149, 1)',
                'rgba(0,187,149, 1)',
                'rgba(0,187,149, 1)',
                'rgba(0,187,149, 1)',
                'rgba(0,187,149, 1)',
                'rgba(0,187,149, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

});