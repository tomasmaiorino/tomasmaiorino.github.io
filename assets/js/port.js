var app = angular.module("Portfolio", ['ngResource']);

app.factory('skillService', ['$resource', function($resource) {
  console.log("COMPANY_URL: " + COMPANY_URL);
  var Skill = $resource(COMPANY_URL, {option:'skill', param: '@companyToken'},{
    query: { method: "GET", isArray: false }
  });
   return function(cmp) {
     // does the external call
     console.log("Calling skill service for company token: " + cmp);
     return Skill.get({param: cmp},
       function success(response){
        // console.log(response);
       }, function error (response){
         if(404 == response.status) {

         }
       });
   };
 }]);

 app.controller('SkillCtrl', ['$scope', 'skillService', function($scope, skillService) {
  showSkillLoad(true);
  $scope.skills = skillService(companyToken);
  showSkillLoad(false);
  hideSkillSet(false);
  //updateSkill(getColorFromCompany());
  skillLoaded = true;
  finalize();
 }]);

 app.factory('techService', ['$resource', function($resource) {
   console.log("TECH_URL: " + COMPANY_URL);
   var Skill = $resource(COMPANY_URL, {option:'tech', param: '@companyToken'},{
     query: { method: "GET", isArray: false }
   });
    return function(cmp) {
      // does the external call
      console.log("Calling techService service for company token: " + cmp);
      return Skill.get({param: cmp},
        function success(response){
         // console.log(response);
        }, function error (response){
          treatError(response, 'tech');
        });
    };
  }]);

  app.controller('TechCtrl', ['$scope', 'techService', function($scope, techService) {
   showTechLoad(true);
   $scope.tech_tags = techService(companyToken);
   showTechLoad(false);
   hideDefaultTech(false);
   techLoaded = true;
   finalize();
  }]);

  app.filter('techIdFilter', function () {
    return function (item) {
      return item.replace(/ /g, '-');
    };
  });
