
const firebaseConfig = {
  apiKey: "AIzaSyBbiuykY8xcEVeo4fRvftnH6-2G4x-bl2w",
  authDomain: "fit-mate-8457f.firebaseapp.com",
  databaseURL: "https://fit-mate-8457f.firebaseio.com",
  projectId: "fit-mate-8457f",
  storageBucket: "fit-mate-8457f.appspot.com",
  messagingSenderId: "245467537121",
  appId: "1:245467537121:web:c2c7d53fefe9147b"
};

const firebase = require("firebase");

firebase.initializeApp(firebaseConfig);

console.log("Hi");

console.log("test1");
firebase.firestore().collection('users').doc('doc1').get().then(doc => {
  console.log(doc.data());
  // console.log(doc("doc1"));
})

firebase.firestore().collection('users').doc().set({name: "Pradeep" , email: "paul@gmail.com"}).then(()=>{
  console.log("Done writing");
}

);
