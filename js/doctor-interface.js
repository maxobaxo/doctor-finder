var apiKey = require('./../.env').apiKey;
var DoctorModule = require('./../js/doctor.js').doctorModule;

function displayDoctors(doctorsArr) {
  for (i = 0; i < doctorsArr.length; i++) {
    $('#doctor-list').append('<li>' + doctorsArr[i] + '</li>');
  }
}

$(document).ready(function() {
  $('#issue-form').submit(function(event) {
    event.preventDefault();

    var doctorModule = new DoctorModule();
    var medicalIssue = $('#issue-input').val();
    doctorModule.getDoctors(medicalIssue, displayDoctors);
  });
});
