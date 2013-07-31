var map;

function initialize() {
	 var myLatlng = new google.maps.LatLng(42.658502,23.351373);
	var mapOptions = {
		zoom: 16,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	 var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
}



google.maps.event.addDomListener(window, 'load', initialize);