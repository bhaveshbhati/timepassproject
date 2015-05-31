function loadTabsInfo() {
	// Get All the tabs opened in the browser
	chrome.tabs.query({}, function(tabs) {
		for (var index = 0; index < tabs.length; index++) {
			var tab = tabs[index];
			
			// Icon 		
			var tdFavIcon = $('<td/>');
			var img = $('<img/>').attr('src', tab.favIconUrl).addClass('tabs-link-img');
			tdFavIcon.append(img);	
			
			// Title		
			var tdTabTitle = $('<td/>').text(tab.title);
			
			// Current Selected Tab
			if(tab.active) {
				tdTabTitle.addClass('makeTextBold');
			}
			
			var tr = $('<tr/>').attr('tab-id', tab.id);
			
			tr.append(tdFavIcon);
			tr.append(tdTabTitle);
			
			$("#activeTabsInPopUpPage").append(tr);	
		}
	});
}

// Call functions when the extension popup dom is loaded
document.addEventListener('DOMContentLoaded', function() {
	loadTabsInfo();
});