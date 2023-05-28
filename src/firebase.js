// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC_67D2Bkye6VkfBEY3x84epcmi10zEj3A",
    authDomain: "whatsapp-clone-4e150.firebaseapp.com",
    projectId: "whatsapp-clone-4e150",
    storageBucket: "whatsapp-clone-4e150.appspot.com",
    messagingSenderId: "570788954818",
    appId: "1:570788954818:web:7de6a74eb2cdbb9192f15b",
    measurementId: "G-GHXD77X4QY"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;