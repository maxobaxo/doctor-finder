var apiKey = require('./../.env').apiKey;

function DoctorModule() {

}

DoctorModule.prototype.getDoctors = function(medicalIssue) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query=' + medicalIssue + '&location=45.5231%2C-122.6765%2C205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
  .then(function(response) {
    console.log(response);
  })
  .fail(function(error){
    console.log("fail");
  });

};

exports.doctorModule = DoctorModule;
