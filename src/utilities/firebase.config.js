import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  FacebookAuthProvider,
  GoogleAuthProvider
} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDRnsjdAisxjH7145o-ag-Aq4F5qtDGeUk",
  authDomain: "clikkle.firebaseapp.com",
  projectId: "clikkle",
  storageBucket: "clikkle.firebasestorage.app",
  messagingSenderId: "797750945571",
  appId: "1:797750945571:web:c7b8d8aca3c231a9dd0e96",
  measurementId: "G-7ELGJP1N41"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
