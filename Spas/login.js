const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function login(database){
   
   document.getElementById("loader").style.display = "block";
   var email = document.getElementById("email_id").value;
   var pass = document.getElementById("password_id").value;
   var err = document.getElementsByClassName("error")[0];
   var email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
   err.style.display = "none";
   
   if(email != "" && email_re.test(email)){
      if(pass != ""){
         authenticate(database,err,email,pass);
      } else {
         err.innerHTML = "Please enter password!";
         err.style.display = "block";
         document.getElementById("loader").style.display = "none";
      }
      
   } else {
      if(email == ""){
         err.innerHTML = "Please enter email!";
      } else {
         err.innerHTML = "Email format is not right!";
      }
      document.getElementById("loader").style.display = "none";
      err.style.display = "block";
   }
}

function request_access(database){
   var fullname = document.getElementById("user_names").value;
   var err = document.getElementsByClassName("error")[1];
   
   err.style.display = "none";
   
   if(fullname != ""){
      var ref = database.database().ref("Requests");
      document.getElementById("loader").style.display = "block";
      ref.child(fullname).once('value', function(snapshot){
            if(!snapshot.exists()){
               ref.child(fullname).set(0, function(error){
                  if(!error){ 
                     err.innerHTML = "You are now waiting to be approved.";
                     err.style.display = "block";
                  }else{
                     err.innerHTML = error.message;
                     err.style.display = "block";
                  }
                  document.getElementById("loader").style.display = "none";
               });
            }else{
               if(parseInt(snapshot.val()) == 0){
                  err.innerHTML = "You are now waiting to be approved.";
                  err.style.display = "block";
               }else{
                  document.getElementById("request_access").style.display = "none";
                  document.getElementById("name_h").innerHTML = fullname;
                  document.getElementById("register").style.display = "block";
               }
               document.getElementById("loader").style.display = "none";
            }         
      });
      
   }else{
      err.innerHTML = "Please enter your name!";
      err.style.display = "block";
   }
   
   
   
}

function register(database){
   var email = document.getElementById("email_id_reg").value;
   var pass = document.getElementById("password_id_reg").value;
   var word = document.getElementById("word_id_reg").value;
   var err = document.getElementsByClassName("error")[2];
   var email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
   err.style.display = "none";
   
   document.getElementById("loader").style.display = "block";
   if(email != "" && email_re.test(email)){
      if(pass != ""){
         if(word != ""){
            firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(user){
               var ref = database.database().ref("Users");
               var ref1 = database.database().ref("Requests");
               var name = document.getElementById("name_h").innerHTML;
               ref.child(email.replace(".",",")).child("Name").set(name);
               ref.child(email.replace(".",",")).child("Word").set(word);
               ref1.child(name).remove();
               authenticate(database,err,email,pass);
               document.getElementById("loader").style.display = "none";
            }).catch(function(error) {
               err.innerHTML = error.message;
               err.style.display = "block";
               document.getElementById("loader").style.display = "none";
            });
         }else{
            err.innerHTML = "Please enter memorable word!";
            err.style.display = "block";
            document.getElementById("loader").style.display = "none";
         }
      } else {
         err.innerHTML = "Please enter password!";
         err.style.display = "block";
         document.getElementById("loader").style.display = "none";
      }
   }else{
      if(email == ""){
         err.innerHTML = "Please enter email!";
      } else {
         err.innerHTML = "Email format is not right!";
      }
      document.getElementById("loader").style.display = "none";
      err.style.display = "block";
   }
}

function change_pass(database){
   var email = document.getElementById("email_id_res").value;
   var err = document.getElementsByClassName("error")[3];
   var email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   var ref = database.database().ref("Users");
   
   if(email != "" && email_re.test(email)){
      document.getElementById("loader").style.display = "block";
      firebase.auth().sendPasswordResetEmail(email).then(function(){
         err.innerHTML = "Email sent. Check your email box to continue.";
         err.style.display = "block";
         document.getElementById("loader").style.display = "none";
      }).catch(function(error){
         err.innerHTML = error.message;
         err.style.display = "block";
         document.getElementById("loader").style.display = "none";
      });


   }else{
      if(email == ""){
         err.innerHTML = "Please enter email!";
      } else {
         err.innerHTML = "Email format is not right!";
      }
      err.style.display = "block";
   }
}

function login_go(){
   document.getElementById("login").style.display = "block";
   document.getElementById("reset_pass").style.display = "none";
   document.getElementById("request_access").style.display = "none";
   document.getElementById("register").style.display = "none";
   
}

function reset_pass_go(){
   document.getElementById("login").style.display = "none";
   document.getElementById("reset_pass").style.display = "block";
   document.getElementById("request_access").style.display = "none";
   
}

function req_access_go(){
   document.getElementById("login").style.display = "none";
   document.getElementById("reset_pass").style.display = "none";
   document.getElementById("request_access").style.display = "block";
}




function authenticate(database,err,email,pass){
   var db = database.database();
   var auth = database.auth();
   var today = new Date();
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
   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
      firebase.auth().signInWithEmailAndPassword(email, pass).then(function(user) {
      db.ref("Users").on("value", function(snapshot) {
         snapshot.forEach(function(childSnapshot) {
            if(childSnapshot.key.replace(",",".")==email){
               localStorage.setItem("name",childSnapshot.child("Name").val());
               db.ref("Calendar").on('value', function(snapshot) {
                  snapshot.forEach(function(child) {
                        if(new Date(child.key) < new Date(today.getDate() + "-" + monthNames[today.getMonth()] + "-" + today.getFullYear())){
                           db.ref("Calendar/"+child.key).remove();
                        }
                  });
               });
               document.getElementById("loader").style.display = "none";
               window.location.href = "index.html";
            }
         });
      });
      }).catch(function(error) {
      var errorMessage = error.message;
      
      document.getElementById("loader").style.display = "none";
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
      document.getElementById("loader").style.display = "none";
      err.innerHTML = errorMessage;
      err.style.display = "block";
   });
   
   
}



         
      
      
