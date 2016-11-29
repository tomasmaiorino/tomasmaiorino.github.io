//var fieldsToChangeColor = ['email-link', 'level-bar-inner', 'tech-defaulf-content', 'label-theme', 'more-link', 'fa fa-star'];
var app = angular.module("Portfolio", []);

app.factory("SkillService", function() {
  return {
    companySkills: function() {
      companyToken = getCompanyToken();

      var skillUrl = EXTERNAL_SERVICE_HOST + SKILL_URL + companyToken;
      console.log("Calling skill url: " + skillUrl);
      $http.get(skillUrl);
      success(function(data, status, headers, config) {
        return data.skills;
      }).
      error(function(data, status, headers, config) {
        hideDefaultSkill(false);
        showSkillLoad(false);
        return ""
      });
      return users;
    }
  };
});

app.controller("SkillCtrl", function($scope, SkillService) {
  $scope.skills = SkillService.companySkills();
});

//#00a1e4


var EXTERNAL_SERVICE_HOST = "http://localhost:3000/";
var SKILL_URL = "/api/v1/company/skill/";
var PROJECTS_URL = "/api/v1/company/token/";
var TECH_TAGS_URL = "/api/v1/company/tech/";
var DEFAULT_COLOR = "#5cb85c";
var OWN_PROJECT_COLOR = "#3AAA64";

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

var COMPANY_TOKEN_PARAM_KEY = "c";
var LOAD_NAME_PARAM_KEY = "l";
var loadsIds = ['projectLoad', 'skillLoad', 'techLoad'];
var companyToken = '';

function processProjects(color) {
  setLoadColor(color);
  showProjectLoad(true);
  loadColorsFields(color);
}

function processTechTag(color) {
  setLoadColor(color);
  hideDefaultTech(true);
  showTechLoad(true);
  loadColorsFields(color);
}

function processSkill(color) {
  setLoadColor(color);
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

function setLoadColor(color) {
  console.log('chaging color to ' + color);
  $('.loading').attr("style", "border-color: transparent " + color + " transparent #FFF");
  $('.loading-text').attr("style", "color:" + color);
}

function showProjectLoad(show) {
  if (show) {
    $('.project-load').show('slow');
  } else {
    $('.project-load').hide('slow');
  }
  hideDefaultProjects(show);
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

function hideDefaultSkill(hide) {
  if (hide) {
    $('.skillset').hide('slow');
  } else {
    $('.skillset').show('slow');
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
    color = companyToken.substring(companyToken.length - 6);
    setLoadColor(color);
  }
}

function getCompanyToken() {
  return getQueryParamByName(COMPANY_TOKEN_PARAM_KEY);
}

function get_load_name() {
  return getQueryParamByName(LOAD_NAME_PARAM_KEY);
}
