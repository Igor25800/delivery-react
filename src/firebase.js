import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyDQ8SD31DEHNd7arZoe0u4QI4xflnuWGDE",
    authDomain: "react-delivery-6beb5.firebaseapp.com",
    projectId: "react-delivery-6beb5",
    storageBucket: "react-delivery-6beb5.appspot.com",
    messagingSenderId: "263809899942",
    appId: "1:263809899942:web:9155b4e35b7e25801c4367"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);