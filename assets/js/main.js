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

    var jobs = ['job1', 'job2'];

    function loadHighlight () {
      $.each(jobs, function (index, value) {
        $('.'+value).mouseover(function(){
          highlight(value, true);
        });
        $('.'+value).mouseout(function(){
          highlight(value, false);
        });
      });
    }
    //loadHighlight();
    //jobs1
    /*
    $('.job1').mouseover(function(){
      highlight(job1Techs, true);
    });
    $('.job1').mouseout(function(){
      highlight(job1Techs, false);
    });
    */
    //jobs2
    /*
    $('.job2').mouseover(function(){
      highlight(job2, true);
    });
    $('.job2').mouseout(function(){
      highlight(job2, false);
    });
    */
});
