(function(){
  var app = angular.module('dropkick', []);
  app.controller('DropKickBabyController', [
    '$scope', '$http',
    function($scope, $http) {
      var self = this;
      self.kickers = [];
      self.kickees = [];
      $http.get('kickers.json').then(function(res) {self.kickers = res.data;});
      $http.get('kickees.json').then(function(res) {self.kickees = res.data;});

      $scope.dropkickBaby = function() {
        balls.push(0);
      };

      $scope.kickerChanged = function() {
        $http.get($scope.selectedKicker.url).then(
          function(res){
            kicker = res.data;
            kickerImage.src = kicker.image.url;
            }
          );
      }; // kickerChanged

      $scope.kickeeChanged = function() {
        $http.get($scope.selectedKickee.url).then(
          function(res){
            kickee = res.data;
            kickeeImage.src = kickee.image.url;
            kicking = new Howl(kickee.sound.file);
            }
          );
      }; // kickeeChanged

    }
  ]); // DropKickBabyController
})();
