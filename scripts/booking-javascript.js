//alert("hey");
jQuery(document).ready(function() {
    jQuery('p').hide();
    jQuery('h2').click(function() {
        $(this).next('p').fadeToggle("5000");
    });
});