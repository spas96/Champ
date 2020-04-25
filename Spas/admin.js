function users(database){
   // hide all
   
   document.getElementById("loader").style.display = "block";
   document.getElementById("new_req").innerHTML = "";
   
   var ref = database.database().ref("Requests");
   var ref1 = database.database().ref("Users");
   
   ref.once('value', function(snapshot){
      if(snapshot.numChildren() > 0) {
         var x,t,x1;
         var c = 0;
         snapshot.forEach(function(child){
            if(child.val() == 0){
               x = document.createElement("DIV");
               x1 = document.createElement("H4");
               t = document.createTextNode(child.key);
               x1.appendChild(t);
               x.appendChild(x1);
               
               x1 = document.createElement("INPUT");
               x1.setAttribute("type", "button");
               x1.setAttribute("value", "APPROVE");
               x1.setAttribute("style", "background-color: #23a455;border: none;color: white;text-align: center;text-decoration: none;font-weight: bold;padding: 10px 10px;");
               x1.setAttribute("class", child.key);
               x1.addEventListener("click", function(){
                  req(database,this.className,1);
               });
               x.appendChild(x1);
               
               x1 = document.createElement("INPUT");
               x1.setAttribute("type", "button");
               x1.setAttribute("value", "DECLINE");
               x1.setAttribute("style", "background-color: #c90000;border: none;color: white;text-align: center;text-decoration: none;font-weight: bold;padding: 10px 10px;");
               x1.setAttribute("class", child.key);
               x1.addEventListener("click", function(){
                  req(database,this.className,0);
               });
               x.appendChild(x1);
               
               x1 = document.createElement("BR");
               x.appendChild(x1);
               
               x1 = document.createElement("BR");
               x.appendChild(x1);
               
               document.getElementById("new_req").appendChild(x);
            }else{
               c++;
            }
         });
         if(snapshot.numChildren() == c){
            x = document.createElement("H4");
            t = document.createTextNode("No new requestes.");
            x.appendChild(t);
            document.getElementById("new_req").appendChild(x);
         }
         document.getElementById("loader").style.display = "none";
      }else{
         var x = document.createElement("H4");
         var t = document.createTextNode("No new requestes.");
         document.getElementById("new_req").appendChild(x);
         document.getElementById("loader").style.display = "none";
      }
   });
   
   
   
   ref1.once('value', function(snapshot){
      if(snapshot.numChildren() > 0) {
         var x,t,x1;
         x1 = document.createElement("H3");
         t = document.createTextNode("Please select a user on the left.");
         x1.appendChild(t);
         document.getElementsByClassName("right_")[0].appendChild(x1);
         snapshot.forEach(function(email){
            email.forEach(function(name){
               if(name.key == "Name"){
                  x = document.createElement("DIV");
                  x.setAttribute("style","width: 50%;background-color:silver;text-align:center;padding-top:10px;padding-bottom:10px;margin-top:10px;");
                  x.addEventListener("click", function(){
                     u_click(database,name.val(),email.key);
                  });
                  x1 = document.createElement("H4");
                  t = document.createTextNode(name.val());
                  x1.appendChild(t);
                  x.appendChild(x1);
                  document.getElementsByClassName("left_")[0].appendChild(x);
               }
            });
         });
         
         document.getElementById("loader").style.display = "none";
      }else{
         var x = document.createElement("H4");
         var t = document.createTextNode("No registered users.");
         document.getElementsByClassName("left")[0].appendChild(x);
         document.getElementById("loader").style.display = "none";
      }
      document.getElementById("users").style.display = "block";
   });
}


function req(database, name, op){
   var ref = database.database().ref("Requests");
   
   if(op){
      var r = confirm("Confirming request?");
      if (r == true) {
         ref.child(name).set(1);
      }
   }else{
      var r = confirm("Deleting request?");
      if (r == true) {
         ref.child(name).remove();
      }
   }
   
   users(database);
}

function u_click(database, name, email){
   var ref = database.database().ref("Users");
   
   document.getElementsByClassName("right_")[0].innerHTML = "";
   var x = document.createElement("H3");
   var t = document.createTextNode(name);
   x.appendChild(t);
   
   document.getElementsByClassName("right_")[0].appendChild(x);
   
   x = document.createElement("H4");
   t = document.createTextNode(email.replace(",","."));
   x.appendChild(t);
   
   document.getElementsByClassName("right_")[0].appendChild(x);
   
   x = document.createElement("INPUT");
   x.setAttribute("type", "button");
   x.setAttribute("value", "DELETE");
   x.setAttribute("style", "background-color: #c90000;border: none;color: white;text-align: center;text-decoration: none;font-weight: bold;padding: 10px 10px;");
   x.addEventListener("click", function(){
      var r = confirm("Delete user?");
      if (r == true) {
         ref.child(email).remove();
      }
   });
   
   document.getElementsByClassName("right_")[0].appendChild(x);
}