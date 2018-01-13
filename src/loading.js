//loadingLogo

$(window).on('load', function() {
  setTimeout(function(){
    $('.loadingLogo').fadeOut("normal");
    $('body').css({"overflow-y":"auto"});
  }, 500);
});
