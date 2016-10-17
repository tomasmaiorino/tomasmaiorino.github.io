jQuery(document).ready(function($) {

  $('.body-scroll .contact-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
});

    /*======= Skillset *=======*/

    $('.level-bar-inner').css('width', '0');

    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {

            var itemWidth = $(this).data('level');

            $(this).animate({
                width: itemWidth
            }, 800);

        });
    });

    function highlight(tags, highlight) {
      $.each(tags, function (index, value) {
        if (highlight) {
          $('#'+value).addClass('tag-opacity');
        } else {
          $('#'+value).removeClass('tag-opacity');
        }
      });
    }

    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();

    var job1 = ['BCC','ANT','GIT','ORACLE','WEBLOGIC','JSTL','ATG-11']

    var job2 = ['BCC','ANT','GIT','ORACLE','WEBLOGIC','ATG-11']

    var job3 = ['BCC','SVN','ORACLE','WEBLOGIC','ATG-11','SOAP']

    var job4 = job3;

    var job5 = ['BCC','SVN','ORACLE','WEBLOGIC','ATG-11','SOAP', 'REST', 'JSTL']

    var jobs = new Array();
    jobs['job1'] = job1;
    jobs['job2'] = job2;
    jobs['job3'] = job3;
    jobs['job4'] = job4;
    jobs['job5'] = job5;

    function bindJob(item, jobs) {
       $( '.'+item).bind( "mouseover", function() {
          highlight(jobs, true);
        });

        $( '.'+item).bind( "mouseout", function() {
          highlight(jobs, false);
        });
    }

    function loadHighlight () {
      for (var key in jobs) {
        bindJob(key, jobs[key]);
      }
    }

    loadHighlight();
});

function showMoreJobs(){
  var text_hide = 'Hide anothers jobs';
  var text = 'Show anothers jobs';
  $('.hide-jobs').each(function(){
    if($(this).is(":visible")) {
      $(this).hide('slow');
    } else {
      $(this).show('slow');
      text = text_hide;
    }
  });
  $('#showMoreJobs').html(text);
}
