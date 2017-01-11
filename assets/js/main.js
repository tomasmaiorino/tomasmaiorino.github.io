jQuery(document).ready(function($) {

  $('#starsRatingTotal').starrr({
     readOnly: true
  });

  $('#starsRating').starrr({
    change: function(e, value){
      $('#ratingCount').val(value);
    }
  })

  $('.body-scroll .contact-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
});

    /*======= Skillset *=======*/
    /*
    $('.level-bar-inner').css('width', '0');

    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {

            var itemWidth = $(this).data('level');

            $(this).animate({
                width: itemWidth
            }, 800);

        });
    });
    */

    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();
});

var jobs = new Array();

function highlight(tags, highlight) {
  $.each(tags, function (index, value) {
    if (highlight) {
      $('#'+value).addClass('tag-opacity');
    } else {
      $('#'+value).removeClass('tag-opacity');
    }
  });
}

function bindJob(item, jobs) {
  log('binding ' + jobs);
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


//var fieldsToChangeColor = ['email-link', 'level-bar-inner', 'tech-defaulf-content', 'label-theme', 'more-link', 'fa fa-star'];
var EXTERNAL_SERVICE_HOST = "https://lit-chamber-65001.herokuapp.com";

//var PROJECTS_URL = "token/:param";
//var TECH_TAGS_URL = "tech/:param";
var COMPANY_URL = EXTERNAL_SERVICE_HOST + "/api/v1/company/:option/:param";

var RATING_URL = EXTERNAL_SERVICE_HOST + "/api/v1/rating";
//var SKILL_URL = COMPANY_URL + "skill/:param";
var DEFAULT_COLOR = "#5cb85c";
var OWN_PROJECT_COLOR = "#3AAA64";
var COMPANY_TOKEN_PARAM_KEY = "c";
var LOAD_NAME_PARAM_KEY = "l";
var loadsIds = ['projectLoad', 'skillLoad', 'techLoad'];
var companyToken = '';
var hexaReg = /[a-fA-F0-9]{6}/g
var skillLoaded = '';
var techLoaded = '';
var companyLoaded = '';
var projectsLoaded = '';
var statusCode = -1;
var DEBUG = false;
var ERROR = false;
var LOG = false;
var validToken = false;

//#00a1e4

var fieldsToChangeColor = [{
  clazz: "email-link-link",
  attr: "color:"
}, {
  clazz: "tech-defaulf-content",
  attr: "color:"
}, {
  clazz: "label-theme",
  attr: "background:"
}, {
  clazz: "label-success",
  attr: "background-color:"
}, {
  clazz: "more-link",
  attr: "color:"
}, {
  clazz: "fa-star",
  attr: "color:"
}, {
  clazz: "fa-star-half",
  attr: "color:"
}, {
  clazz: "contact-scroll",
  attr: "border:1px solid #;background-color: #"
}, {
  clazz: "level-bar-inner",
  attr: "background-color:"
}];

var skillLoadClass = [{
  clazz: "level-bar-inner",
  attr: "background-color:"
}];


function animateAttributeColor(item, pColor) {
  var elem = $('.'+item.clazz);
  if ("color:" == item.attr) {
    animateColor(elem, pColor);
  } else if ("background-color:" == item.attr) {
    animateBackGround(elem, pColor);
  } else if ("background:" == item.attr) {
    animateBackGround(elem, pColor);
  } else {
    if (item.attr.indexOf('#') != -1) {
      var content = item.attr;
      $('.' + item.clazz).attr("style", content.replace(/#/g, pColor));
    } else {
      $('.' + item.clazz).attr("style", item.attr + pColor);
    }
  }
}

function restoreDefaultColor() {
  loadColorsFields(DEFAULT_COLOR);
}

function animateColor(item, pColor) {
  $(item).animate({
    color: pColor
  }, 1000);
}

function animateBackGround(item, pColor) {
  $(item).animate({
    backgroundColor: pColor
  }, 1000);
}

function loadColorsFields(pColor) {
  if(pColor.indexOf('#') == -1) {
    pColor = '#' + pColor
  }
  var temp = pColor.replace('#','');
  //if (!hexaReg.test(temp)) {
    //console.log('invalid color ' + temp);
    //return;
//  }
  log(pColor);
  fieldsToChangeColor.map(function(item, index) {
    animateAttributeColor(item, pColor);
  });
}


function getQueryParamByName(name) {
  var param = window.location.search
  //params = url.split("&")
  if (param != undefined && param.length > 0) {
    // remove ? from first result
    param = param.replace("?", "")
    //for (i = 0; i < param.length; i++) {
      if (name == param.substring(0, param.indexOf('='))) {
        return param.substring(param.indexOf('=') + 1)
      }
    //}
  }
  return "";
}
function processProjects(color) {
  //setLoadColor(color);
  showProjectLoad(true);
  loadColorsFields(color);
}

function processTechTag(color) {
  //setLoadColor(color);
  hideDefaultTech(true);
  showTechLoad(true);
  loadColorsFields(color);
}

function processSkill(color) {
  //setLoadColor(color);
  hideDefaultSkill(true);
  showSkillLoad(true);
  loadColorsFields(color);
}

function fullRestore() {
  setLoadColor(DEFAULT_COLOR);
  //skills
  showSkillLoad(false);
  hideDefaultSkill(false);
  //tech tags
  showTechLoad(false);
  hideDefaultTech(false);
  //projects
  showProjectLoad(false);
  loadColorsFields(DEFAULT_COLOR);
}

function setLoadColor(pColor) {
  if(pColor.indexOf('#') == -1) {
    pColor = '#' + pColor
  }
  var temp = pColor.replace('#','');
  if (!hexaReg.test(temp)) {
    log('invalid color ' + temp);
  } else {
    log('chaging color to ' + pColor);
    $('.loading').attr("style", "border-color: transparent " + pColor + " transparent #FFF");
    $('.loading-text').attr("style", "color:" + pColor);
  }
}

function setRatingColor() {
  if (validToken) {
    var pColor = getColorFromCompany();
    if (pColor == '') {
        pColor = DEFAULT_COLOR;
    }
    log('changing rating color to ' + pColor);
    $('.starrr').find('a').each(function(){
      $(this).css('color', '#'+pColor)});
    }
}

function showRatingLoad(show) {
  if (show) {
    $('.rating-load').show('slow');
  } else {
    $('.rating-load').hide('slow');
  }
}

function showProjectLoad(show) {
  if (show) {
    $('.project-load').show('slow');
  } else {
    $('.project-load').hide('slow');
  }
}

function hideDefaultProjects(hide) {
  if (hide) {
    $('.projects-content').hide('slow');
  } else {
    $('.projects-content').show('slow');
  }
}

function showSkillLoad(show) {
  if (show) {
    $('.skill-load').show('slow');
  } else {
    $('.skill-load').hide('slow');
  }
}

function hideSkillSet(hide) {
  if (hide) {
    $('.companySkillsSet').hide('slow');
  } else {
    $('.companySkillsSet').show('slow');
  }

}

function hideDefaultSkill(hide) {
  if (hide) {
    $('.defaultSkillset').hide();
  } else {
    $('.defaultSkillset').show('slow');
  }
}

function showTechLoad(show) {
  if (show) {
    $('.tech-load').show('slow');
  } else {
    $('.tech-load').hide('slow');
  }
}

function hideDefaultTech(hide) {
  debug('hideDefaultTech: ' + hide);
  if (hide) {
    $('.tech-defaulf-content').hide('slow');
  } else {
    $('.tech-defaulf-content').show('slow');
  }
}

function getColorFromCompany() {
  if (companyToken != '') {
    return companyToken.substring(companyToken.length - 6);
    //setLoadColor(color);
  }
  return "";
}

function getCompanyToken() {
  return getQueryParamByName(COMPANY_TOKEN_PARAM_KEY);
}

function get_load_name() {
  return getQueryParamByName(LOAD_NAME_PARAM_KEY);
}

function hasValidToken() {
  companyToken = getCompanyToken();
  validToken = companyToken != '' && hexaReg.test(getColorFromCompany());
  return validToken;
}

function initConfig() {
  if (hasValidToken()) {
    debug('setting load color.')
    setLoadColor(getColorFromCompany());
    debug('load coloer fields.')
    loadColorsFields(getColorFromCompany());
  } else {
    finalizeSkill(true);
    restoreDefaultColor();
  }
}

function finalizeRating(average){
  if (average > 0) {
  var cont = 1;
  $('#starsRatingTotal').find('a').each(function(){
      $(this).removeClass('fa-star-o');
      $(this).addClass('fa-star');
      if (average == cont) {
        return false;
      }
      cont++;
  });
  }
}

function finalizeSkill(error) {
  var id = setInterval(doesSkillTask, 1000);
  function doesSkillTask() {
    var el;
    if (error != undefined && error) {
      log('configuring skill for error');
      el = $('.defaultSkillset').find('.item').find('.level-bar-inner');
    } else {
      el = $('.company-skill-item').find('.level-bar-inner');
    }
    if (el.length > 0) {
      log('changing skill');
      $(el).each(function() {
          var itemWidth = $(this).data('level');
          var color = getColorFromCompany();
          if (color == '') {
            color = DEFAULT_COLOR;
          } else {
            color = '#' + color;
          }
          $(this).animate({
              width: itemWidth,
              backgroundColor: '#' + color
          }, 800);
      });
      clearInterval(id);
    }
  }
}

function finalizeTech() {
  if (techLoaded == 'success') {
    var id = setInterval(doesTechTask, 1000);
    function doesTechTask() {
      var itensQtd = $('.tech-item').length;
      if (itensQtd > 0) {
        log('changing tech item');
        $('.tech-item').each(function() {
            var color = getColorFromCompany();
            $(this).animate({
                backgroundColor: '#' + color
            }, 800);
        });
        clearInterval(id);
      }
    }
  }
}

function finalizeProject() {
  console.log('Finishing project');
  var id = setInterval(doesProjectTask, 1000);
  function doesProjectTask() {
    var itensQtd = $('.job-item').length;
    if (itensQtd > 0) {
      log('configing job highlight');
      jobs = new Array();
      $(".job-item").each(function(){
        var pTech = $(this).data('tech');
        var pId = $(this).attr('id');
        log('jobs pid ' + pId + ' ' + pTech);
        jobs[pId] = pTech;
        log('jobs ' + jobs[pId]);
        loadHighlight();
      });
      clearInterval(id);
      $('.bs-example-modal-sm').modal('show');
    }
  }
}
/*
function finalize(){
  if (skillLoaded  == 'success' &&
      techLoaded == 'success' &&
      projectsLoaded == 'success') {
    finalizeSkill();
    finalizeTech();
    finalizeProject();
  } else if (skillLoaded == 'error' || techLoaded == 'error' || projectsLoaded == 'error') {
    hideDefaultTech(techLoad == 'success');
    hideDefaultSkill(skillLoad == 'success');
    hideDefaultProjects(projectLoaded == 'success');
  }
}
*/
function treatError(response, msg, funcs) {
  console.log(msg + ' ' + response.status);
  if (-1 == response.status) {
  } else {
  }
  if (funcs != undefined) {
    for (i = 0; i < funcs.length; i++) {
      funcs[i]();
    }
  }
 }
function debug(msg) {
  if (DEBUG) {
    console.debug(msg);
  }
}
function error(msg) {
  if (ERROR) {
    console.error(msg);
  }
}
function log(msg) {
  if (LOG) {
    console.log(msg);
  }
}

function showRatingSuccessMessage(successMessage, btn, load) {
  // Enable button & show success message
  $(btn).attr("disabled", false);
  $(load).hide();
  $('#ratingSuccess').html("<div class='alert alert-success'>");
  $('#ratingSuccess > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
      .append("</button>");
  $('#ratingSuccess > .alert-success')
      .append("<strong>Rating sent. Thanks :) </strong>");
  $('#ratingSuccess > .alert-success')
      .append('</div>');
  $('#suggestion').val('');
}

function showRatingErrorMessage(errorMessage, btn, load, hide) {
  // Fail message
  if (hide != undefined) {
    $('#ratingSuccess').html('');
    return;
  }
  $('#ratingSuccess').html("<div class='alert alert-danger'>");
  $('#ratingSuccess > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
      .append("</button>");
  if (errorMessage != "") {
      $('#ratingSuccess > .alert-danger').append("<strong>"+ errorMessage + ".");
  } else {
    $('#ratingSuccess > .alert-danger').append("<strong>Sorry for that :( , Can we please try again later ?!");
  }
  $('#ratingSuccess > .alert-danger').append('</div>');
  if (load != undefined) {
    $(load).hide();
  }
  if (btn != undefined) {
    $(btn).attr("disabled", false);
  }
}
