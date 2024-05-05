import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAtW4hcGcLXYMEp9ijIWLV528dj7sWoeRU",
    authDomain: "superchat-80267.firebaseapp.com",
    projectId: "superchat-80267",
    storageBucket: "superchat-80267.appspot.com",
    messagingSenderId: "1086771148059",
    appId: "1:1086771148059:web:58979a9db92982e3680fbe"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);