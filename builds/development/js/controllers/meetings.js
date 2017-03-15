myApp.controller('MeetingsController',
    ['$scope', '$firebaseAuth', '$firebaseArray',
        function ($scope, $firebaseAuth, $firebaseArray) {

            // create a reference to the database
            var ref = firebase.database().ref();
            // So this will be a reference to our database

            // another variable for the authentication part.
            var auth = $firebaseAuth();

            // im going to use another method called onAuthStateChanged.
            // This method is going to allow us to detect when a user has logged in
            auth.$onAuthStateChanged(function (authUser) {
                if (authUser) { // if there is an authenticated user then do the below code

                    var meetingsRef = ref.child('users').child(authUser.uid).child('meetings');
                    var meetingsInfo = $firebaseArray(meetingsRef);

                    $scope.meetings = meetingsInfo;

                    $scope.addMeeting = function() {
                        meetingsInfo.$add({
                            name: $scope.meetingname,
                            date: firebase.database.ServerValue.TIMESTAMP
                        }).then(function() {
                            $scope.meetingname= null;
                        }); //promise
                    } //addMeeting


                    $scope.deleteMeeting = function (key) {
                        meetingsInfo.$remove(key);

                    } //deleteMeeting

                } //authUser
            }); //onAuthStateChanged
        }]); //myApp.controller
