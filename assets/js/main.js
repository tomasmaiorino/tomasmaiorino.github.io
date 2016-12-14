jQuery(document).ready(function($) {

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
  console.log('binding ' + jobs);
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
var EXTERNAL_SERVICE_HOST = "http://127.0.0.1:3000";
//var PROJECTS_URL = "token/:param";
//var TECH_TAGS_URL = "tech/:param";
var COMPANY_URL = EXTERNAL_SERVICE_HOST + "/api/v1/company/:option/:param";
//var SKILL_URL = COMPANY_URL + "skill/:param";
var DEFAULT_COLOR = "#5cb85c";
var OWN_PROJECT_COLOR = "#3AAA64";
var COMPANY_TOKEN_PARAM_KEY = "c";
var LOAD_NAME_PARAM_KEY = "l";
var loadsIds = ['projectLoad', 'skillLoad', 'techLoad'];
var companyToken = '';
var hexaReg = /[a-fA-F0-9]{6}/g
var skillLoaded = false;
var techLoaded = false;
var companyLoaded = false;
var projectsLoaded = false;
var statusCode = -1;
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
  console.log(pColor);
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
    console.log('invalid color ' + temp);
  } else {
    console.log('chaging color to ' + pColor);
    $('.loading').attr("style", "border-color: transparent " + pColor + " transparent #FFF");
    $('.loading-text').attr("style", "color:" + pColor);
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
}

function getCompanyToken() {
  return getQueryParamByName(COMPANY_TOKEN_PARAM_KEY);
}

function get_load_name() {
  return getQueryParamByName(LOAD_NAME_PARAM_KEY);
}
function initConfig() {
  companyToken = getCompanyToken();
  console.debug('setting load color.')
  setLoadColor(getColorFromCompany());
  console.debug('load coloer fields.')
  loadColorsFields(getColorFromCompany());
}

function finalizeSkill() {
  var id = setInterval(doesSkillTask, 1000);
  function doesSkillTask() {
    var itensQtd = $('.company-skill-item').find('.level-bar-inner').length;
    if (itensQtd > 0) {
      console.log('changing skill');
      $('.company-skill-item').find('.level-bar-inner').each(function() {
          var itemWidth = $(this).data('level');
          var color = getColorFromCompany();
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
  var id = setInterval(doesTechTask, 1000);
  function doesTechTask() {
    var itensQtd = $('.tech-item').length;
    if (itensQtd > 0) {
      console.log('changing tech item');
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

function finalizeProject() {
  console.log('Finishing project');
  var id = setInterval(doesProjectTask, 1000);
  function doesProjectTask() {
    var itensQtd = $('.job-item').length;
    if (itensQtd > 0) {
      console.log('configing job highlight');
      jobs = new Array();
      $(".job-item").each(function(){
        var pTech = $(this).data('tech');
        var pId = $(this).attr('id');
        console.log('jobs pid ' + pId + ' ' + pTech);
        jobs[pId] = pTech;
        console.log('jobs ' + jobs[pId]);
        loadHighlight();
      });
      clearInterval(id);
    }
  }
}

function finalize(){
  if (skillLoaded && techLoaded && projectsLoaded) {
    finalizeSkill();
    finalizeTech();
    finalizeProject();
  }
}

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
