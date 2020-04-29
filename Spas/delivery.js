function load(database){
   document.getElementById("user_name").innerHTML = localStorage.getItem("name");
   var ref = database.database().ref("Stock");
   document.getElementById("loader").style.display = "block";
   ref.on('value', function(snapshot){
      document.getElementById("stock_list").innerHTML = "";
      if(snapshot.numChildren() > 0) {
         var x;
         var t;
         
         var ul = document.createElement("UL");
         snapshot.forEach(function(child){
            child.forEach(function(child1){
               x = document.createElement("LI");
               t = document.createTextNode(child.key + " - " + child1.val() + " " + child1.key);
               x.appendChild(t);
               ul.appendChild(x);
            });
         });
         document.getElementById("stock_list").appendChild(ul);
      }else{
         document.getElementById("stock_list").innerHTML = "Noting in stock.";
      }
      document.getElementById("loader").style.display = "none";
   });

}


function add(database){
   var ingr = document.getElementById("ingredients").value;
   var amount = document.getElementById("amount").value;
   var units = document.getElementById("units").value;
   var flag = false;
   
   var ref = database.database().ref("Stock");
   ref.child(ingr).once('value', function(snapshot){
         snapshot.forEach(function(child1){
            if(snapshot.exists()){
               flag = true;
            }
         });
         if(flag){
            if(child1.key == units){
               ref.child(ingr).child(units).set(parseInt(amount) + parseInt(snapshot.child(child1.key).val()));
            }else{
               ref.child(ingr).child(units).set(amount);
            }
         }else{
            ref.child(ingr).child(units).set(amount);
         }
         
         
         ingr = "";
         amount = "";
         units = "";
   });
   
}