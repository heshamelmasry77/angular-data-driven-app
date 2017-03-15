myApp.factory('Authentication', ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
    function ($rootScope, $location, $firebaseObject, $firebaseAuth) {
        // create a reference to the database
        var ref = firebase.database().ref();
        // So this will be a reference to our database

        // another variable for the authentication part.
        var auth = $firebaseAuth();

        var myObject;

        // im going to use another method called onAuthStateChanged.
        // This method is going to allow us to detect when a user has logged in
        auth.$onAuthStateChanged(function (authUser) {
            if (authUser) { // if thre is an authenticated user then do the below code

                // get a reference to the current user using the user's ID that we get as a result of the authentication event
                var userRef = ref.child('users').child(authUser.uid);

                // I'll create another variable here, userObj. And to get that information from the users, I need to use a library called firebaseObject using my userRef
                var userObj = $firebaseObject(userRef);
                $rootScope.currentUser = userObj;
            } else {
                $rootScope.currentUser = '';

            }
        });


        // this service is going to return an object and this object is going to have a couple of methods

        myObject = {
            login: function (user) {

                auth.$signInWithEmailAndPassword(
                    user.email,
                    user.password
                ).then(function (user) {
                    // send the user to another page
                    $location.path('/success');
                }).catch(function (error) {
                    $rootScope.message = error.message;
                }); //signInWithEmailAndPassword
            }, //login
            logout: function () {
                return auth.$signOut();
            }, //logout
            requireAuth: function () {
                return auth.$requireSignIn();
            }, // require Authentication
            register: function (user) {

                // so that we can register with an account
                // a special function from Firebase called createUserWithEmailAndPassword

                // then Firebase is going to give us a promise which you can get to with a then statement and it's going to return some registration information that we'll pass along into a variable called regUser.

                auth.$createUserWithEmailAndPassword(
                    // whenever I'm calling this function called register I'm going to pass along the user information and put it in a user variable. When I call the create user with e-mail and password
                    // I don't need rootScope to pass along the information here
                    user.email,
                    user.password
                ).then(function (regUser) {
                    var regRef = ref.child('users')
                        .child(regUser.uid).set({
                            date: firebase.database.ServerValue.TIMESTAMP,
                            regUser: regUser.uid,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email
                        }); //userinfo
                    // $rootScope.message = "Hi " + user.firstname + ", Thank's for registering";
                    myObject.login(user);

                }).catch(function (error) {
                    $rootScope.message = error.message;
                }); //createUserWithEmailAndPassword

            } //register
        };
        return myObject;
        //return


    }]); //factory
