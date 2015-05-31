function loadTabsInfo() {
	// Get All the tabs opened in the browser
	chrome.tabs.query({}, function (tabs) {
		for (var index = 0; index < tabs.length; index++) {
			var tab = tabs[index];
			
			// Cross
			var tdCrossIcon = $('<td/>').addClass('tabs-link-img-td-common tabs-link-img-cross');
			var img_cross = $('<img/>').attr('src', 'icons/crossicon16.png').addClass('tabs-link-img-common');
			tdCrossIcon.append(img_cross);	
			
			// Icon 		
			var tdFavIcon = $('<td/>').addClass('tabs-link-img-td-common');
			var img_favicon = $('<img/>').attr('src', tab.favIconUrl).addClass('tabs-link-img-common');
			tdFavIcon.append(img_favicon);	
			
			// Title		
			var tdTabTitle = $('<td/>').text(tab.title).addClass('tabs-link-title').attr('title', tab.url);
			
			// Current Selected Tab
			if (tab.active) {
				tdTabTitle.addClass('makeTextBold');
			}

			var tr = $('<tr/>').attr('tab-id', tab.id).addClass('tabs-link-row');

			tr.append(tdCrossIcon);
			tr.append(tdFavIcon);
			tr.append(tdTabTitle);

			$("#activeTabsInPopUpPage").append(tr);
		}
	});
}

// Call functions when the extension popup dom is loaded
document.addEventListener('DOMContentLoaded', function () {
	loadTabsInfo();
	
	// On Click event on the table row
	$("table").delegate(".tabs-link-title", "click", function () {
		var tab_id = $(this).parent("tr").attr('tab-id');
		// On click make the tab active
		chrome.tabs.update(parseInt(tab_id), { active: true });
	});
    
	// On Click event on the cross icon
	$("table").delegate(".tabs-link-img-cross", "click", function () {
		var tab_id = $(this).parent("tr").attr('tab-id');
		// On click close the tab
		chrome.tabs.remove(parseInt(tab_id));
		// Also remove from the table shown to user
		$(this).parent("tr").remove();
	});
	
});