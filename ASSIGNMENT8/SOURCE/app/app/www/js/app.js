// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var lab7=angular.module('app', ['ionic','ngCordova', 'app.controllers', 'app.routes', 'app.directives','app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  
      var utterance = new SpeechSynthesisUtterance("hi this is ASE lab assignment 7");
    window.speechSynthesis.speak(utterance);
  });
    

});

//unit testing karma
lab7.controller('PasswordController', function PasswordController($scope) {
  $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;  
    if (size > 8) {
      $scope.strength = 'strong';
        
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
     console.log("password length::" +size +"  Strength:" + $scope.strength);
  };
})
    //barcode scanner controller to scan
//
    lab7.controller("BarCodeController", function($scope, $cordovaBarcodeScanner) {
 
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert("Scanned BarCode is:" +imageData.text);
            var utterance = new SpeechSynthesisUtterance("Scanned Bar Code is :" + imageData.text);
    window.speechSynthesis.speak(utterance);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
 
});







  
