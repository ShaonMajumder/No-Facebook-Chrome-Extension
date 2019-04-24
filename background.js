chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var tabid = sender.tab.id;
    var custom_message = message.shaon_message;
    
    if(custom_message=='closetab'){
    	chrome.tabs.remove(tabid);
    	//sendResponse({shaon_response:'my response'})
    }else if(custom_message=='settingstab'){
    	var url = message.urltab;
    	chrome.tabs.remove(tabid);
    	chrome.tabs.create({url: url});
    	//sendResponse({shaon_response:'my response'})
    }
});

/*
get url from id
chrome.tabs.get(tab_id, function(tab){
    url = tab.url;
});

*/