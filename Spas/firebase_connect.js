function database(){
   //Store information about firebase
   var config = {
      apiKey: "AIzaSyCG9okNBK9HCPr3egPA5Qx0046pOYf4E10",
      authDomain: "champ-56741.firebaseapp.com",
      databaseURL: "https://champ-56741.firebaseio.com",
      projectId: "champ-56741",
      storageBucket: "champ-56741.appspot.com",
      messagingSenderId: "844167969029",
      appId: "1:844167969029:web:ce40057af395c2bfd7df6c",
      measurementId: "G-9L1CK3QFB3"
   };

   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

   //initialize your firebase
   if (!firebase.apps.length) {
      firebase.initializeApp(config);
   }
   
   
   return firebase;
}