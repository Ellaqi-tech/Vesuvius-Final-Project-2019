
$(document).ready(function() {
	contactUsLoad();
});

function contactUsLoad() {
	//Show the form when user click on the button
	$("#contact-form-request").click(function() {
		$("#contact-form").css("display", "inline-block");
		$(this).css("display", "none");
	});
	
	//When user pick on a country have the region option available
	$("#restaurant-country").change(function() {
		//Enable all option related to the country
		if (!($("#restaurant-country").val() === "none")) {
			$("#restaurant-region").prop("disabled", false);
			$("#restaurant-region option").each(function()
			{
				//Show the correct region for that specific country
				if ($(this).attr('class') === ($("#restaurant-country").val() + "-option")) {
					$(this).css("display", "inline-block");
				}
				//Otherwise hide the options (region not in that country)
				else {
					$(this).css("display", "none");
				}
			});
		}
		else {
			//Reset the options
			$("#restaurant-region").prop("disabled", true);
			$("#restaurant-region").prop('selectedIndex', 0);
		}
	});
	
	//Add Date Picker to that input field
	$("#visit-day").datepicker();	
		
	//Validate the form when user clicks on Submit
	$("#contact-form").on('submit', processContactForm);
	
	//Validation when user hits the submit button
	function processContactForm() {
		//Reset the error message
		$("#form-error-message").html("");
		
		//Validate the restaurant country
		if ($("#restaurant-country").val() === "none") {
			$("#restaurant-country").focus();
			$("#form-error-message").html("Please enter a valid country!");
			return false;
		}
		//Validate the restaurant region
		if ($("#restaurant-region").val() === "none") {
			$("#restaurant-region").focus();
			$("#form-error-message").html("Please enter a valid region!");
			return false;
		}
		
		//Only if the user does not have a valid input (mm/dd/yyyy)
		var regexDay = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/i;
		if ($("#visit-day").val() !== "" && !regexDay.test($("#visit-day").val())) {
			$("#visit-day").focus();
			$("#form-error-message").html("Please enter a valid day!");
			return false;
		}
		
		//Only if the user does not have a valid input (--: -- AM/PM)
		//The value in the visit time is in 24 hour value meaning the AM/PM will convert the value
		var regexTime = /^(([01][1-9])|2[0-3]):(0[1-9]|([0-5][0-9]))$/i;
		if ($("#visit-time").val() !== "" && !regexTime.test($("#visit-time").val())) {
			$("#visit-time").focus();
			$("#form-error-message").html("Please enter a valid time!");
			return false;
		}		
		
		//Validate the visit type (Not needed due to it is a drop down list and it is not required). The commented it code will allow you to check if we wanted to make it check.
		/*
		if ($("#visit-type").val() === "none") {
			$("#visit-type").focus();
			$("#form-error-message").html("Please enter a valid visit type!");
			return false;
		}
		*/
		
		//Validate the user phone number
		var regexPhoneNumber = /^\d{3}[-\s]*\d{3}[-\s]*\d{4}$/i;
		if (!regexPhoneNumber.test($("#user-phone").val())) {
			$("#user-phone").focus();
			$("#form-error-message").html("Please enter a valid phone number!");
			return false;
		}
		
		//Only if the user does not have a valid input
		//Validate the user email
		var regexEmail = /^\w+.\w+@\w+.com$/i;
		if (!regexEmail.test($("#user-email").val()) && $("#user-email").val() !== "") {
			$("#user-email").focus();
			$("#form-error-message").html("Please enter a valid email address!");
			return false;
		}
		
		//Pass the validation
		return true;
	}
}
