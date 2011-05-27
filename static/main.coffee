newYork = new google.maps.LatLng(40.69847032728747, -73.9514422416687)

sendLocation = (latitude, longitude) ->
        $.ajax {
                url: '/send/#{latitude}/#{longitude}'
                type: 'GET'
        }

initialize = () ->
        myOptions =
                zoom: 8
                mapTypeId: google.maps.MapTypeId.ROADMAP

        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions)

        markerOpts =
                map: map
                draggable: true
                title: "Android Location"

        marker = new google.maps.Marker(markerOpts)

        google.maps.event.addListener marker, 'dragend', (evt) ->
                lat = evt.latLng.lat()
                lng = evt.latLng.lng()
                sendLocation lat, lng

        hasGeoLocation = (position) ->
                currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                map.setCenter(currentLocation)
                marker.setPosition(currentLocation)
                sendLocation position.coords.latitude, position.coords.longitude

        noGeoLocation = () ->
                map.setCenter(newYork)
                marker.setPosition(newYork)
                sendLocation position.coords.latitude, position.coords.longitude

        if navigatior.geolocation
                navigator.geolocation.getCurrentPosition(hasGeoLocation, noGeolocation)
        else
                noGeoLocation

