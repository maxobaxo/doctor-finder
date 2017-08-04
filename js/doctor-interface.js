var apiKey = require('./../.env').apiKey;
var DoctorModule = require('./../js/doctor.js').doctorModule;

function displayDoctors(doctorsArr) {
  doctorsArr.forEach(function(doctor) {
    $('#doctor-list').append('<li>' + doctor.profile.first_name + " " + doctor.profile.last_name + '</li>');
  });
}

$(document).ready(function() {
  $('#issue-form').submit(function(event) {
    event.preventDefault();

    var doctorModule = new DoctorModule();
    var medicalIssue = $('#issue-input').val();
    doctorModule.getDoctors(medicalIssue, displayDoctors);
  });
});
