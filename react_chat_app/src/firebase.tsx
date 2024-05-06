import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAOaF2oU8RlBmg4RpQcn8oQZcTaI0xIins",
    authDomain: "bom-random.firebaseapp.com",
    databaseURL: "https://bom-random-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bom-random",
    storageBucket: "bom-random.appspot.com",
    messagingSenderId: "638764103869",
    appId: "1:638764103869:web:60ec5a50cb5814a6601fd4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const rtdb = getDatabase();