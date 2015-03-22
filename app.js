(function(){
  var app = angular.module('dropkick', []);
  app.controller('DropKickBabyController', function($http) {
    var self = this;
    this.babies = [];
    $http.get('babies.json').then(function(res) {self.babies = res.data;});
  });
})();
