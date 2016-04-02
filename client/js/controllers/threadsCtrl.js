'use strict';

var app = angular.module('fireApp');

app.controller('threadsCtrl', function($scope, $state, $threads) {
  console.log('threadsCtrl');

  $scope.threads = $threads.getArray();

  $scope.addThread = function() {
    $threads.create($scope.newThread.subject);
    $scope.newThread = {};
  };
});
