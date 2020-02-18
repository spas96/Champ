function login() {
    var username = document.getElementById("username_id").value;
    var pass = document.getElementById("password_id").value;
    var err = document.getElementsByClassName("error")[0];

    err.style.display = "none";

    if (username != "") {
        if (pass != "") {
            //SUB
        } else {
            err.innerHTML = "Please enter password!";
            err.style.display = "block";
        }

    } else {
        err.innerHTML = "Please enter username!";
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
        err.innerHTML = "Please enter your full name!";
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