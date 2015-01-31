$(document).ready(function(){
  $('#mainHeight').css('min-height', $(window).outerHeight(true) - $('#nav').outerHeight(true) + "px");
  $('#contentHeight').css('min-height', $('#mainHeight').outerHeight(true) - $('#footer').outerHeight(true) + 70 + "px");
});