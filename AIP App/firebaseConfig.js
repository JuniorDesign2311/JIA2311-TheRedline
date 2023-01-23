import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3-0h7kKniA5ttF684vPG4HQR3sTORcvM",
  authDomain: "junior-design-car-app.firebaseapp.com",
  databaseURL: "https://junior-design-car-app-default-rtdb.firebaseio.com/",
  projectId: "junior-design-car-app",
  storageBucket: "junior-design-car-app.appspot.com",
  messagingSenderId: "667397897970",
  appId: "1:667397897970:web:89d56d40872b133d905a6b",
  measurementId: "G-RKD7BV2X1W"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = firebase.auth();
export const db = firebase.firestore();

