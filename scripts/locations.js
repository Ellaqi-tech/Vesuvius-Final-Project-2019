//function to execute once the page is loaded
window.onload = function() {
  //set a function to display the corresponding country locations when a country element is clicked
  $(".country_loc").click(function(){
    //reset the selected class if it is already on any of the countries
    $(".country_loc").removeClass("selected");
    //set the selected class to the clicked country element
    $(this).addClass("selected");
    //reset the region locations being displayed, if they are already displayed
    $('.region').hide();
    //set the region locations being displayed to the corresponding index number of the region
    $('.region').eq($('.country_loc').index(this)).show();
  });
  //do literally the same as above, but for clicking the location to show the location info
  $(".volcano").click(function(){
    $(".volcano").removeClass("selected");
    $(this).addClass("selected");
    $('.location_info').hide();
    $('.location_info').eq($('.volcano').index(this)).show();
  });
}
