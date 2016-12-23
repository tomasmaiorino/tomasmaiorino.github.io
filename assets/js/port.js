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
   if (validToken) {
    $scope.skills = skillService(companyToken);
      $scope.skills.$promise.then(function (result) {
        hideSkillSet(false);
        skillLoaded = 'success';
        finalizeSkill();
      }, function(error) {
        $scope.skillsError = true;
        treatError(error, 'skill');
        finalizeSkill(true);
     });
  } else {
    $scope.skillsError = true;
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
        return Tech.get({param: cmp});
      }
    };
  }]);

  app.controller('TechCtrl', ['$scope', 'techService', function($scope, techService) {
    if (validToken) {
       $scope.tech_tags = techService.call(companyToken);
       $scope.tech_tags.$promise.then(function (result) {
         hideDefaultTech(false);
         techLoaded = 'success';
         finalizeTech();
       }, function(error) {
         $scope.techError = true;
         treatError(error, 'tech');
      });
    } else {
      console.log('not valid tech');
      $scope.techError = true;
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
       return Company.get({param: cmp});
     };
   }]);

   app.controller('CompanyCtrl', ['$scope', 'companyService', function($scope, companyService) {
     if (validToken) {
        $scope.company = companyService(companyToken);
        $scope.company.$promise.then(function (result) {
          projectsLoaded = 'success';
          finalizeProject();
        }, function(error) {
          $scope.companyError = true;
          treatError(error, 'company');
        });
      } else {
        $scope.companyError = true;
      }
   }]);
