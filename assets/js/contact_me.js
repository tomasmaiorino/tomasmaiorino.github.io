$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            $("#imgLoad").show();
            event.preventDefault();

            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://boiling-stream-89308.herokuapp.com/api/v1/sendEmail",
                type: "POST",
                crossDomain: true,
                dataType: "json",
                data: {
                    sender_name: name,
                    sender_email: email,
                    message: message,
                    subject: 'Contact',
                    token: '4bcwqzoi4gng4'
                },
                cache: false,
                success: function() {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $("#imgLoad").hide();
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Message sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function(data) {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    var errorMessage = getErrorMessage(data);
                    if (errorMessage != "") {
                        $('#success > .alert-danger').append("<strong>"+ errorMessage + ".");
                    } else {
                      $('#success > .alert-danger').append("<strong>Desculpe " + firstName + ", parece que o servidor não esta respondendo. Porfavor, tente novamente mais tarde!");
                    }
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                    $("#btnSubmit").attr("disabled", false);
                    $("#imgLoad").hide();
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });

    function getErrorMessage(data) {
      var message = '';
      if (data != undefined && data.responseText != undefined) {
        var parsed_data = JSON.parse(data.responseText);
        message = parsed_data.message[0];
      }
      return message;
    }
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
