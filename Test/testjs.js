/* This showResult function is used as the callback function*/

function showResult(result) {
    document.getElementById('latitude').value = result.geometry.location.lat();
    document.getElementById('longitude').value = result.geometry.location.lng();
}

function getLatitudeLongitude(callback, address) {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
}

var button = document.getElementById('btn');

button.addEventListener("click", function () {
    var address = document.getElementById('address').value;
    getLatitudeLongitude(showResult, address)
});