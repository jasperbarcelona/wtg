$(document).ready(function(){
  
$(window).load(function(){
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
});

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

$('.active-entry-right').on('click', function () {
  $('.active-entry-action-container').removeClass('visible');
  $(this).find('.active-entry-action-container').addClass('visible');
});

$('.close-action-icon').on('click', function (e) {
  e.stopPropagation();
  $('.active-entry-action-container').removeClass('visible');
});

$('.fixed-action-btn').floatingActionButton();


var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

$('.typeahead').on('typeahead:selected', function(evt, item) {
  
});

});