import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const FirebaseContext = createContext();

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
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const putData = (key, data) => set(ref(database, key), data);
  return (
    <FirebaseContext.Provider value={{ signUp, putData }}>
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = () => useContext(FirebaseContext);

export { FirebaseProvider, useFirebase };
