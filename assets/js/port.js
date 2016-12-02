var app = angular.module("Portfolio", ['ngResource']);

app.factory('skillService', ['$resource', function($resource) {
  console.log("COMPANY_URL: " + COMPANY_URL);
  var Skill = $resource(COMPANY_URL, {option:'skill', param: '@companyToken'},{
    query: { method: "GET", isArray: false }
  });
   return function(cmp) {
     // does the external call
     console.log("Calling skill service for company token: " + cmp);
     return Skill.get({param: cmp});
   };
 }]);

 app.controller('SkillCtrl', ['$scope', 'skillService', function($scope, skillService) {
   skills = skillService(companyToken);
   console.log('skills ' + skills[0].name);
 }]);

/*
 angular.
 module('myServiceModule', []).
  controller('MyController', ['$scope', 'notify', function($scope, notify) {
    $scope.callNotify = function(msg) {
      notify(msg);
    };
  }]).
 factory('notify', ['$window', function(win) {
    var msgs = [];
    return function(msg) {
      msgs.push(msg);
      if (msgs.length === 3) {
        win.alert(msgs.join('\n'));
        msgs = [];
      }
    };
  }]);
*/
//app.controller("SkillCtrl",['SkillService', function($scope, SkillService) {
  //$scope.skills = SkillService.companySkills();
//}]);
