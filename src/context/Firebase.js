import { createContext, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";

const FirebaseContext = createContext();

const googleProvider = new GoogleAuthProvider();

//firebase stuff...
const firebaseConfig = {
  apiKey: "AIzaSyDnKryq-zimf5_ijbTr_wDyb0yLQW6ksrU",
  authDomain: "learn-tech-f3e04.firebaseapp.com",
  projectId: "learn-tech-f3e04",
  storageBucket: "learn-tech-f3e04.appspot.com",
  messagingSenderId: "332866467756",
  appId: "1:332866467756:web:1d6e22eac3a2572a3b6c09",
  database: "https://learn-tech-f3e04-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
//...

const FirebaseProvider = ({ children }) => {
  //authentication
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signinWithGoggle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };
  const signIn = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => console.log("logged in Successfully"))
      .catch((err) => console.log(err));
  };
  //related to realtime database
  const putData = (key, data) => set(ref(database, key), data);

  get(child(ref(database), "root/a")).then((snapshot) =>
    console.log(snapshot.val())
  );

  // useEffect(() => {
  //   onValue(ref(database, "grandfather/father/child"), (snapshot) => {
  //     console.log(snapshot.val().name);
  //   });
  // }, []);

  return (
    <FirebaseContext.Provider
      value={{ signUp, signIn, putData, firebaseAuth, signinWithGoggle }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = () => useContext(FirebaseContext);

export { FirebaseProvider, useFirebase };
