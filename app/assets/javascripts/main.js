var Allperk = angular.module('Allperk', ["ngAnimate",
                                        "ngDialog"]);

Allperk.service('EmailService', function($http){
    this.api_key = "JaY-iWIIpOEo2cmdZBHmjA";
    this.send_email = function(data) {
      return $http({
        method: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
          key: this.api_key,
          message: {
            text: "Hello Perks,\n You've got one demo request. Respond to this request at " + data.email + " or by phone at " + data.phone + ".",
            subject: "New Request for Demo from " + data.full_name + " of " + data.company,
            from_email: data.email,
            from_name: data.full_name,
            to: [
              {
                email: "perks@muber.com",
                name: "Muber Perks",
                type: "to"
              }
            ],
          }
        },
        headers: {
          'X-CSRF-TOKEN': undefined,
          'X-Requested-With': undefined
        },
      });
    }
  });


Allperk.controller('DemoController', function($scope, EmailService, ngDialog) {
  $scope.demo_request = {};
  $scope.response = false;
  $scope.request_demo = function(demo_request) {

    EmailService.send_email(demo_request)
      .then(function(data){
        $scope.response = true;

        ngDialog.open({
          template: 'success',
          className: 'ngdialog-theme-default'
        });


      });
  };

  $scope.pics = ["https://dl.dropboxusercontent.com/u/24038622/employees/logo-1.png","https://dl.dropboxusercontent.com/u/24038622/employees/logo-2.png"];
  $scope.circles = [0,1];

  $scope.image1= true;
  $scope.image2= false;
  $scope.currentIndex= 0;

  $scope.moveTo = function(index) {
    if(index===0) {
      $scope.currentIndex = 0;
      $scope.image1 = true;
      $scope.image2 = false;
    }
    else {
      $scope.currentIndex = 1;
      $scope.image1 = false;
      $scope.image2 = true;
    }
  }

});
