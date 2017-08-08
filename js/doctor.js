var apiKey = require('./../.env').apiKey;

function DoctorModule() {
  this.mapObject;
}

DoctorModule.prototype.drawPracticeMarkers = function(doctorsArr) {
  var that = this;
  doctorsArr.forEach(function(doctor) {
    var practicesArr = [];
    doctor.practices.forEach(function(practice) {
      practicesArr.push(practice);
    });

    practicesArr.forEach(function(practice) {
      var address = practice.visit_address.street + " " +
        practice.visit_address.city + ', ' +
        practice.visit_address.state + " " +
        practice.visit_address.zip;

      $.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + address)
        .then(function(response) {
          // console.log(response.results);
          var latitude = response.results[0].geometry.location.lat;
          var longitude = response.results[0].geometry.location.lng;
          var marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: that.mapObject
          });
          // console.log(response.lat);
          // console.log(response.lng);
        });
    });
  });
}

DoctorModule.prototype.drawMap = function() {
  var Portland = {lat: 45.5207, lng: -122.677397};
  this.mapObject = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: Portland,
    mapTypeId: 'terrain'
  });
}

DoctorModule.prototype.getDoctors = function(medicalIssue, displayDoctors, sortOrder, doctorName) {
  var that = this;
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?name=' + doctorName + '&query=' + medicalIssue + '&sort=' + sortOrder + '&location=45.5231%2C-122.6765%2C205&user_location=45.5231%2C-122.6765&user_key=' + apiKey)
  .then(function(response) {
    displayDoctors(response.data);
    that.drawMap();
    that.drawPracticeMarkers(response.data);
  })
  .fail(function(error){
    console.log("fail");
  });
};

exports.doctorModule = DoctorModule;
