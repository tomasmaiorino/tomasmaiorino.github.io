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
    skillLoaded = 'success';
    finalizeSkill();
  }
 }]);

 app.factory('techService', ['$resource', function($resource) {
   console.log("TECH_URL: " + COMPANY_URL);
   var techReturn = {
     data: "",
     status: 200
   }
   var Tech = $resource(COMPANY_URL, {option:'tech', param: '@companyToken'},{
     query: { method: "GET", isArray: false }
   });
    return {
      call: function(cmp) {
      // does the external call
      console.log("Calling techService service for company token: " + cmp);
      techReturn.data = Tech.get({param: 'cmp'},
        function success(response){
         // console.log(response);
        }, function error (response){
          var funcs = []
          //funcs.push(function (){alert('ok')});
          //funcs.push(function (){alert('ok again')});
          techLoaded = 'error';
          treatError(response, 'tech', funcs);
          techReturn.status = response.status;
        });
        return techReturn;
      }
    };
  }]);

  app.controller('TechCtrl', ['$scope', 'techService', function($scope, techService) {
   var data = techService.call(companyToken);
   console.log('data.status ' + data.status);
   if (data.status == 200) {
     $scope.tech_tags = data.data;
     console.log('$scope.tech_tags.toJSON ' + $scope.tech_tags.toJSON);
     if (!!$scope.tech_tags) {
       hideDefaultTech(false);
       techLoaded = 'success';
       finalizeTech();
     }
   } else {
     console.error(":(");
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
    var Company = $resource(COMPANY_URL, {option:'token', param: '@companyToken'},{
      query: { method: "GET", isArray: false }
    });
     return function(cmp) {
       // does the external call
       console.log("Calling company service for company token: " + cmp);
       return Company.get({param: cmp},
         function success(response){
          // console.log(response);
         }, function error (response){
          treatError(response, 'company');
         });
     };
   }]);

   app.controller('CompanyCtrl', ['$scope', 'companyService', function($scope, companyService) {
    $scope.company = companyService(companyToken);
    if (!!$scope.company) {
      //hideDefaultProjects(false);
      projectsLoaded = 'success';
      finalizeProject();
    }
   }]);
