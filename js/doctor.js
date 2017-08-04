var apiKey = require('./../.env').apiKey;

function DoctorModule() {

}

DoctorModule.prototype.getDoctors = function(medicalIssue, displayDoctors) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query=' + medicalIssue + '&location=45.5231%2C-122.6765%2C205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
  .then(function(response) {
    var doctorsArr = [];
    console.log(response.data);
    for (i = 0; i < response.data.length; i++) {
      var doctorObject = response.data[i];
      doctorsArr.push(doctorObject);
    }
    displayDoctors(doctorsArr);
  })
  .fail(function(error){
    console.log("fail");
  });

};

exports.doctorModule = DoctorModule;
