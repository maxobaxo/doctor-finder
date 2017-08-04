var apiKey = require('./../.env').apiKey;

function DoctorModule() {

}

DoctorModule.prototype.getDoctors = function(medicalIssue, displayDoctors, sortOrder, doctorName) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?name=' + doctorName + '&query=' + medicalIssue + '&sort=' + sortOrder + '&location=45.5231%2C-122.6765%2C205&user_location=45.5231%2C-122.6765&user_key=' + apiKey)
  .then(function(response) {
    var doctorsArr = response.data;
    displayDoctors(doctorsArr);
  })
  .fail(function(error){
    console.log("fail");
  });
};

DoctorModule.prototype.createMap = function() {

  var Portland = {lat: 45.5207, lng: -122.677397};
  var mapObject = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: Portland,
    mapTypeId: 'terrain'
  });
};

DoctorModule.prototype.mapDoctors = function(address) {
  $.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + address)
    .then(function(response) {
      console.log(response.results);
      var latitude = response.results[0].geometry.location.lat;
      var longitude = response.results[0].geometry.location.lng;
      var marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: mapObject
      });
      // console.log(response.lat);
      // console.log(response.lng);
    });
};

exports.doctorModule = DoctorModule;
