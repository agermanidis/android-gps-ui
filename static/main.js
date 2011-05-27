var initialize, newYork, sendLocation;

newYork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);

sendLocation = function(latitude, longitude) {
  return $.ajax({
    url: '/send/'+encode(latitude)+'/'+encode(longitude),
    type: 'GET'
  });
};

initialize = function() {
  var hasGeoLocation, map, marker, markerOpts, myOptions, noGeoLocation;
  myOptions = {
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  markerOpts = {
    map: map,
    draggable: true,
    title: "Android Location"
  };
  marker = new google.maps.Marker(markerOpts);
  google.maps.event.addListener(marker, 'dragend', function(evt) {
    var lat, lng;
    lat = evt.latLng.lat();
    lng = evt.latLng.lng();
    return sendLocation(lat, lng);
  });
  hasGeoLocation = function(position) {
    var currentLocation;
    currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(currentLocation);
    marker.setPosition(currentLocation);
    return sendLocation(position.coords.latitude, position.coords.longitude);
  };
  noGeoLocation = function() {
    map.setCenter(newYork);
    marker.setPosition(newYork);
    return sendLocation(position.coords.latitude, position.coords.longitude);
  };
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(hasGeoLocation, noGeoLocation);
  } else {
    return noGeoLocation;
  }
};


