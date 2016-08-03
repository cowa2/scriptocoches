$(document).ready(function() {
	var storage = chrome.storage.sync;
	
	// Load saved settings at the beginning, if any
	storage.get("ignoredThreads", function(item) {
		if (item != undefined && item != null && item.ignoredThreads.length > 0) {
			$("#ignored-thread-list").val(item.ignoredThreads);
			console.log("[debug] Ignored threads list loaded: \""+item.ignoredThreads+"\"");

			hideIgnoredThreads(item.ignoredThreads);
		}
	});





	// Bind events ------------------------------------------------------

	// Save current ignored thread list when clicking the button
	$("#save-settings-button").click(function() {
		var ignoredThreads = $("#ignored-thread-list").val();

		storage.set({"ignoredThreads": ignoredThreads}, function() {
			console.log("[debug] Ignored threads list saved: \""+ignoredThreads+"\"");
		});
	});




});

function hideIgnoredThreads(ignoredThreadList) {
	console.log("[debug][hideIgnoredThreads]");

	var splittedIgnoredThreadList = ignoredThreadList.split("\n");

	console.log($("td[id^='td_threadtitle_']"))

	// Loop through every thread title
	$("td[id^='td_threadtitle_']").each(function() {
		var threadTitle = $(this).find("a[id^='thread_title_']").text();

		// Check title against every single ignored word
		for (var i = 0; i < splittedIgnoredThreadList.length; i++) {
			console.log("[debug][hideIgnoredThreads] Checking thread title \""+threadTitle+"\" against ignored word \""+splittedIgnoredThreadList[i]+"\"...");
			if (threadTitle.toLowerCase().indexOf(splittedIgnoredThreadList[i].toLowerCase()) !== 1) {
				console.log("[debug][hideIgnoredThreads] Ignored thread: \""+threadTitle+"\"");
				break;
			}
		}




		
	});


	console.log("[debug][/hideIgnoredThreads]");
}