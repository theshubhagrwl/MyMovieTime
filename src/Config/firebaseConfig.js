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

const docRef = db.collection("movies");
export const getMovieData = (userId) => {
  return db.collection("movies").doc(userId).get();
  // .then((doc) => {
  //   var data;
  //   if (doc.exists) {
  //     // console.log("doc data: ", doc.data());
  //     data = doc.data();
  //     console.log(data);
  //     return data;
  //   } else {
  //     console.log("doc not found");
  //   }
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// export const logOut = () => {
//   auth
//     .signOut()
//     .then(() => {
//       console.log("logged out");
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };
