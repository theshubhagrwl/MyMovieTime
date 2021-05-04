import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const db = firebase.firestore();
export const addMovieData = (data, userId) => {
  db.collection("movies")
    .doc(userId)
    .set({ data })
    .then(() => {
      console.log("Document written successfully: ");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const getMovieData = (userId) => {
  return db.collection("movies").doc(userId).get();
};

export const deleteMovie = (data, userId) => {
  var movieRef = db.collection("movies").doc(userId);
  movieRef.update({
    data: firebase.firestore.FieldValue.arrayRemove(data),
  });
};

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
