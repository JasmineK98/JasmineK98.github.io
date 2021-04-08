// Clicking on a button in the given button group changes its style
$('#schemes-industry-btn-group button').on("click", function () {

    var defaultClass = "scheme-button";
    var toBeAssignedClass = $(this).attr("data-btn-class");

    $('#schemes-industry-btn-group button').attr("class", defaultClass);
    $(this).attr("class", toBeAssignedClass);
});

// Clicking on a button in the given button group changes its style
$('#schemes-workforce-btn-group button').on("click", function () {

    var defaultClass = "scheme-button";
    var toBeAssignedClass = $(this).attr("data-btn-class");

    $('#schemes-workforce-btn-group button').attr("class", defaultClass);
    $(this).attr("class", toBeAssignedClass);
});
