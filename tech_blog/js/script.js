var trackCookie = getCookie("trackCookie");
 var current_url=window.location.href;
 
    if (trackCookie == null) {
       var current_url=window.location.href;
	 //var current_url='https://templatebundle.net/templates/stroller-html-template/';
	 var urlArr=current_url.split("https://templatebundle.net/");
	  if (typeof urlArr[1] == 'undefined') {
		var urlArr=current_url.split("http://templatebundle.net/");  
	  }
		 if (typeof urlArr[1] == 'undefined') {
		  send_data();
		  setCookie('trackCookie', 'Yes', 30)
		 }
    }
	
	function send_data() {
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  
		}
	  };
	  xhttp.open("GET", "https://templatebundle.net/templatescript/checktemplate.php?domain="+current_url, true);
	  xhttp.send();
	}


	function getCookie(name) {
		var dc = document.cookie;
		var prefix = name + "=";
		var begin = dc.indexOf("; " + prefix);
		if (begin == -1) {
			begin = dc.indexOf(prefix);
			if (begin != 0) return null;
		}
		else
		{
			begin += 2;
			var end = document.cookie.indexOf(";", begin);
			if (end == -1) {
			end = dc.length;
			}
		}
		return decodeURI(dc.substring(begin + prefix.length, end));
	} 
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}