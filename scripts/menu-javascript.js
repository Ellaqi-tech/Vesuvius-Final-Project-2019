
jQuery(document).ready(function() {
    menuLoad()
});
function menuLoad() {
    //Changing the main picture
    $('#appetizer').hover(
        function(){$('#main-picture').attr('src','image/big-appetizer.jpg');}
    );        
    $('#main-course').hover(
        function(){$('#main-picture').attr('src','image/big-main-course.jpg');}      
    );
    $('#brunch').hover(
        function(){$('#main-picture').attr('src','image/big-brunch.jpg');}    
    );
    $('#dessert').hover(
        function(){$('#main-picture').attr('src','image/big-dessert.jpg');}      
    );
    $('#drink').hover(
        function(){$('#main-picture').attr('src','image/big-drink.jpg');}     
    );
    //Display the menu
    $('#appetizer').click(function() {
        $('#appetizer-list').show(2000);
    });
    $('#main-course').click(function() {
        $('#main-dish-list').show();
    });
    $('#brunch').click(function() {
        $('#brunch-list').show();
    });
    $('#dessert').click(function() {
        $('#dessert-list').show(2000);
    });
    $('#drink').click(function() {
        $('#drink-list').show();
    });
}