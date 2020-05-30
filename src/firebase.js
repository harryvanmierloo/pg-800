import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = db.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
            displayName,
            email,
            photoURL,
            ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await db.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

export const getLibrary = libraryId => {
    return db.collection('libraries')
        .doc(libraryId)
        .get();
};

export const getPatches = libraryId => {
    return db.collection('libraries')
        .doc(libraryId)
        .collection('patches')
        .get();
};

export const getPatch = (libraryId, patchId) => {
    return db.collection('libraries')
        .doc(libraryId)
        .collection('patches')
        .doc(patchId)
        .get();
};

export const addSysexBlob = (libraryId, type, name, values) => {
    const blob = firebase.firestore.Blob.fromUint8Array(new Uint8Array(values));
    return db.collection('libraries')
        .doc(libraryId)
        .collection('patches')
        .add({
            type: type,
            name: name,
            date: Date.now(),
            values: blob
        });
};

export const decodeBlob = blob => {
    let parsedData = blob ? blob.toUint8Array() : null;
    //console.log(parsedData);
    return parsedData;
}


