chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var tabid = sender.tab.id;
    var custom_message = message.shaon_message;
    
    if(custom_message=='closetab'){
    	chrome.tabs.remove(tabid);
    	//sendResponse({shaon_response:'my response'})
    }
    
});