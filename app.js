(function(){
  var app = angular.module('dropkick', []);
  app.controller('DropKickBabyController', function($http) {
    var self = this;
    self.kickers = [];
    self.kickees = [];
    $http.get('kickers.json').then(function(res) {self.kickers = res.data;});
    $http.get('kickees.json').then(function(res) {self.kickees = res.data;});
  });
})();
