import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyA5R7YMUtJ13jz7W94vn_JTD1jY27dyzq8",
  authDomain: "capcool.firebaseapp.com",
  projectId: "capcool",
  storageBucket: "capcool.firebasestorage.app",
  messagingSenderId: "737780948517",
  appId: "1:737780948517:web:13f25dd21fad4eb179e9cc",
  measurementId: "G-5G1LRRCCD8",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
