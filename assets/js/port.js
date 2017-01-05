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

  app.filter('averageFilter', function () {
    return function (item) {
      console.log('my item ' +item);
      return new Array(item);
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

   app.factory('ratingService', ['$resource', function($resource) {
     console.log("RATING_URL: " + RATING_URL);
     var Rating = $resource(RATING_URL);
      return function() {
        // does the external call
        console.log("Calling rating");
        return Rating.get();
      };
    }]);

    app.controller('RatingCtrl', ['$scope', 'ratingService', function($scope, ratingService) {
      if (validToken) {
         $scope.rating = ratingService();
         $scope.rating.$promise.then(function (result) {
           finalizeRating($scope.rating.average);
         }, function(error) {
           treatError(error, 'rating');
         });
       } else {
         $scope.ratingError = true;
       }
    }]);


        app.factory('sendRatingService', ['$resource', function($resource) {
          console.log("RATING_URL: " + RATING_URL);
          var Rating = $resource(RATING_URL,{}, {
          rating: {method:'POST', params:{rating:true}}
         });
           return function(entry) {
             // does the external call
             return Rating.save(entry);
           };
         }]);

         app.controller('SendRatingCtrl', ['$scope', 'sendRatingService', function($scope, sendRatingService) {
           $scope.sendRating = function() {
             var Entry;
             $scope.entry = new Entry();
             $scope.entry.points = $('#ratingCount').val();
             var comments = $('#suggestion').val().trim();
             if (comments != '') {
               $scope.entry.comments = comments;
             }
             if (validToken) {
               $scope.entry.cp = companyToken;
             }
             $("#btnRating").attr("disabled", true);
             $("#imgRatingLoad").show();

             console.log('sending');

             $scope.rating = sendRatingService($scope.entry);
             $scope.rating.$promise.then(function (result) {
               showRatingSuccessMessage();
             }, function(error) {
               console.log('deu ruim');
               showRatingErrorMessage();
               treatError(error, 'send rating');
             });
           }
           /*
           if (validToken) {
              $scope.rating = ratingService();
              $scope.rating.$promise.then(function (result) {
                finalizeRating($scope.rating.average);
              }, function(error) {
                treatError(error, 'rating');
              });
            } else {
              $scope.ratingError = true;
            }
            */
         }]);
