window.jQuery = require('../components/jquery/dist/jquery.min');
window.$ = window.jQuery
window.Tether = require('../components/tether/dist/js/tether');

var bootstrap = require('../components/bootstrap/dist/js/bootstrap');

$(function() {
  $('.dropdown-toggle').dropdown();

  $('ul.nav li.dropdown').hover(function() {
    if(+$('body').width() > 992) {
      $(this).addClass('active');
    }
  }, function() {
    if(+$('body').width() > 992) {
      $(this).removeClass('active')
    }
  });
});
