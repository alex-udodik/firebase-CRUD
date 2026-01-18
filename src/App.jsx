import './App.css'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { db, auth, app } from './lib/firebase';
import Todo from './components/Todo';


function App() {

  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //user is signed in
        setUser(currentUser)
      } else {
        //user is signed out
        setUser(null)
      }
    })

    return () => unsubscribe();
  })

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user);
        console.log('User signed up', userCredential.user);
      })
      .catch(error => {
        console.error('Error signing up', error);
      });
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user);
        console.log('User signed in:', userCredential.user);
      })
      .catch(error => {
        console.error('Error signing up:', error);
      });
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log('User signed out');
      })
      .catch(error => {
        console.error('Error signing out', error);
      });
  }


  return (
    <>


      <div>
        {
          !user && (
            <>
              <h1>Firestore Authentication</h1>
              <input type="text" placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)} />
              <input type="password" placeholder='Password' value={password} onChange={(event) => { setPassword(event.target.value) }} />
              <button onClick={signUp}>Sign up</button>
              <button onClick={signIn}>Sign in</button>
            </>
          )
        }

      </div>

      {
        user && (
          <div>

            <Todo />
            <p>Logged in as: {user.email}</p>
            <button onClick={logOut}>Sign out</button>

          </div>
        )
      }
    </>
  )
}

export default App
