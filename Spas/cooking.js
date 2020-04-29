const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];



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
   
   //document.getElementById("done_h").innerHTML = today + " - Needs to be done!";
}

function set_timer(){ 
   
   
   if(isMobile()){
      [].forEach.call(document.querySelectorAll('.but_timer'), function(change) {
         change.ontouchstart = function() {
            set_timer_func(change);
         }
      });
   }else{
      [].forEach.call(document.querySelectorAll('.but_timer'), function(change) {
         change.onmousedown = function() {
            set_timer_func(change);
         }
      });
   }   
}

function set_timer_func(change){
   var timeout,interval;
   var dir = change.className.includes("plus");
   var elem = change.parentNode.getElementsByTagName('p')[0];

   if(dir){
      if(parseInt(elem.innerHTML) < 59){
         elem.innerHTML = n(parseInt(elem.innerHTML)+1);
      }
   }else{
      if(parseInt(elem.innerHTML) > 0){
         elem.innerHTML = n(parseInt(elem.innerHTML)-1);
      }
   }
   
   timeout = setTimeout(function() {
      interval = setInterval(function() {
         if(dir){
            if(parseInt(elem.innerHTML) < 59){
               elem.innerHTML = n(parseInt(elem.innerHTML)+1);
            }
         }else{
            if(parseInt(elem.innerHTML) > 0){
               elem.innerHTML = n(parseInt(elem.innerHTML)-1);
            }
         }
      }, 100);    
   }, 30);

   change.addEventListener('mouseup', clearTimers);
   change.addEventListener('mouseleave', clearTimers);
   change.addEventListener('touchend', clearTimers);
   change.addEventListener('touchmove', clearTimers);
   
   function clearTimers() {
      clearTimeout(timeout);
      clearInterval(interval);
   }
}

function isMobile() {
   if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      || navigator.userAgent.match(/Opera Mini/i)
      || navigator.userAgent.match(/IEMobile/i)
      ) {
      return true;
   } else{
      return false;
   }
}

function start_timer(){
   var h = document.getElementById("timer").getElementsByTagName('p')[0];
   var m = document.getElementById("timer").getElementsByTagName('p')[1];
   var s = document.getElementById("timer").getElementsByTagName('p')[2];
   
   if(document.getElementById("but_start").value == "STOP"){
      document.getElementById("but_start").value = "START";
   }else{
      document.getElementById("but_start").value = "STOP";
   }
   var x = setInterval(function() {
      if(document.getElementById("but_start").value == "STOP"){
         if(s.innerHTML > 0){
            s.innerHTML = n(parseInt(s.innerHTML) - 1);
         }else{
            if(m.innerHTML > 0){
               m.innerHTML = n(parseInt(m.innerHTML) - 1);
               s.innerHTML = 59;
            }else{
               if(h.innerHTML > 0){
                  h.innerHTML = n(parseInt(h.innerHTML)) - 1;
                  m.innerHTML = 59;
                  s.innerHTML = 59;
               }else{
                  var audio = document.getElementById("alarm");
                  audio.pause();
                  audio.currentTime = 0;
                  audio.play();
                  clearInterval(x);
                  document.getElementById("but_start").value = "START";
               }
            }
         }
      }else{
         document.getElementById("timer").getElementsByTagName('p')[0].innerHTML = "00";
         document.getElementById("timer").getElementsByTagName('p')[1].innerHTML = "00";
         document.getElementById("timer").getElementsByTagName('p')[2].innerHTML = "00";
         clearInterval(x);
      }
   }, 1000);
}

function set_time(database, cl){
   var d = new Date();
   document.getElementById("time_e").innerHTML = n(d.getHours()) + ":" + n(d.getMinutes()) + ":" + n(d.getSeconds());
   document.getElementById("date_e").innerHTML = d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();

   document.getElementById("loader").style.display = "block";
   document.getElementById("board").style.display = "none"; 
   
   if(typeof cl == 'undefined'){
      check_db(new Date(d.getFullYear(), d.getMonth(), d.getDate()),database,document.getElementById("drd_sel").innerHTML);
   }else{
      if(cl.innerHTML == "Vegetable" || cl.innerHTML == "Meat/Fish" || cl.innerHTML == "Sauce"){
         check_db(new Date(d.getFullYear(), d.getMonth(), d.getDate()),database,document.getElementById("drd_sel").innerHTML);
      }else{
         cooking(database);
      }
   }
   
   var x = setInterval(function() {
      d = new Date();
      document.getElementById("time_e").innerHTML = n(d.getHours()) + ":" + n(d.getMinutes()) + ":" + n(d.getSeconds());
   }, 1000);
   
}

function n(n){
   if(n < 10){
      return "0" + n;
   }else{
      return n;
   }
}

function change_date(dir,database){
   var d = new Date();
   var current = document.getElementById("date_e").innerHTML;
   var temp = current.split(" ");
   
   current = new Date(temp[2],parseInt(monthNames.indexOf(temp[1])),temp[0]);
   var change_day = new Date(current);
   
   if(dir){
      change_day.setDate(current.getDate() + 1);
      
   }else{
      if(current > new Date(d.getFullYear(),d.getMonth(),d.getDate())){
         change_day.setDate(current.getDate() - 1);
      }
   }
   document.getElementById("date_e").innerHTML = change_day.getDate() + " " + monthNames[change_day.getMonth()] + " " + change_day.getFullYear();

   if(document.getElementById("drd_sel").innerHTML.includes("Cooking")){
      cooking(database);
   }else{
      check_db(change_day,database,document.getElementById("drd_sel").innerHTML);
   }
}
//var meals = [];
function check_db(date,database,type){
   type = type.split("<")[0];
   if(date == 0){
      date = new Date();
   }
   var meals = [];
   var num_meals = [];
   var ingredients_all = [];
   var amount_all = [];
   var units_all = [];
   var ingredients = [];
   var amount = [];
   var units = [];
   var flag = false;
   var x,t;
   
   var ref1 = database.database().ref();
   var ref2 = ref1.child("Calendar/"+date.getDate()+"-"+monthNames[date.getMonth()]+"-"+date.getFullYear());
   var ref3 = ref1.child("Meals");
   var ref4;
   
   document.getElementById("loader").style.display = "block";
   document.getElementById("board").style.display = "none"; 
   document.getElementById("readytocook").style.display = "none"; 
   
  
   ref2.once('value', function(snapshot1) {
      document.getElementById("ingredients_need").innerHTML = "";
      if(snapshot1.numChildren() > 0){
         ref2.on('value', function(snapshot) {
            snapshot.forEach(function(child){
               meals.push(child.key);
               num_meals.push(child.val());
            });
            
            var del = [];
            var q = 0;
            meals.forEach(function(m,idx1,array1){
               check_type(database,m).then(function(t){
                  if(t.val() == type){
                     q++;
                     ingr(database,m).then(function(x){
                        var last = x.numChildren();
                        x.forEach(function(i){
                           ingredients_all.push(i.val());
                           get_amount(database,m,i.key).then(function(a){
                              amount_all.push(parseFloat(a.val()) * parseFloat(num_meals[idx1]));
                              get_units(database,m,i.key).then(function(u){
                                 units_all.push(u.val());
                                 get_units(database,m,i.key).then(function(u){
                                    if (q === meals.length - del.length){
                                       last -= 1;
                                       if(last == 0){
                                          var len = ingredients_all.length;
                                          for(var i=0;i<len;i++){
                                             if(!ingredients.includes(ingredients_all[i])){
                                                ingredients.push(ingredients_all[i]);
                                                amount.push(amount_all[i]);
                                                units.push(units_all[i]);
                                             }else{
                                                if(units[ingredients.indexOf(ingredients_all[i])] == units_all[i]){
                                                   amount[ingredients.indexOf(ingredients_all[i])] = parseFloat(amount[ingredients.indexOf(ingredients_all[i])]) + parseFloat(amount_all[i]);
                                                }else{
                                                   ingredients.push(ingredients_all[i]);
                                                   amount.push(amount_all[i]);
                                                   units.push(units_all[i]);
                                                }
                                                
                                             }
                                             
                                          }
                                          
                                          document.getElementById("ingredients_need").innerHTML = "";
                                          for(var i=0;i<ingredients.length;i++){
                                             x = document.createElement("LI");
                                             x.setAttribute("id", "ingr");
                                             t = document.createTextNode(ingredients[i] + " - " + amount[i] + " " + units[i]);
                                             x.appendChild(t);
                                             document.getElementById("ingredients_need").appendChild(x);
                                          }
                                          //alert(del.length);
                                          for(var i=del.length;i>0;i--){
                                             meals.splice(del[i-1],1);
                                             num_meals.splice(del[i-1],1);
                                          }
                                          
                                          get_meals(database,meals,num_meals);
                                          document.getElementById("empty").style.display = "none"; 
                                          var el = document.getElementById("readay_to_cook");
                                          if (typeof(el) != 'undefined' && el != null){
                                             el.style.display = "none";
                                          }
                                          document.getElementById("board").style.display = "flex";
                                          document.getElementById("loader").style.display = "none";
                                       }
                                    }
                                    
                                 });
                              });
                           });
                           
                           
                        });
                        
                     });
                  }else{
                     del.push(idx1);
                     if(del.length == meals.length){
                        document.getElementById("empty").style.display = "block"; 
                        document.getElementById("board").style.display = "none";
                        document.getElementById("loader").style.display = "none";
                     }
                  }
               });
               
            });

        
            
            
         
         
            
            
         });
         
      }else{
         document.getElementById("empty").style.display = "block"; 
         document.getElementById("board").style.display = "none";
         document.getElementById("loader").style.display = "none";
      }
      
      
      
   });
   
   
}

function amount_units(database,meal,ingredient,a_u){
   var ref1 = database.database().ref("Meals/"+meal+"/Ingridients");
      
   ref1.on('value', function(snapshot){
      snapshot.forEach(function(child){
         if(child.val()==ingredient){
            if(a_u){ //if called for amount
               var ref2 = database.database().ref("Meals/"+meal+"/Amount/"+child.key);
               
               ref2.once('value', function(snapshot1){
                  return snapshot1.val();
               });
            }else{ // if called for units
               var ref2 = database.database().ref("Meals/"+meal+"/Units/"+child.key);
               
               ref2.once('value', function(snapshot1){
                  return snapshot1.val();
               });
            }
            
            
            
            
         }
      });
   });
   
}

function get_meals(database,meals,num_meals) {
   document.getElementById("loader").style.display = "block";
   
   
   var ref = database.database().ref("Meals");

   var fl = true;
   if(document.getElementById("drd_sel").innerHTML.includes("Cooking")){
      fl = false;
   }
   
   ref.on('value', function(snapshot) { 
      if(snapshot.numChildren() != 0){
         document.getElementById("right_b").innerHTML = "";
         
         if(fl){
            var i = document.createTextNode("Click on meals to mark them as ready to cook.");
            document.getElementById("right_b").appendChild(i);
         }
         
         snapshot.forEach(function(childSnapshot) {
            
            if(meals.includes(childSnapshot.key)){
            
               if(num_meals[meals.indexOf(childSnapshot.key)] == 1){
                  var name=childSnapshot.key;
                  if(fl){
                      name += " - " + num_meals[meals.indexOf(childSnapshot.key)] + " Portion";
                  }
               }else{
                  var name=childSnapshot.key;
                  if(fl){
                      name += " - " + num_meals[meals.indexOf(childSnapshot.key)] + " Portions";
                  }
               }
               
               if(fl){
                  var ingridient = [];
                  var amount = [];
                  var units = [];
                  
                  var preparation = [];
               }
               
               
               
               var direction = [];
               
               var cooking_method = [];
               var cooking_time = [];
               var cooking_temp = [];
               
               var i=0;
               if(fl){
                  childSnapshot.child("Ingridients").forEach(function(childSnapshot1) {
                     ingridient[i]=childSnapshot1.val();
                     i++;
                  });
                  i=0;
                  childSnapshot.child("Amount").forEach(function(childSnapshot1) {
                     amount[i]=childSnapshot1.val() * num_meals[meals.indexOf(childSnapshot.key)];
                     i++;
                  });
                  i=0;
                  childSnapshot.child("Units").forEach(function(childSnapshot1) {
                     units[i]=childSnapshot1.val();
                     i++;
                  });
               }
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
               if(fl){
                  if(childSnapshot.child("Preparation_method").numChildren() != 0){
                     i=0;
                     childSnapshot.child("Preparation_method").forEach(function(childSnapshot1) {
                        preparation[i]=childSnapshot1.val();
                        i++;
                     });
                  }
               }
               if(childSnapshot.child("Directions").numChildren() != 0){
                  i=0;
                  childSnapshot.child("Directions").forEach(function(childSnapshot1) {
                     direction[i]=childSnapshot1.val();
                     i++;
                  });
               }
               
               var main_div = document.getElementById("right_b");
               var new_div = document.createElement("div");
               new_div.classList.add("meal");
               new_div.setAttribute("align", "left");
              
               
               var meal_name = document.createElement("H4");
               var t = document.createTextNode(name);
               meal_name.appendChild(t);
               meal_name.setAttribute("align", "center");
               
               new_div.appendChild(meal_name);
               
               if(fl){
                  var b = document.createElement("b");
                  t = document.createTextNode("Ingridients");
                  b.appendChild(t);
                  
                  var p;
                  
                  
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
               
               if(fl){
                  new_div.onclick = function (elem) {
                     var d = document.getElementById("date_e").innerHTML.split(" ");
                     
                     if(this.style.background == "lightgreen"){
                        this.style = "background: none";
                        if(document.getElementById('drd_sel').innerHTML.includes("Meat")){
                           database.database().ref("ReadyToCook/" + d[0] + "-" + d[1] + "-" + d[2] +"/Meat/" + this.getElementsByTagName("h4")[0].innerHTML.split(" - ")[0]).remove();
                        }else{
                           if(document.getElementById('drd_sel').innerHTML.includes("Vegetable")){
                              database.database().ref("ReadyToCook/" + d[0] + "-" + d[1] + "-" + d[2] +"/Vegetable/" + this.getElementsByTagName("h4")[0].innerHTML.split(" - ")[0]).remove();
                           }else{
                              database.database().ref("ReadyToCook/" + d[0] + "-" + d[1] + "-" + d[2] +"/Sauce/" + this.getElementsByTagName("h4")[0].innerHTML.split(" - ")[0]).remove();
                           }
                        }
                     }else{
                        this.style = "background: lightgreen";
                        if(document.getElementById('drd_sel').innerHTML.includes("Meat")){
                           database.database().ref("ReadyToCook/" + d[0] + "-" + d[1] + "-" + d[2] +"/Meat/" + this.getElementsByTagName("h4")[0].innerHTML.split(" - ")[0]).set(this.getElementsByTagName("h4")[0].innerHTML.split(" - ")[1].split(" ")[0]);
                        }else{
                           if(document.getElementById('drd_sel').innerHTML.includes("Vegetable")){
                              database.database().ref("ReadyToCook/" + d[0] + "-" + d[1] + "-" + d[2] +"/Vegetable/" + this.getElementsByTagName("h4")[0].innerHTML.split(" - ")[0]).set(this.getElementsByTagName("h4")[0].innerHTML.split(" - ")[1].split(" ")[0]);
                           }else{
                              if(document.getElementById('drd_sel').innerHTML.includes("Sauce")){
                                 database.database().ref("ReadyToCook/" + d[0] + "-" + d[1] + "-" + d[2] +"/Sauce/" + this.getElementsByTagName("h4")[0].innerHTML.split(" - ")[0]).set(this.getElementsByTagName("h4")[0].innerHTML.split(" - ")[1].split(" ")[0]);
                              }
                           }
                        }
                     }
                  };
               }
               
               
            
               main_div.appendChild(new_div);
               document.getElementById("loader").style.display = "none";
               
            
            }
         
         });
         document.getElementById("loader").style.display = "none";
      }else{
         document.getElementById("loader").style.display = "none";
      }
   });
   
}

function ingr(database,meal){
   return database.database().ref("Meals/"+meal+"/Ingridients").once("value");
}

function get_amount(database,meal,ingredient){
   return database.database().ref("Meals/"+meal+"/Amount/"+ingredient).once("value");
}

function get_units(database,meal,ingredient){
   return database.database().ref("Meals/"+meal+"/Units/"+ingredient).once("value");
}

function check_type(database,meal,type){
   return database.database().ref("Meals/"+meal+"/Type").once("value");
}


function cooking(database){
   var d = document.getElementById("date_e").innerHTML.split(" ");
   var x,t;
   var meals = [];
   
   var ref1 = database.database().ref("ReadyToCook/" + d[0] + "-" + d[1] + "-" + d[2]);
   var ref2 = database.database().ref("Timers");
   
   var el = document.getElementById("readay_to_cook");
   if (typeof(el) != 'undefined' && el != null){
      el.innerHTML = "";
   }else{
      x = document.createElement("DIV");
      x.style = "padding-left:10%;";
      x.setAttribute("id", "readay_to_cook");
      document.getElementById("left_b").insertBefore(x,document.getElementById("ingredients_need"));
   }
   
   document.getElementById("ingredients_need").innerHTML = "";
   document.getElementById("right_b").innerHTML = "";
   document.getElementById("meals_table").innerHTML = "";
   
   
   
      
   ref1.on('value', function(snapshot){
      if(snapshot.numChildren() > 0) {
         document.getElementById("readytocook").style.display = "block";
         document.getElementById("timers").style.display = "block"; 
         
         x = document.createElement("TR");
         var x1 = document.createElement("TH");
         var t1 = document.createTextNode("Meal");
         x1.appendChild(t1);
         var x2 = document.createElement("TH");
         var t2 = document.createTextNode("Left");
         x2.appendChild(t2);
         var x3 = document.createElement("TH");
         var t3 = document.createTextNode("Prepare");
         x3.appendChild(t3);
         
         x.appendChild(x1);
         x.appendChild(x2);
         x.appendChild(x3);
         
         
         document.getElementById("meals_table").appendChild(x);
         var flag = true;
         snapshot.forEach(function(child){
            x = document.createElement("TR");
            x1 = document.createElement("TH");
            t1 = document.createTextNode(child.key);
            x1.appendChild(t1);
            x.appendChild(x1);
            document.getElementById("meals_table").appendChild(x);
            
            child.forEach(function(child1){
               meals.push(child1.key);
               x = document.createElement("TR");
               x1 = document.createElement("TD");
               x1.setAttribute("class", "meals");
               t1 = document.createTextNode(child1.key);
               x1.appendChild(t1);
               x2 = document.createElement("TD");
               t2 = document.createTextNode(child1.val());
               x2.appendChild(t2);
               x3 = document.createElement("TD");
               var x4 = document.createElement("INPUT");
               x4.setAttribute("type", "text");
               x4.setAttribute("class", "input");
               x4.setAttribute("name", child.key);
               if(flag){
                  x4.setAttribute("value", child1.val());
               }else{
                  x4.setAttribute("value", 0);
               }
               flag = false;
               x4.setAttribute("size", "2");
               x3.appendChild(x4);
               
               x.appendChild(x1);
               x.appendChild(x2);
               x.appendChild(x3);
         
               document.getElementById("meals_table").appendChild(x);
            });
   
         });
         document.getElementById("timerr").addEventListener("click", function(){
            if(document.getElementById("timerr").checked){
               document.getElementById("timer_meal").style.display = "block";
               document.getElementById("but_cook").style = "background-color: #23a455;border: none;color: white;padding-top: 10px;padding-bottom: 10px;text-align: center;text-decoration: none;font-weight: bold;font-size: 20px;margin-left: 85px;margin-top: 100px;";
            }else{
               document.getElementById("timer_meal").style.display = "none";
               document.getElementById("but_cook").style = "background-color: #23a455;border: none;color: white;padding-top: 10px;padding-bottom: 10px;text-align: center;text-decoration: none;font-weight: bold;font-size: 20px;margin-left: 85px;";
            }
         });
      }else{         
         document.getElementById("readytocook").style.display = "none";
         document.getElementById("empty").style.display = "block"; 
         document.getElementById("timers").style.display = "none"; 
      }
      
      get_meals(database,meals,meals.length) 
   });

   document.getElementById("timers").innerHTML = "";
   ref2.on('value', function(snapshot){
      var x;
      var t;
      //alert(snapshot.k);
      //if(snapshot.numChildren() > 0) {
      
      if(snapshot.numChildren() > 0) {
         var d = new Date();
         var p = 0;
         snapshot.forEach(function(child){
            
            var last_time = parseInt(child.child("time").val().split(":")[0]) * 3600 + parseInt(child.child("time").val().split(":")[1]) * 60 + parseInt(child.child("time").val().split(":")[2]);
            var now = parseInt(d.getHours()) * 3600 + parseInt(d.getMinutes()) * 60 + parseInt(d.getSeconds());
            var timer = parseInt(child.child("timer").val().split(":")[0]) * 3600 + parseInt(child.child("timer").val().split(":")[1]) * 60 + parseInt(child.child("timer").val().split(":")[2]);

            if(timer > now - last_time){
               var h = parseInt((timer - (now - last_time)) / 3600);
               var m = parseInt((timer - (now - last_time)) / 60) - (h * 60);
               var s = parseInt(timer - (now - last_time)) - (m * 60);
               
               
               x = document.createElement("B");
               x.setAttribute("id", child.key + "_h");
               t = document.createTextNode(child.key);
               x.appendChild(t);
               document.getElementById("timers").appendChild(x);
               x = document.createElement("BR");
               document.getElementById("timers").appendChild(x);
               
               
               
               x = document.createElement("P");
               x.setAttribute("id", child.key + "_t");
               t = document.createTextNode("Starting..");
               x.appendChild(t);
               document.getElementById("timers").appendChild(x);
               
               
               run_timers(child.key + "_t",h,m,s,database);

            }else{
               p++;
               
               if(p == snapshot.numChildren() && p > 0){
                  x = document.createElement("B");
                  t = document.createTextNode("No timers set.");
                  x.appendChild(t);
                  document.getElementById("timers").appendChild(x);
                  
               }
               
               document.getElementById("loader").style.display = "none";
            }
            
            
            x = document.createElement("BR");
            document.getElementById("timers").appendChild(x);
            x = document.createElement("BR");
            document.getElementById("timers").appendChild(x);
         }); 
      }else{
         x = document.createElement("B");
         t = document.createTextNode("No timers set.");
         x.appendChild(t);
         document.getElementById("timers").appendChild(x);
         
         document.getElementById("loader").style.display = "none";
      }
   });
   
   document.getElementById("board").style.display = "flex";
   document.getElementById("empty").style.display = "none"; 
   document.getElementById("loader").style.display = "none";
   
}

function run_timers(id,h,m,s,database) {
   var el = document.getElementById(id);
   
   var x = setInterval(function() {
      if(s > 0){
         s = s - 1;
      }else{
         if(m > 0){
            m = m - 1;
            s = 59;
         }else{
            if(h > 0){
               h = h - 1;
               m = 59;
               s = 59;
            }else{
               clearInterval(x);
               var audio = document.getElementById("alarm");
               audio.pause();
               audio.currentTime = 0;
               audio.play();
               el.innerHTML = "Please Check!";
               el.remove();
               document.getElementById(id.split("_")[0] + "_h").remove();
               
               var ref = database.database().ref("Timers");
               ref.child(id.split("_")[0]).remove();
            }
         }
      }
      el.innerHTML = n(h) + ":" + n(m) + ":" + n(s);
      
   }, 1000);
}

function cook(database){
   //alert(document.getElementById("trayorhob").value);
   //alert(document.getElementById("timerr").checked);
   
   var inputs = document.getElementsByClassName("input");
   var meals = document.getElementsByClassName("meals");
   var ref;
   var date = document.getElementById("date_e").innerHTML.replace(/ /g, "-");
   var new_val;
   var name;
   var flag = true;
   var mea;
   ref = database.database().ref("ReadyToCook/" + date);
   ref.once('value', function(snapshot){
      for(var i=0;i<meals.length;i++){
         if(inputs[i].value != 0){
            if(parseInt(snapshot.child(inputs[i].name).child(meals[i].innerHTML).val()) > parseInt(inputs[i].value)){
               new_val = parseInt(snapshot.child(inputs[i].name).child(meals[i].innerHTML).val()) - parseInt(inputs[i].value);
               name = inputs[i].name;
               mea = meals[i].innerHTML;
               document.getElementById("meals_table").innerHTML = "";
               ref.child(name).child(mea).set(new_val);
            }else{
               if(flag){
                  name = inputs[i].name;
                  mea = meals[i].innerHTML;
                  document.getElementById("meals_table").innerHTML = "";
                  ref.child(name).child(mea).remove();
                  flag = false;
               }
            }
         }
      }
   });
   
   
   if(document.getElementById("timerr").checked) {
      var h = document.getElementById("t_h").innerHTML;
      var m = document.getElementById("t_m").innerHTML;
      var s = document.getElementById("t_s").innerHTML;
      
      document.getElementById("timers").innerHTML = "";
      
      ref1 = database.database().ref("Timers");
      
      for(var i=0;i<meals.length;i++){
         if(inputs[i].value != 0){
            var name = meals[i].innerHTML;
            break;
         }
      }
      
      var d = new Date();
      
      ref1.child(name).once('value', function(snapshot){
         //if(!snapshot.exists()){
            ref1.child(name).child("time").set(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
            ref1.child(name).child("timer").set(h + ":" + m + ":" + s);
            
            h = "00";
            m = "00";
            s = "00";
         //}
      });
      
      
      
      
   }
     
}
