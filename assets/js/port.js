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
           showSkillLoad(false);
         }
       });
   };
 }]);

 app.controller('SkillCtrl', ['$scope', 'skillService', function($scope, skillService) {
  $scope.skills = skillService(companyToken);
  if (!!$scope.skills) {
    hideSkillSet(false);
    skillLoaded = true;
    finalize();
  }
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
          showTechLoad(false);
          var funcs = []
          funcs.push(function (){alert('ok')});
          funcs.push(function (){alert('ok again')});
          treatError(response, 'tech', funcs);
        });
    };
  }]);

  app.controller('TechCtrl', ['$scope', 'techService', function($scope, techService) {
   $scope.tech_tags = techService(companyToken);
   if (!!$scope.tech_tags) {
     hideDefaultTech(false);
     techLoaded = true;
     finalize();
   }
  }]);

  app.filter('techIdFilter', function () {
    return function (item) {
      return item.replace(/ /g, '-');
    };
  });

  app.filter('techTagFilter', function () {
    return function (item) {
      var out = [];
      angular.forEach(item, function(value, key) {
         out.push(value.name);
      });
      return out;
    };
  });

  app.factory('companyService', ['$resource', function($resource) {
    console.log("COMPANY_URL: " + COMPANY_URL);
    var Skill = $resource(COMPANY_URL, {option:'token', param: '@companyToken'},{
      query: { method: "GET", isArray: false }
    });
     return function(cmp) {
       // does the external call
       console.log("Calling company service for company token: " + cmp);
       return Skill.get({param: cmp},
         function success(response){
          // console.log(response);
         }, function error (response){
           if(404 == response.status) {

           }
         });
     };
   }]);

   app.controller('ProjectsCtrl', ['$scope', 'companyService', function($scope, companyService) {
    showProjectLoad(true);
    $scope.company = companyService(companyToken);
    if (!!$scope.company) {
      //hideDefaultProjects(false);
      projectsLoaded = true;
      finalize();
    }
   }]);
