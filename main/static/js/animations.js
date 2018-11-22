$(document).ready(function(){

$('.destination').height($('.destination').width()+100);
  
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

});