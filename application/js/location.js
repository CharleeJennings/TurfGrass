/* This showResult function is used as the callback function*/

function showResult(result) {
    document.getElementById("location").innerHTML = result.formatted_address;
    document.getElementById("forecast-title").innerHTML = "Forecast for " + result.formatted_address;
}

function getLatitudeLongitude(callback, address) {
    // If adress is not supplied, use default value 'Auburn, AL, USA'
    address = address || 'Auburn, AL, USA';
    
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