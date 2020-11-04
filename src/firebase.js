import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBcBd0aODhba5jD5bSxGIPoNPTE0BTS-5s",
  authDomain: "whatsapp-clone-afcc7.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-afcc7.firebaseio.com",
  projectId: "whatsapp-clone-afcc7",
  storageBucket: "whatsapp-clone-afcc7.appspot.com",
  messagingSenderId: "726134630064",
  appId: "1:726134630064:web:42459f3cdb183bef893d75",
  measurementId: "G-0BY408GBS5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
