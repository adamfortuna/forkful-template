window.jQuery = require('../components/jquery/dist/jquery.min');
window.$ = window.jQuery
window.Tether = require('../components/tether/dist/js/tether');

var bootstrap = require('../components/bootstrap/dist/js/bootstrap');

$(function() {
  $('.dropdown-toggle').dropdown();

  $('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).fadeIn(200);
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).fadeOut(200);
  });
});
