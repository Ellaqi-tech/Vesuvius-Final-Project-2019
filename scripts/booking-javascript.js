//alert("hey");
jQuery(document).ready(function() {
    bookingEventLoad()
});
function bookingEventLoad() {
    jQuery('.hidden').hide();
    jQuery('h2').click(function() {
        $(this).next('div').fadeToggle("5000");
    });
    $("#bookingdate").datepicker();
    
    var formHandle = document.forms[0];
    //console.log(formHandle);
    formHandle.onsubmit = processForm;
    function processForm () {
        //validate the date
        var bookingDate = formHandle.bookingdate;
        //console.log(bookingDate);
        var regexDate = /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/
        //This regex is retrieved from Reg Ex library, modified by Paul Tran for education purpose
        if (bookingDate.value === "" || bookingDate.value === null || !regexDate.test(bookingDate.value)) {
            bookingDate.focus();
            return false;
        }
        
        //validate dropdown list
        var bookingLocation = formHandle.bookinglocation;
        var bookingQuantity = formHandle.bookingquantity;
        
        if (bookingLocation.value === "none") { 
            bookingLocation.focus();              
            return false;
        }
               
         if (bookingQuantity.value === "none") {
            bookingQuantity.focus();
            return false;
        }
        //validate name
        var visitorFullName = formHandle.visitor_full_name;
        if (visitorFullName.value === "" || visitorFullName.value === null ) {
            visitorFullName.focus();
            return false;
        }
        //validate Phone number
        var regexPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        var visitorPhone = formHandle.visitor_phone;
        if (visitorPhone.value === "" || visitorPhone.value === null || !regexPhone.test(visitorPhone.value)) {
            visitorPhone.focus();
            return false;
        }
        
        
        //validate Email
        var regexEmail = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
        //This regex is retrieved from Reg Ex library, modified by Paul Tran for education purpose
        var visitorEmail = formHandle.visitor_email;        
        if (visitorEmail.value === "" || visitorEmail.value === null || !regexEmail.test(visitorEmail.value)) {
            visitorEmail.focus();
            return false;
        }
        return false;
    }
}
