(function(){
  var app = angular.module('dropkick', []);
  app.controller('DropKickBabyController', function() {
    this.babies = babiesGem;
  });

  var babiesGem = [
    {
      name: 'Joe',
      source: 'baby.json'
    },
    {
      name: 'Bob',
      source: 'baby.json'
    }
  ]
})();
