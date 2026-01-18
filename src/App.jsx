import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



function App() {

  const [name, setName] = useState();

  useEffect(() => {
    async function testFireStore() {
      const docRef = doc(db, "testCollection", "testDocument");
      const docSnap = await getDoc(docRef);

      //updates specific fields
      await updateDoc(docRef, {
        age: "9002",
        name: "Mary Poppins ++++"
      })


      if (docSnap.exists()) {
        setName(docSnap.data().name);
      } else {
        console.log("No such document!");
      }
    }

    testFireStore();
  }, []);


  return (
    <>

      <p>Firestore check {name}</p>
    </>
  )
}

export default App
