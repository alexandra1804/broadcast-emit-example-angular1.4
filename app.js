var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.data = {
    broadcast: "Broadcast!",
    emit: "Emit!"
  };
  $scope.array = [1,2,3,4,5,6];
  $scope.normArray = $scope.array.map(res => ({value: res}));
  $scope.$on('my-event', function(event, msg) {
    alert('event: ' + msg);
  });
});

app.directive('broadcastTest', function() {
  return {
    restrict: 'E',
    templateUrl: './broadcast-test.html',
    link: function($scope, element) {
      $scope.$on('my-event', function(event, msg) {
        //alert('event: ' + msg);
        var color = (msg === 'broadcasted')? 'red' : '';
        element.find('button').css({'background-color': color});
      });
    },
    controller: ['$scope', function($scope) {
      function broadcast() {
        $scope.$broadcast('my-event', 'broadcasted');
      }
      function emit() {
        $scope.$emit('my-event', 'emitted');
      }
      $scope.broadcast = broadcast;
      $scope.emit = emit;
    }]
  };
});