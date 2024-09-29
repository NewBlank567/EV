function goBack() {
    history.go(-1);
}
src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin="">

<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>


    var map = L.map('map');
    map.setView([28.2380, 83.9956], 11);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15 ,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

    map.on('click', function(e) {
        console.log(e)
        var secondmarker =L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)

        L.Routing.control({
  waypoints: [
    L.latLng(28.25987, 83.98112),//live location to add
    L.latLng(e.latlng.lat, e.latlng.lng)
  ]
}).addTo(map);
    })

navigator.geolocation.watchPosition(success, error);

let marker, circle, zoomed;

function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    marker = L.marker([lat,lng]).addTo(map);
    circle = L.circle([lat,lng], { radius:accuracy}).addTo(map);

    if (!zoomed) {
       zoomed = map.fitBounds(circle.getBounds());
    }

    map.setView([lat, lng]);
}
function error(err) {
    if(err.code == 1) {
        alert("Please Allow Your Location");
    } else {
        alert("Cannot get current location");
    }
}

