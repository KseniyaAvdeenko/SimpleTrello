import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, collection, getDocs,  } from "firebase/firestore";


export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;


//delete array from an array
export async function deleteItem(db: any, mainCollection: string, document: string, key: string, item: any) {
    await updateDoc(doc(db, mainCollection, document), {
        [key]: arrayRemove(item)
    });
}

