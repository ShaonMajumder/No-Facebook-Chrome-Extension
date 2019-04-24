
function reactivateFacebook(){
	//alert("Reactivating...");
	chrome.storage.sync.get(['enableMills'], function(result) {
		var com_t = compare_time({"enableMills":result.enableMills},'reactivate');
		if(com_t){
			alert('You can now again use facebook.');
			enableFBBrowsingSession();
		}else{
			alert('Wait 24 hours to again use facebook.');
			disableFBBrowsingSession();
		}
	});
	
	/*
	chrome.storage.sync.set({endMills: ''}, function() {
				  //alert('Value is set to ' + val);
				});
				
	chrome.storage.sync.set({enableMills: ''}, function() {
	  //alert('Value is set to ' + val);
	});
	*/
}

function closeFacebook(mode){
	if(mode == 'timeout'){
		alert("Congratulations to us - we have detected an idiot who is using accessive facebook.\nYour Punnishment: 10 Pushup\nCause: Accessive Facebook changes your neural activity.");		
	}else if(mode == 'setSettingFirst'){
		alert("Go to settings to set the time");
	}else if(mode == ''){
		alert("No Exit Message");
	}
	
	chrome.runtime.sendMessage({shaon_message:'closetab'},function(r){
	   //alert(r.shaon_response);
	});
}

function disableFBBrowsingSession(){
	chrome.storage.sync.set({enable: false}, function() {
		//alert('enable is set to ' + false);
	});

	//removing endMills, enableMills key from storage
	chrome.storage.local.get(null, function (items) {
	    for (var key in items) {
	        if (key=='endMills') {
	            chrome.storage.local.remove(key)
	        }
	        if (key=='enableMills') {
	            chrome.storage.local.remove(key)
	        }
	    }
	})

	closeFacebook('timeout');

	/*
	chrome.storage.sync.set({endMills: ''}, function() {
				  //alert('Value is set to ' + val);
				});
				
	chrome.storage.sync.set({enableMills: ''}, function() {
	  //alert('Value is set to ' + val);
	});
	*/
	//removing endMills, enableMills key from storage
	closeFacebook('timeout');
}

function compare_time(dic,mode){
	//alert("Compare function");
	if(mode == 'timeout'){
		var today = new Date();

		var NowMills = today.getTime();
		var endMills = dic["endMills"];
		var NowTimeObject = new Date(NowMills);
		var endTimeObject = new Date(endMills);
		
		//alert("Now - "+NowTimeObject.getHours()+":"+NowTimeObject.getMinutes()+":"+ NowTimeObject.getSeconds());
		//alert("End - "+endTimeObject.getHours()+":"+endTimeObject.getMinutes()+":"+endTimeObject.getSeconds());		
		
		if(NowTimeObject > endTimeObject){
			return true;
		}else{
			return false
		}	
	}else if(mode == 'reactivate'){
		var enableMills = dic["enableMills"];
		enableTimeObject = new Date(enableMills);
		var todayTimeObject = new Date();

		if(todayTimeObject > enableTimeObject){
			return true;
		}else{
			return false;
		}
	}
	

}


function enableFBBrowsingSession(){
	chrome.storage.sync.get(['usetimehour'], function(result) {
		var hour = result.usetimehour;
		chrome.storage.sync.get(['usetimeminute'], function(result) {
			var minute = result.usetimeminute;
			//alert('Minute currently is ' + minute);
		  	chrome.storage.sync.get(['usetimesecond'], function(result) {
				var second = result.usetimesecond;  
				//alert('Second currently is ' + second);

			  	var endTime = new Date();
				endTime.setHours(endTime.getHours() + parseInt(hour));
				endTime.setMinutes(endTime.getMinutes() + parseInt(minute));
				endTime.setSeconds(endTime.getSeconds() + parseInt(second));
				endMills = endTime.getTime();
				alert('You can browse up until ' + endTime.toString("dd "));

				var enableTime = new Date(endMills);
				enableTime.setHours(enableTime.getHours() + 24)
				enableMills = enableTime.getTime();
										
				
				chrome.storage.sync.set({endMills: endMills}, function() {
				  //alert('Value is set to ' + val);
				});
				
				chrome.storage.sync.set({enableMills: enableMills}, function() {
				  //alert('Value is set to ' + val);
				});

				chrome.storage.sync.set({enable: true}, function() {
					//alert('enable is set to ' + true);
				});


			});
		});
	});

	
}



//main routine
chrome.storage.sync.get(['enable'], function(result) {
	if(result.enable==undefined){
		chrome.storage.sync.get(['usetimehour'], function(result) {
			var hour = result.usetimehour;
			if(hour==undefined){
				alert("Set the Browsing time First !!!");
				//send to setting page
				var ext_url = chrome.extension.getURL("popup/choose_page.html")+'?reu='+window.location.href+'&setting_first=trues';
				chrome.runtime.sendMessage({shaon_message:'settingstab',urltab:ext_url},function(r){/*alert(r.shaon_response);*/});
			}else{
				//enable session
				enableFBBrowsingSession();
			}
		});
	}else if(result.enable==true){
		//alert('Time Running');
		chrome.storage.sync.get(['endMills'], function(result) {
			var endMills = result.endMills
			var com_t = compare_time({"endMills":endMills},'timeout');
			if(com_t){
				alert("Time up for Today, Last time was allowed untill - "+Date(endMills).toString(""));
				disableFBBrowsingSession();
			}else{
				alert('Continue Browsing');
			}
		});
		
	}else if(result.enable==false){
		//Trying reactivating Facebook
		reactivateFacebook();
		
	}
});





