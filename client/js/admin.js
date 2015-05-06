$(document).ready(function () {
  $('#mainHeight').css('min-height', $(window).outerHeight(true) - $('#nav').outerHeight(true) + "px");

  $('#contentHeight').css('min-height', $('#mainHeight').outerHeight(true) - $('#footer').outerHeight(true) + 70 + "px");

  if ($(window).width() > 740) {
    $('#menu').css('min-height', $('#mainHeight').outerHeight(true) + 20 + "px");
  }

  $('#contentBtn').click(function () {
    $("#menu").slideToggle();
  });

  $('#client').popover(
    {
      html: true // 为true的话，data-content里就能放html代码了
    }
  );
});
