var map;

console.log("onload test");

function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;
}

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
	zoom: 8,
	center: {lat: 37.658428, lng: -121.876999}
	});

	var devices = JSON.parse(Get("http://127.0.0.1:8000/e"));

  console.log(devices);

	for (i=0;i<=Object.keys(devices.data).length;i++){
		try{
		  var myLatLng = {lat: devices.data[i].coord[0], lng: devices.data[i].coord[1]};
		  var lastentry = JSON.parse(Get("http://127.0.0.1:8000/a/"+devices.data[i].location+"/10"));
		  console.log(lastentry);
		  //console.log(devices.data[i].location);
		  console.log(lastentry.data[5].time);
		  console.log(lastentry.data);
		  var now = new Date();
		  now.setMinutes(0, 0, 0, 0);
		  console.log(now);
		  var then = new Date(lastentry.data[5].time);
		  console.log(then);
		  then.setMinutes(0, 0);
		  console.log(now.valueOf());
		  console.log(then.valueOf());
		  console.log(now.valueOf() == then.valueOf());
			var markerimg = {url : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"};
		  if (now.valueOf() == then.valueOf()){
			      markerimg = {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"};
			  }
			var marker = new google.maps.Marker({
				position: myLatLng,
				label: devices.data[i].location,
				map,
				uid : devices.data[i].uid,
				locationz : devices.data[i].location,
				icon : markerimg
			});
			google.maps.event.addListener(marker, "click", function() {
			  Shiny.setInputValue('selectedLocation', this.locationz);
			});
		}
		catch(err){
			console.log(err.message);
		}
	}


}


