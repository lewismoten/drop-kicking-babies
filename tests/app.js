//<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
  //  <script src="http://code.jquery.com/qunit/qunit-1.12.0.js"></script>
  //  <script src="http://code.angularjs.org/1.2.13/angular.js"></script>
    //<script src="http://code.angularjs.org/1.1.4/angular-mocks.js"></script>
//    <link rel="stylesheet" href="http://code.jquery.com/qunit/qunit-1.12.0.css" />
//sinon

var injector = angular.injector(['ng', 'app']);
var controller;

var init = {
  setup: function() {
    this.$scope = injector.get('$rootScope').$new();

    controller = injector.get('$controller');
    controller('DropKickBabyController', {
      $scope: this.$scope
    })
  }
}

module('Dropkick Baby Controller Test', init);

test('hello', function() {
  var app = angular.module('app', []);
  alert(controller.name);
  ok(controller);
});
