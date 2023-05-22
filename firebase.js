import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: "AIzaSyAKn-4t2o2eG8gooe29TgeVWvKbNMScrQ8",
    authDomain: "childrensaid2.firebaseapp.com",
    projectId: "childrensaid2",
    storageBucket: "childrensaid2.appspot.com",
    messagingSenderId: "173429340767",
    appId: "1:173429340767:web:7f77e3087b87284a99f9ea"
  };
  
// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);


//Import in index...