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
  $scope.placeholder = {
    name: "Juan Cruz",
    company: "Allperk Inc",
    email: "juan@company.com",
    telephone: "",
    contact: "Joe, joe@company.com",
    perk: "Perk you would wish to have"
  };

  $scope.request_demo = function(demo_request) {

    $scope.submitted = true;

    if (demo_request) {
      console.log("hello");
      EmailService.send_email(demo_request)
        .then(function(data){


          ngDialog.open({
            template: 'success',
            className: 'ngdialog-theme-default'
          });
        });
    }
    else {

      $('.employee-form').addClass('shake animated')
                       .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                          function(){
                            $(this).removeClass('shake animated');
                          });
    }
  };

});
