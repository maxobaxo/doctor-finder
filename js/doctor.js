var apiKey = require('./../.env').apiKey;

function DoctorModule() {

}

DoctorModule.prototype.getDoctors = function(medicalIssue, displayDoctors, sortOrder) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query=' + medicalIssue + '&sort=' + sortOrder + '&location=45.5231%2C-122.6765%2C205&user_location=45.5231%2C-122.6765&user_key=' + apiKey)
  .then(function(response) {
    var doctorsArr = response.data;
    displayDoctors(doctorsArr);

    // var Portland = {lat: 45.5207, lng: -122.677397};
    // var mapObject = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 11,
    //   center: Portland,
    //   mapTypeId: 'terrain'
    // });

    // for (i = 0; i < doctorsArr.length; i++) {
    //
    // }
  })
  .fail(function(error){
    console.log("fail");
  });
};

exports.doctorModule = DoctorModule;
