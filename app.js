(function(){
  var app = angular.module('dropkick', []);
  app.controller('DropKickBabyController', [
    '$scope', '$http',
    function($scope, $http, dropkickBaby) {
      var self = this;
      self.kickers = [];
      self.kickees = [];
      $http.get('kickers.json').then(function(res) {self.kickers = res.data;});
      $http.get('kickees.json').then(function(res) {self.kickees = res.data;});
      $scope.dropkickBaby = function() {
        balls.push(0);
      };
    }
  ]); // DropKickBabyController
})();
