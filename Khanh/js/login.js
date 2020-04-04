function login(database) {

    document.getElementById("loader").style.display = "block";
    var email = document.getElementById("email_id").value;
    var pass = document.getElementById("password_id").value;
    var err = document.getElementsByClassName("error")[0];
    var email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    err.style.display = "none";

    if (email != "" && email_re.test(email)) {
        if (pass != "") {
            authenticate(database, err, email, pass);
        } else {
            err.innerHTML = "Please enter password!";
            err.style.display = "block";
        }

    } else {
        if (email == "") {
            err.innerHTML = "Please enter email!";
        } else {
            err.innerHTML = "Email format is not right!";
        }
        err.style.display = "block";
    }
}

function request_access() {
    var fullname = document.getElementById("user_names").value;
    var err = document.getElementsByClassName("error")[1];

    err.style.display = "none";

    if (fullname != "") {
        alert(fullname);
    } else {
        err.innerHTML = "Please enter your name!";
        err.style.display = "block";
    }



}

function register() {

}

function login_go() {
    document.getElementById("login").style.display = "block";
    document.getElementById("reset_pass").style.display = "none";
    document.getElementById("request_access").style.display = "none";

}

function reset_pass_go() {
    document.getElementById("login").style.display = "none";
    document.getElementById("reset_pass").style.display = "block";
    document.getElementById("request_access").style.display = "none";

}

function req_access_go() {
    document.getElementById("login").style.display = "none";
    document.getElementById("reset_pass").style.display = "none";
    document.getElementById("request_access").style.display = "block";
}




function authenticate(database, err, email, pass) {
    var db = database.database();
    var auth = database.auth();
    ///////alert(auth.currentUser.email);
    // var fbRef = db.ref();

    /*  fbRef.on('value',function(snapshot){
         var searchWords = [];
         snapshot.forEach(function(childRef){
            searchWords.push(childRef.key);
         });
         alert(searchWords.length);
      });    */
    err.style.display = "none";
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
            firebase.auth().signInWithEmailAndPassword(email, pass).then(function(user) {
                db.ref("Users").on("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        if (childSnapshot.key.replace(",", ".") == email) {
                            localStorage.setItem("name", childSnapshot.child("Name").val());
                            document.getElementById("loader").style.display = "none";
                            window.location.href = "../index.html";
                        }
                    });
                });
                //window.location.href = "index.html";
            }).catch(function(error) {
                var errorMessage = error.message;

                err.innerHTML = errorMessage;
                err.style.display = "block";
            });
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.



            //return firebase.auth().signInWithEmailAndPassword(email, pass);


        })
        .catch(function(error) {
            var errorMessage = error.message;

            err.innerHTML = errorMessage;
            err.style.display = "block";
        });


}