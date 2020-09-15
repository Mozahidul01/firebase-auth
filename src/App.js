import React, { useState } from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      photo: ''
  })

  const handleSubmit = () => {
    
  }

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
  }

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch(error => {
      console.log ('error.code');
      console.log ('error.message');
      console.log ('error.email');
      console.log ('error.credential');
    })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser);
      })
    .catch(error => {
      console.log ('error.code');
      console.log ('error.message');
      console.log ('error.email');
      console.log ('error.credential');
    })
  }

  return (
    <div className="app">
      <div className="email-login">
        <h2>Our own Authentication</h2>
        <form action="" method="get" onSubmit={handleSubmit}>
          <input onBlur={handleChange} className="email" type="email" name="email" placeholder="Your Email" required/>
          <br/>
          <input onBlur={handleChange} className="password" type="password" name="password" placeholder="Your Password" required/>
          <br/>
          <input className="login-btn" type="submit" value="Log In"/>
        </form>
      </div>

      <div className="google-login">
      {
        user.isSignedIn ? <button className="google-btn" onClick={handleSignOut}>Sign Out</button> 
        : <button className="google-btn" onClick={handleSignIn}>Sign In With Google</button>
      }

      {
        user.isSignedIn && 
        <div>
           <h2>Welcome, {user.name}</h2>
           <img src={user.photo} alt=""></img>
        </div>
      }
      </div>

    </div>
  );
}

export default App;
