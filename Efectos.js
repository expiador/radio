jQuery.noConflict();
/*---------------------------------------------
 *				
 By: Juan Malarin / Otakudesho - Radio Anime! 
 Initialize 
 ----------------------------------------------*/
var _pollDelay = 3000;


jQuery(document).ready(function() {
	GetRemotePlayInfo();
});

 
 
 
/* REMOTE INFORMATION */
function jsonp(url, callback, name, query) {
	if (url.indexOf("?") > -1) { url += "&jsonp="; }
	else { url += "?jsonp="; }

	url += name + "&";

	if (query) { url += encodeURIComponent(query) + "&"; }
	url += new Date().getTime().toString(); // prevent caching

	var script = document.createElement("script");
	script.setAttribute("src", url);
	script.setAttribute("type", "text/javascript");
	var head = document.getElementsByTagName('head')[0];
	if (head) { head.appendChild(script); }
}

function GetRemotePlayInfo() {
	var reqUrl = "http://api.radionomy.com/currentsong.cfm?type=json&size=70&defaultcover=yes&callmeback=yes&cover=yes&radiouid=" + _radUID;
	jsonp(reqUrl, "GetPlayInfo", "GetPlayInfo", ""); //This method will asynchronously call GetRemoteUrl to specify the URL
}
 
 
 
//POLLING
var pollId;
function startPoll() { pollId = setInterval(GetRemotePlayInfo, _pollDelay); }
function stopPoll() { if(pollId) clearInterval(pollId); }
function restartPoll() { stopPoll(); startPoll(); }
 
 
 
 
 
 

function GetPlayInfo(result) {
	_coverUrl = '';

	if (result.tracks.callmeback <= 0)
		_pollDelay = 5000;
	else
		_pollDelay = (result.tracks.callmeback * 1); //Change with the next song + 1 second of security;

	restartPoll();

	/* TITLE */
	jQuery('#title_artist').html(result.tracks.title +' - '+ result.tracks.artists);
	 
	/* Cover */
	 var coverPic = result.tracks.cover;
	if ( (coverPic =='') || (coverPic == 'http://api.radionomy.com/images/default.jpg') ){
		coverPic = 'https://www.otakudesho.net';
	}
	
	
	jQuery('#my_image').attr('src',coverPic);
	 
}
 

 
 