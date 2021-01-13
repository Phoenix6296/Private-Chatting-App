import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDQfu7Ymh3KcpKEWnxBL33ZEQJ1YHwVHV4",
    authDomain: "facebook-messenger-clone-9733.firebaseapp.com",
    projectId: "facebook-messenger-clone-9733",
    storageBucket: "facebook-messenger-clone-9733.appspot.com",
    messagingSenderId: "114773571726",
    appId: "1:114773571726:web:041c369f03e4f7ca1671df",
    measurementId: "G-63MKX0MTQZ"
});
const db = firebase.firestore();
export default db;