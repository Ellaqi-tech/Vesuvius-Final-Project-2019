window.onload = function() {
  // $(".italy").click(function(){
  //   $(".country").removeClass("selected");
  //   $(".italy").addClass("selected");
  //   $('.region').hide();
  //   $('.italy_locations').show();
  // });
  // $(".hawaii").click(function(){
  //   $(".country").removeClass("selected");
  //   $(".hawaii").addClass("selected");
  //   $('.region').hide();
  //   $('.hawaii_locations').show();
  // });
  // $(".greece").click(function(){
  //   $(".country").removeClass("selected");
  //   $(".greece").addClass("selected");
  //   $('.region').hide();
  //   $('.greece_locations').show();
  // });

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
