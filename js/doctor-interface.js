var apiKey = require('./../.env').apiKey;
var DoctorModule = require('./../js/doctor.js').doctorModule;

// function displayDoctors() {
//
// };

$(document).ready(function() {
  $('#issue-form').submit(function(event) {
    event.preventDefault();

    var doctorModule = new DoctorModule();
    var medicalIssue = $('#issue-input').val();
    doctorModule.getDoctors(medicalIssue);
  });
});
