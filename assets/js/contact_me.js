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
            var name = $("input#senderName").val();
            var email = $("input#senderEmail").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
		        var token = '4bcwqzoi4gng4';
             var content = new Object();
             content.senderName = name;
             content.senderEmail = email;
             content.message = message;
             content.subject = 'Contact';
            $.ajax({
                url: "https://mighty-woodland-49949.herokuapp.com/api/v1/messages/"+token,
                contentType: "application/json",
                type: "POST",
                crossDomain: true,
                dataType: "json",
	        data: JSON.stringify(content),
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
        if (data.status == 404) {
          message = parsed_data.message;
        } else {
          message = parsed_data.message[0];
        }
      }
      return message;
    }
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
