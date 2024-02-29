import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user?.email);
      }
    });
  }, []);
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      //   const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    });
  };

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      //   const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    });
  };
  const logOut = () => {
    signOut(auth);
  };
  return (
    <FirebaseContext.Provider value={{ signUp, signIn, user, logOut, error }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
