$('#schemes-industry-btn-group button').on("click", function() {

  var defaultClass = "scheme-button";
  var toBeAssignedClass = $(this).attr("data-btn-class");

  $('#schemes-industry-btn-group button').attr("class", defaultClass);
  $(this).attr("class", toBeAssignedClass);
});

$('#schemes-workforce-btn-group button').on("click", function() {

  var defaultClass = "scheme-button";
  var toBeAssignedClass = $(this).attr("data-btn-class");

  $('#schemes-workforce-btn-group button').attr("class", defaultClass);
  $(this).attr("class", toBeAssignedClass);
});

/*$('#country-btn-group button').on("click", function() {

  var defaultClass = "scheme-button";
  var toBeAssignedClass = $(this).attr("data-btn-class");

  $('#country-btn-group button').attr("class", defaultClass);
  $(this).attr("class", toBeAssignedClass);
});

$('#industry-btn-group button').on("click", function() {

  var defaultClass = "scheme-button";
  var toBeAssignedClass = $(this).attr("data-btn-class");

  $('#industry-btn-group button').attr("class", defaultClass);
  $(this).attr("class", toBeAssignedClass);
});*/
