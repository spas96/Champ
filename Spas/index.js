function user(database){
   document.getElementById("user_name").innerHTML = localStorage.getItem("name");

}

function logout(database){
   database.auth().signOut().then(function() {
      localStorage.setItem("name",0);
      window.location.href = "login.html";
   }, function(error) {
      console.log(error);
   });
     
}

function done(){
   var today = new Date();
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0');
   var yyyy = today.getFullYear();

   today = dd + '.' + mm + '.' + yyyy;
   
   document.getElementById("done_h").innerHTML = today + " - Needs to be done!";
}

function get_meals(database) {
   document.getElementById("loader").style.display = "block";
   var ref = database.database().ref("Meals");

   
   ref.on('value', function(snapshot) { 
      if(snapshot.numChildren() != 0){
         document.getElementById("right-sub").innerHTML = "";
         snapshot.forEach(function(childSnapshot) {
            var name=childSnapshot.key;
            
            var ingridient = [];
            var amount = [];
            var units = [];
            
            var preparation = [];
            
            var direction = [];
            
            var cooking_method = [];
            var cooking_time = [];
            var cooking_temp = [];
            
            var i=0;
            
            childSnapshot.child("Ingridients").forEach(function(childSnapshot1) {
               ingridient[i]=childSnapshot1.val();
               i++;
            });
            i=0;
            childSnapshot.child("Amount").forEach(function(childSnapshot1) {
               amount[i]=childSnapshot1.val();
               i++;
            });
            i=0;
            childSnapshot.child("Units").forEach(function(childSnapshot1) {
               units[i]=childSnapshot1.val();
               i++;
            });
            if(childSnapshot.child("Cooking_method").numChildren() != 0){
               i=0;
               childSnapshot.child("Cooking_method").forEach(function(childSnapshot1) {
                  cooking_method[i]=childSnapshot1.val();
                  i++;
               });
            }
            
            if(childSnapshot.child("Cooking_temperature").numChildren() != 0){
               i=0;
               childSnapshot.child("Cooking_temperature").forEach(function(childSnapshot1) {
                  cooking_temp[i]=childSnapshot1.val();
                  i++;
               });
            }
            
            if(childSnapshot.child("Preparation_method").numChildren() != 0){
               i=0;
               childSnapshot.child("Preparation_method").forEach(function(childSnapshot1) {
                  preparation[i]=childSnapshot1.val();
                  i++;
               });
            }
            if(childSnapshot.child("Directions").numChildren() != 0){
               i=0;
               childSnapshot.child("Directions").forEach(function(childSnapshot1) {
                  direction[i]=childSnapshot1.val();
                  i++;
               });
            }
            
            var main_div = document.getElementById("right-sub");
            var new_div = document.createElement("div");
            new_div.classList.add("meal");
            new_div.setAttribute("align", "left");
            
            var meal_name = document.createElement("H4");
            var t = document.createTextNode(name);
            meal_name.appendChild(t);
            meal_name.setAttribute("align", "center");
            
            var b = document.createElement("b");
            t = document.createTextNode("Ingridients");
            b.appendChild(t);
            
            var p;
            
            new_div.appendChild(meal_name);
            new_div.appendChild(b);
            
            i=0;
            while(i<ingridient.length){
               p = document.createElement("p");
               t = document.createTextNode(i+1 + ". " + ingridient[i] + " - " + amount[i] + units[i]);
               p.appendChild(t); 
               new_div.appendChild(p);

               i++;
            }
            
            if(preparation.length != 0){
               b = document.createElement("b");
               t = document.createTextNode("Preparation");
               b.appendChild(t);
               new_div.appendChild(b);
               
               i=0;
               while(i<preparation.length){
                  p = document.createElement("p");
                  t = document.createTextNode(i+1 + ". " + preparation[i]);
                  p.appendChild(t); 
                  new_div.appendChild(p);

                  i++;
               }
            }
            if(direction.length != 0){
               b = document.createElement("b");
               t = document.createTextNode("Directions");
               b.appendChild(t);
               new_div.appendChild(b);
               
               i=0;
               while(i<direction.length){
                  p = document.createElement("p");
                  t = document.createTextNode(i+1 + ". " + direction[i]);
                  p.appendChild(t); 
                  new_div.appendChild(p);

                  i++;
               }
            }
            
            
            if(cooking_method.length != 0){
               b = document.createElement("b");
               t = document.createTextNode("Cooking Method");
               b.appendChild(t);
               new_div.appendChild(b);
               
               i=0;
               while(i<cooking_method.length){
                  p = document.createElement("p");
                  t = document.createTextNode(i+1 + ". " + cooking_method[i]);
                  p.appendChild(t); 
                  if(childSnapshot.child("Cooking_time").numChildren() != 0){
                     i=0;
                     childSnapshot.child("Cooking_time").forEach(function(childSnapshot1) {
                        if(parseInt(childSnapshot1.key) == i+1){
                           t = document.createTextNode(" for " + childSnapshot1.val() + " min");
                           p.appendChild(t); 
                        }
                        i++;
                     });
                  }
                  if(childSnapshot.child("Cooking_temperature").numChildren() != 0){
                     i=0;
                     childSnapshot.child("Cooking_temperature").forEach(function(childSnapshot1) {
                        if(parseInt(childSnapshot1.key) == i+1){
                           t = document.createTextNode(" at " + childSnapshot1.val());
                           if(!isNaN(childSnapshot1.val())){
                              t.nodeValue += " °C";
                           }
                           p.appendChild(t); 
                        }
                        i++;
                     });
                  }
                  new_div.appendChild(p);

                  i++;
               }
            }
            
            main_div.appendChild(new_div);
            document.getElementById("loader").style.display = "none";
         
         });
      }else{
         document.getElementById("loader").style.display = "none";
      }
   });
   
}

function nosymbol(event){
   switch(event.key){
      case "-":
         alert("No Dashes!");
         event.preventDefault();
         break;
      case "(":
         alert("No Brackets!");
         event.preventDefault();
         break;
      case ")":
         alert("No Brackets!");
         event.preventDefault();
         break;
   }
}

function add_ingr(){
   if(document.getElementById("ingr_name").value != ""){   
      if(document.getElementById("ingr_amaont").value != "" && !isNaN(document.getElementById("ingr_amount").value)){
         if(document.getElementById("ingr_units").value != ""){
            document.getElementById("ingr_all").innerHTML += 
            document.getElementById("ingr_name").value + " - " + 
            document.getElementById("ingr_amount").value + " " + 
            document.getElementById("ingr_units").value + "\n";
         }else{
            alert("Ingridient unit is invalid");
         }
      }else{
         alert("Ingridient amaunt is invalid");
      }
   }else{
      alert("Ingridient name is invalid");
   }
}

function add_prep(){
   document.getElementById("prep_all").innerHTML += 
   document.getElementById("prep_method").value + "\n";
}

function add_cook(){
   document.getElementById("cook_all").innerHTML += document.getElementById("cook_method").value;
   if(document.getElementById("cook_time").value != ""){
      document.getElementById("cook_all").innerHTML += " for " + document.getElementById("cook_time").value + " min";
   }
   if(document.getElementById("cook_temp").value != ""){
      document.getElementById("cook_all").innerHTML += " at " + document.getElementById("cook_temp").value;
      if(!isNaN(document.getElementById("cook_temp").value)){
         document.getElementById("cook_all").innerHTML += " °C";
      }
   }
   document.getElementById("cook_all").innerHTML += "\n";
}

function add_dir(){
   document.getElementById("dir_all").innerHTML += 
   document.getElementById("dir").value + "\n";
}

function add_meal(database){
   if(document.getElementById("meal_name").value == ""){
      alert("No name");
   } else{
      if(document.getElementById("ingr_all").value == ""){
         alert("No ingridients");
      } else{
         if(localStorage.getItem("select") == null || localStorage.getItem("select") == "null"){
            alert("No type selected");
         } else{
            document.getElementById("loader").style.display = "block";
            var ref = database.database().ref("Meals/" + document.getElementById("meal_name").value);
            
            var data = "{\"Ingridients\" : {";
            
            var res = document.getElementById("ingr_all").value.split("\n");
            
            for(var i=0; i<res.length - 1;i++){
               data += "\"" + (i+1) + "\": \"" + res[i].split(" - ")[0] + "\"";
               if(res.length - 1 - i > 1){
                  data += ",";
               }
            }
            
            data += "}";
            
            data += 
            ",\"Amount\" : {";
            
            for(var i=0; i<res.length - 1;i++){
               data += "\"" + (i+1) + "\": \"" + res[i].split(" - ")[1].match(/\d*[\.\,]?\d+/g) + "\"";
               if(res.length - 1 - i > 1){
                  data += ",";
               }
            }
            
            data += "}";
            
            data += 
            ",\"Units\" : {";
            
            for(var i=0; i<res.length - 1;i++){
               data += "\"" + (i+1) + "\": \"" + res[i].split(" - ")[1].split(/\d*[\.\,]?\d+/g)[1] + "\"";
               if(res.length - 1 - i > 1){
                  data += ",";
               }
            }
            
            data += "}";
            
            res = document.getElementById("prep_all").value.split("\n");
            if(res.length > 1){
               data += 
               ",\"Preparation_method\" : {";
               
               for(var i=0; i<res.length - 1;i++){
                  data += "\"" + (i+1) + "\": \"" + res[i] + "\"";
                  if(res.length - 1 - i > 1){
                     data += ",";
                  }
               }
               
               data += "}";
            }
            
            res = document.getElementById("dir_all").value.split("\n");
            if(res.length > 1){
               data += 
               ",\"Directions\" : {";
               
               for(var i=0; i<res.length - 1;i++){
                  data += "\"" + (i+1) + "\": \"" + res[i] + "\"";
                  if(res.length - 1 - i > 1){
                     data += ",";
                  }
               }
               
               data += "}";
            }
               
            data += 
               ",\"Type\" : ";
               
            switch(parseInt(localStorage.getItem("select"))){
               case 0:
                  data += "\"Meat/Fish\"";
                  break;
               case 1:
                  data += "\"Vegetable\"";
                  break;
               case 2:
                  data += "\"Sauce\"";
                  break;
            }
            
            
            res = document.getElementById("cook_all").value.split("\n");
            if(res.length > 1){
               data += 
               ",\"Cooking_method\" : {";
               
               for(var i=0; i<res.length - 1;i++){
                  if(res[i].includes(" for ")){
                     data += "\"" + (i+1) + "\": \"" + res[i].split(" for ")[0] + "\"";
                     if(res.length - 1 - i > 1){
                        data += ",";
                     }
                  }else{
                     data += "\"" + (i+1) + "\": \"" + res[i] + "\"";
                     if(res.length - 1 - i > 1){
                        data += ",";
                     }
                  }
                  
               }
               
               data += "}";
               
               
               data += 
               ",\"Cooking_time\" : {";
               
               for(var i=0; i<res.length - 1;i++){
                  if(res[i].includes(" for ")){
                     if(res[i].includes(" at ")){
                        data += "\"" + (i+1) + "\": \"" + res[i].split(" min ")[0].match(/\d*[\.\,]?\d+/g) + "\"";
                        if(res.length - 1 - i > 1 && res[i+1].includes(" for ")){
                           data += ",";
                        }
                     }else{
                        data += "\"" + (i+1) + "\": \"" + res[i].match(/\d*[\.\,]?\d+/g) + "\"";
                        if(res.length - 1 - i > 1 && res[i+1].includes(" for ")){
                           data += ",";
                        }
                     }
                  }
                  
               }
               
               data += "}";
               
             
               
               
               
               data += 
               ",\"Cooking_temperature\" : {";
               
               for(var i=0; i<res.length - 1;i++){
                  if(res[i].includes(" at ")){
                     data += "\"" + (i+1) + "\": \"";
                     if (res[i].split(" min ")[1].match(/\d*[\.\,]?\d+/g) != null) {
                        data += res[i].split(" min ")[1].match(/\d*[\.\,]?\d+/g) + "\"";
                     }else{
                        data += res[i].split(" at ")[1] + "\"";
                     }
                     
                     if(res.length - 1 - i > 1 && res[i+1].includes(" at ")){
                        data += ",";
                     }
                  }
                  
               }
               
               data += "}";

            }
               
            data += "}";
            
            
            console.log(data);
            ref.set(JSON.parse(data));
            
            document.getElementById("loader").style.display = "none";
            localStorage.setItem("select", null);
            location.reload();
            
         }
      }
   }
   
}
      
function selectt(opt){
   switch(opt){
      case 0:
         document.getElementById("meat").classList.remove("fa-circle-o");
         document.getElementById("meat").classList.add("fa-check-circle-o");
         document.getElementById("vegetable").classList.remove("fa-check-circle-o");
         document.getElementById("vegetable").classList.add("fa-circle-o");
         document.getElementById("spice").classList.remove("fa-check-circle-o");
         document.getElementById("spice").classList.add("fa-circle-o");
         
         localStorage.setItem("select",0);
         break;
      case 1:
         document.getElementById("vegetable").classList.remove("fa-circle-o");
         document.getElementById("vegetable").classList.add("fa-check-circle-o");
         document.getElementById("meat").classList.remove("fa-check-circle-o");
         document.getElementById("meat").classList.add("fa-circle-o");
         document.getElementById("spice").classList.remove("fa-check-circle-o");
         document.getElementById("spice").classList.add("fa-circle-o");
         
         localStorage.setItem("select",1);
         break;
      case 2:
         document.getElementById("spice").classList.remove("fa-circle-o");
         document.getElementById("spice").classList.add("fa-check-circle-o");
         document.getElementById("meat").classList.remove("fa-check-circle-o");
         document.getElementById("meat").classList.add("fa-circle-o");
         document.getElementById("vegetable").classList.remove("fa-check-circle-o");
         document.getElementById("vegetable").classList.add("fa-circle-o");
         
         localStorage.setItem("select",2);
         break;
   }
}
      
