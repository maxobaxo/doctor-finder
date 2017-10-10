var apiKey = require('./../.env').apiKey;
var DoctorModule = require('./../js/doctor.js').doctorModule;

function displayDoctors(doctorsArr) {
  $('#doctor-list').empty();
  if (doctorsArr.length === 0) {
    $('#doctor-list').append(
      '<div class="well">' +
      '<h3>' +
      'Your search has returned no results.' +
      '</h3>' +
      '</div>'
    );
  } else {
    doctorsArr.forEach(function(doctor) {
      $('#doctor-list').append(
        '<div class="well">' +
          '<div class="row">' +
            '<div class="col-md-6">' +
              '<h3>' +
                doctor.profile.first_name + " " + doctor.profile.last_name + ", " +
                doctor.profile.title +
              ' (' + doctor.specialties[0].name +
              ')</h3>' +
              '<h4> Practice Locations:</h4>' +
              '<div id="practices-' + doctor.uid +'">' + '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
              // '<div id="map">' +
              // '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );

      var practicesArr = [];
      doctor.practices.forEach(function(practice) {
        practicesArr.push(practice);
      });

      finalPractices = [practicesArr[0]];
      for (var i = 1; i < practicesArr.length; i++) {
        if (practicesArr[i].distance === practicesArr[i-1].distance) {
          console.log(practicesArr[i].name + ' is a dupe of ' + practicesArr[i-1].name);
        } else {
          finalPractices.push(practicesArr[i]);
        }
      };

      finalPractices.forEach(function(practice) {
        $('#practices-' + doctor.uid).append(
          practice.name +
          '<ul>' +
            '<li>' +
            practice.visit_address.street + '<br>' +
            practice.visit_address.city + ', ' +
            practice.visit_address.state + " " +
            practice.visit_address.zip +
            '</li>' +
          '</ul>'
        );
      });
    });
  }
}

// function getPracticeLocations(doctorsArr) {
//   var practicesArr = [];
//   var practiceAddresses = [];
//   doctorsArr.forEach(function(doctor) {
//     doctor.practices.forEach(function(practice) {
//       practicesArr.push(practice);
//     });
//
//     practicesArr.forEach(function(practice) {
//       var address = practice.visit_address.street + " " +
//         practice.visit_address.city + ', ' +
//         practice.visit_address.state + " " +
//         practice.visit_address.zip;
//       practiceAddresses.push(address);
//     });
//   });
//   return practiceAddresses;
// }

$(document).ready(function() {
  var doctorModule = new DoctorModule();
  // doctorModule.createMap();
  $('#issue-form').submit(function(event) {
    event.preventDefault();

    var medicalIssue = $('#issue-input').val();
    var sortOrder = $('#sort-order').val();
    var doctorName = $('#doctor-name').val();
    doctorModule.getDoctors(medicalIssue, displayDoctors, sortOrder, doctorName);
    $('#map').show();
  });
});
