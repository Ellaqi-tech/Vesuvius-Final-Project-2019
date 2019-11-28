
$(document).ready(function() {
	careersLoad();
});

function careersLoad() {
	$(".job-content").hide();
	
	var toggleSpeed = 1000;
	$(".quick-search-jobs").click(function() {
				
		//Move all the content up (Hide it)
		$(".job-content").slideUp(toggleSpeed);		

		//If the content is hidden (This means if the user click on the same quick search jobs don't show it just keep it hidden)
		if ($("#" + ($(this).attr("id")) + "-content").css("display") === "none") {
			//Show the content
			$("#" + ($(this).attr('id')) + "-content").show(toggleSpeed);
		}
		
		//Filter the result list
		$("#result-job-list li").hide();
		//Resturant or Corporate Content
		if ($(this).attr("id") !== "search-job") {
			//For each li in the list do the following commands
			$("#" + ($(this).attr("id")) + "-content ul li").each(function(idx, li) {
				
				//This create a Regex for each li element in the list Ex. Chef
				var regexQuickSearch = new RegExp(".*" + $(li).text() + ".*", "i");
				
				//Call function to Show any job that pass the regex
				SearchJobFilter(regexQuickSearch);
				
			});
		}
		//Search Content
		else {
			//Clear the input field
			$("#search-job-input").val("");			
			var regexQuickSearch = new RegExp(".*" + $("#search-job-input").val() + ".*", "i");
			//Call function to Show any job that pass the regex
			SearchJobFilter(regexQuickSearch);
		}
		
	});
	
	//If user click on search-job-button (The Search Careers button)
	$("#search-job-button").click(function() {
		$("#result-job-list li").hide();
		//Get the user input as the regex
		var regexSearchInput = new RegExp(".*" + $("#search-job-input").val() + ".*", "i");
		//Call function to Show any job that pass the regex
		SearchJobFilter(regexSearchInput);
	});
	
	//Function to filter the result job list 
	//Show all job that pass the regex
	function SearchJobFilter(regex) {
		//Loop through all elements in the result job list
		$("#result-job-list li").each(function(idx, li) {
			//Get the job name
			var job = $(li);
			//If it pass the regex then
			if(regex.test(job.find("p").text())) {
				//Show the job in the result list
				job.show();
			}
		});
	}
	
	//Hide all the detail info. of the jobs
	$(".result-job-detail").hide();
	
	//If the user clicks on a job then show the detail of that job
	$(".result-job-list-item").click(function() {
		//Move all the content up to hide all job detail
		$(".result-job-detail").slideUp(toggleSpeed);		

		//If the content is hidden (This means if the user click on the same job don't show it just keep it hidden)
		if ($(this).find($(".result-job-detail")).css("display") === "none") {
			$(this).find($(".result-job-detail")).show(toggleSpeed);
		}		
	});
	
}