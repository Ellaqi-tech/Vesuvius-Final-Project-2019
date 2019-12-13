
$(document).ready(function() {
	careersLoad();
});

var Job = {
	name: "",
	jobLocation: "",
	salary: "",
	id: -1,
	description: "",
	requirement: ""
}

function NewJob(name, jobLocation, salary, id, description, requirement) {
	var newJob = Object.assign({}, Job);
	newJob.name = name;
	newJob.jobLocation = jobLocation;
	newJob.salary = salary;
	newJob.id = id;
	newJob.description = description;
	newJob.requirement = requirement;
	return newJob;
}

function careersLoad() {
	
	//This will load all the jobs
	var jobList = [];
	LoadJobs();
	function LoadJobs() {
		jobList.push(NewJob("Waiter", "Vesuvius", "$20.00/hour", 1, "Take customer requests, help out where needed.", "High School Diploma"));
		jobList.push(NewJob("Developer", "Stromboli", "$30.00/hour", 2, "We are looking for someone who is equal parts planner, problem solver, and analytical thinker.", "College Diploma"));
		jobList.push(NewJob("Contact", "Kilauea", "$25.00/hour", 3, "Take phone calls, and resolve any issue from customer request", "College Diploma"));
		jobList.push(NewJob("Chef", "Vesuvius", "$30.00/hour", 4, "Work with Corporate Head Chef on menu development and food procurement", "College Diploma"));
		jobList.push(NewJob("Developer", "Vesuvius", "$35.00/hour", 5, "We are looking for someone who is equal parts planner, problem solver, and analytical thinker", "University Degree"));		
		ShowJobs();
	}
	
	function ShowJobs() {
		var resultJobListResult = "";
		for (var i = 0; i < jobList.length; i++) {
			resultJobListResult += "<li class=\"result-job-list-item flex-container\">";
			//Get the name
			resultJobListResult += "<p>Job Name: " + jobList[i].name + "</p>";
			//Get the location
			resultJobListResult += "<p>Location: " + jobList[i].jobLocation + "</p>";
			//Get the salary
			resultJobListResult += "<p>Salary: " + jobList[i].salary + "</p>";
			//Get the Job ID
			resultJobListResult += "<p class=\"result-job-id\">Job ID: " + jobList[i].id + "</p>";
			//Get the description
			resultJobListResult += "<p class=\"result-job-detail\">Description: " + jobList[i].description + "</p>";
			//Get the Reguirement
			resultJobListResult += "<p class=\"result-job-detail\">Requirement: " + jobList[i].requirement + "</p>";				
			resultJobListResult += "</li>";
		}
		$("#result-job-list").html(resultJobListResult);
	}
	
	//The code below was attempt to use AJAX for opening a XML file
	/*
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var xmlDoc = xhr.responseXML;
				var resultJobListResult = "";
				
				var xmlItems = xmlDoc.getElementsByTagName("job");
				for (var i = 0; i < xmlItems.length; i++) {
					resultJobListResult += "<li class=\"result-job-list-item flex-container\">";
					//Get the name
					resultJobListResult += "<p>Job Name: " + xmlItems[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + "</p>";
					//Get the location
					resultJobListResult += "<p>Location: " + xmlItems[i].getElementsByTagName("location")[0].childNodes[0].nodeValue + "</p>";
					//Get the salary
					resultJobListResult += "<p>Salary: " + xmlItems[i].getElementsByTagName("salary")[0].childNodes[0].nodeValue + "</p>";
					//Get the Job ID
					resultJobListResult += "<p class=\"result-job-id\">Job ID: " + xmlItems[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + "</p>";
					//Get the description
					resultJobListResult += "<p class=\"result-job-detail\">Description: " + xmlItems[i].getElementsByTagName("description")[0].childNodes[0].nodeValue + "</p>";
					//Get the Reguirement
					resultJobListResult += "<p class=\"result-job-detail\">Reguirement: " + xmlItems[i].getElementsByTagName("requirement")[0].childNodes[0].nodeValue + "</p>";				
					resultJobListResult += "</li>";
				}
				$("#result-job-list").html(resultJobListResult);
			}
			else {
				console.log("Connection was unsuccessful");
			}
		}	
	}
	xhr.open("GET", "res/jobs.xml", true);
	xhr.send(null);
	*/
	
	
	$(".job-content").hide();
	
	var toggleSpeed = 1000;
	$(".quick-search-jobs").click(function() {
				
		//Move all the content up (Hide it)
		$(".job-content").slideUp(toggleSpeed);		

		//If the content is hidden (This means if the user click on the same quick search jobs don't show it just keep it hidden)
		if ($("#" + ($(this).attr("id")) + "-content").css("display") === "none") {
			//Show the content
			$("#" + ($(this).attr('id')) + "-content").show(toggleSpeed);
			//Hide all the result jobs list
			$("#result-job-list li").hide();
		}
		else {
			//Show all the result jobs list
			$("#result-job-list li").show();
		}
		
		//Filter the result list
		
		//Restaurant or Corporate Content
		if ($(this).attr("id") !== "search-job") {
			//For each li in the list do the following commands
			$("#" + ($(this).attr("id")) + "-content ul li").each(function(idx, li) {
				
				//This create a Regex for each li element in the list Ex. Chef, Dishwasher, and etc.
				var regexQuickSearch = new RegExp(".*" + $(li).text() + ".*", "i");
				
				//Call function to Show any job that pass the regex
				SearchJobFilter(regexQuickSearch);
				
			});
		}
		//Search Content
		else {
			//Clear the input field
			$("#search-job-input").val("");	
			//This create a Regex from the user input which is default it as empty
			var regexQuickSearch = new RegExp(".*" + $("#search-job-input").val() + ".*", "i");
			//Call function to Show any job that pass the regex
			SearchJobFilter(regexQuickSearch);
		}
		
	});
	
	//If the user click on the specific list elements of the Restaurant or Corporate content
	$(".job-content ul li").click(function() {
		//Hide all the result jobs list
		$("#result-job-list li").hide();
		//This create a Regex for the specific li element in the list Ex. Chef
		var regexQuickSearch = new RegExp(".*" + $(this).text() + ".*", "i");
		//Call function to Show any job that pass the regex
		SearchJobFilter(regexQuickSearch);
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