$(document).ready(function(){
  
/*$(window).load(function(){
  check_upload_progress();
  setTimeout(function() {
    $('#mainPreloader').fadeOut();
  }, 3000);
});*/
$('.snackbar').hide();

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

});