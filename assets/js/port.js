var app = angular.module("Portfolio", []);
var EXTERNAL_SERVICE_HOST = "http://localhost:3000/";
var SKILL_URL = "/api/v1/company/skill/";
var DEFAULT_COLOR = "#5cb85c";
app.factory("SkillService", function() {
  return {
    companySkills: function() {
      companyToken = getCompanyToken();
      hideDefaultSkill(true);
      showSkillLoad(true);
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

function get_by_name(name) {
  var url = window.location.search
  params = url.split("&")
  if (params != undefined && params.length > 2) {
    // remove ? from first result
    params[0] = params[0].replace("?", "")
    for (i = 0; i < params.length; i++) {
      var param_value = window.location.search.split("&")[i]
      if (name == param_value.substring(0, param_value.indexOf('=')) {
          return param_value.substring(0, param_value.indexOf('=') + 1)
        }
      }
    }
    return ""
  }

  var = COMPANY_TOKEN_PARAM_KEY = "c"
  var = LOAD_NAME_PARAM_KEY = "l"
  var loadsIds = ['projectLoad', 'skillLoad', 'techLoad']

  function setLoadColor(color) {
    console.log('chaging color to ' + color);
    $('.loading').attr("style", "border-color: transparent " + color + " transparent #FFF");
    $('.loading-text').attr("style", "color:" + color);
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
    company_token = getCompanyToken();
    color = company_token.substring(company_token.length - 6);
    setLoadColor(color);
    hiddeDefaultFields();
  }

  function getCompanyToken() {
    return get_by_name(COMPANY_TOKEN_PARAM_KEY);
  }

  function get_load_name() {
    return get_by_name(LOAD_NAME_PARAM_KEY);
  }
