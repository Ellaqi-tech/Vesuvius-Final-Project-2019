window.onload = function() {
  $(".country_loc").click(function(){
    $(".country_loc").removeClass("selected");
    $(this).addClass("selected");
    $('.region').hide();
    $('.region').eq($('.country_loc').index(this)).show();
  });

  $(".volcano").click(function(){
    $(".volcano").removeClass("selected");
    $(this).addClass("selected");
    $('.location_info').hide();
    $('.location_info').eq($('.volcano').index(this)).show();
  });
}
