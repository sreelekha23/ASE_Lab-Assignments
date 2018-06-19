var imageApp=angular.module("starter", ["ionic","ngCordova","firebase"]);

imageApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

imageApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("firebase", {
            url: "/firebase",
            templateUrl: "templates/firebase.html",
            controller: "FirebaseController",
            cache: false
        })
        .state("secure", {
            url: "/secure",
            templateUrl: "templates/secure.html",
            controller: "SecureController"
        });
    $urlRouterProvider.otherwise('/firebase');
});

imageApp.controller("FirebaseController", function($scope, $state, $firebaseAuth){
    
    var fbAuth = $firebaseAuth();
    $scope.login = function(username, password) {
        fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }
    
   $scope.register = function(username, password) {
        fbAuth.$createUserWithEmailAndPassword(username,password).then(function(userData) {
            return fbAuth.$signInWithEmailAndPassword(username,
                password);
        }).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }
   
   $scope.retrive = function(username,password){
       fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
 var ref=firebase.database().ref();
            ref.on('value', gotData, errData);
        })
        function gotData(data){
            console.log(data.val());
            var msgs= data.val();
            var keys=Object.keys(msgs);
            /*var msglistings= selectAll('.msglisting');
             for(var i=0; i< msglistings.length;i++){}*/
            console.log(keys);
            
             $scope.itemsList = [];
            
            for(var i=0; i< keys.length;i++){
                var k= keys[i];
                var message= msgs[k].message;
                var user= msgs[k].user;
                console.log(message,user);
                 $scope.itemsList.push({"name":user, "message":message});
                
                
                 }

            }
            }   
        function errData(err){
                        console.log('error');
                        console.log(err);
        }
                                                                  
   
});

/*var li= document.createElement('li');
                
                var t= document.createTextNode(message + ':' + user);
            
                     
                //li.class('msglisting');
                li.appendChild(t);
                var x= document.getElementById("list");
                x.appendChild(li);*/
//secure controller

imageApp.controller("SecureController", function($scope, $ionicHistory, $firebaseObject, $firebaseArray, $firebaseAuth, $cordovaCamera,$state) {

    $ionicHistory.clearHistory();  //for clearing user login history

    $scope.images = [];
    $scope.fb = $firebaseAuth();
    var fbAuth = $scope.fb.$getAuth();
    var ref = firebase.database().ref();
    var obj = $firebaseObject(ref);
    if(fbAuth) {
        var userReference = ref.child("users/" + fbAuth.uid);   //capture the user reference in data structure ,it navigates to specific user page in freebase
        var syncArray = $firebaseArray(userReference.child("images"));  //binding specific node in firebase to an array object in angularjs
        $scope.images = syncArray;
    } else {
        $state.go("firebase");  //directs to firebase page
    }

    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });
    }
    
    

});
