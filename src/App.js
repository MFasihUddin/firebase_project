import "./App.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebase";

const firestore = getFirestore(app);

const writeData = () => {
  addDoc(collection(firestore, "cities"), {
    name: "peshawar",
    pinCode: 25000,
    lat: 34,
    long: 71,
  });
};

function App() {
  return (
    <div className="App">
      <h2>fireStore</h2>
      <buuton onClick={writeData}>put data</buuton>
    </div>
  );
}

export default App;
