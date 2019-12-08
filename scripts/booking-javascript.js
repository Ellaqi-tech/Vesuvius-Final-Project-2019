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
        var isValid = true;
        //validate the date
        var bookingDate = formHandle.bookingdate;
        //console.log(bookingDate);
        var regexDate = /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/
        //This regex is retrieved from Reg Ex library, modified by Paul Tran for education purpose
        if (bookingDate.value === "" || bookingDate.value === null || !regexDate.test(bookingDate.value)) {
            //bookingDateErr.innerHTML = "Please enter your date of visit";
            isValid= false;
            bookingDate.focus();
            
        }
        
        //validate dropdown list
        var bookingLocation = formHandle.bookinglocation;
        var bookingQuantity = formHandle.bookingquantity;
        var errorMsg = document.getElementById("error_message");
        errorMsg.innerHTML = "";
        
        if (bookingLocation.value === "none") {
            isValid= false;
            errorMsg.innerHTML += "<div>Please choose your prefered location</div>";
            bookingLocation.focus();              
            //return false;
        }
               
         if (bookingQuantity.value === "none") {
            isValid= false;
            errorMsg.innerHTML += "<div>Please specify the number of guests</div>";
            bookingQuantity.focus();
            //return false;
        }
        //validate name
        var visitorFullName = formHandle.visitor_full_name;
        if (visitorFullName.value === "" || visitorFullName.value === null ) {
            isValid= false;
            errorMsg.innerHTML += "<div>Please tell us your name</div>";
            visitorFullName.focus();
            //return false;
        }
        //validate Phone number
        var regexPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        var visitorPhone = formHandle.visitor_phone;
        if (visitorPhone.value === "" || visitorPhone.value === null || !regexPhone.test(visitorPhone.value)) {
            isValid= false;
            errorMsg.innerHTML += "<div>Please tell us your phone</div>";
            visitorPhone.focus();
            //return false;
        }
        
        
        //validate Email
        var regexEmail = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
        //This regex is retrieved from Reg Ex library, modified by Paul Tran for education purpose
        var visitorEmail = formHandle.visitor_email;        
        if (visitorEmail.value === "" || visitorEmail.value === null || !regexEmail.test(visitorEmail.value)) {
            isValid= false;
            errorMsg.innerHTML += "<div>Please tell us your email</div>";
            visitorEmail.focus();
            //return false;
        }
        //Confirm message
        var confirmMsg = document.getElementById("confirm_message");
        var confirmName = document.getElementById("confirm_name");
        var confirmDate = document.getElementById("confirm_date");
        var confirmRestaurant = document.getElementById("confirm_restaurant");
        var confirmQuantity = document.getElementById("confirm_bookingquantity");
        var confirmPhone = document.getElementById("confirm_phone");
        var confirmEmail = document.getElementById("confirm_email");
        console.log(confirmMsg);
        if (isValid) {
            formHandle.style.display = "none";
            confirmMsg.style.display = "block"
            confirmName.innerHTML = visitorFullName.value;
            confirmDate.innerHTML = bookingDate.value;
            confirmRestaurant.innerHTML = bookingLocation.options[bookingLocation.selectedIndex].text;
            confirmQuantity.innerHTML = bookingQuantity.value;
            confirmPhone.innerHTML = visitorPhone.value;    
            confirmEmail.innerHTML = visitorEmail.value;           
        }
       
        return false;
    }
}
