import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "./pages/HomePage";
import UserHomePage from "./pages/UserHomePage";
import WordlePage from "./pages/WordlePage";
import HighscoresPage from "./pages/HighscoresPage";
import LoginPage from "./pages/LoginPage";

firebase.initializeApp({
  apiKey: "AIzaSyCDIPx5WJITZbyZkx1z-GsU1-jy_LDH2lE",
  authDomain: "word-game-cd174.firebaseapp.com",
  projectId: "word-game-cd174",
  storageBucket: "word-game-cd174.appspot.com",
  messagingSenderId: "243810594812",
  appId: "1:243810594812:web:6a2b9a5600ca0ea9d68c79",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        {user ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route
              path={`/profile/${user.uid}`}
              element={<UserHomePage user={user} firestore={firestore} />}
            />
            <Route
              path="/wordle"
              element={<WordlePage user={user} firestore={firestore} />}
            />
            <Route
              path="/leaderboards/timed"
              element={<HighscoresPage user={user} firestore={firestore} mode={'timed'}/> }
            />
            <Route
              path='/leaderboards/first-tries'
              element={<HighscoresPage user={user} firestore={firestore} mode={'first tries'} />} 
            />
          </>
        ) : (
          <Route
            path="/login"
            element={
              <LoginPage
                auth={auth}
                nav={navigate}
                usersRef={firestore.collection("users")}
              />
            }
          />
        )}
      </Routes>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/home">Home</Link>
            <Link to={`/profile/${user.uid}`}>My Profile</Link>
            <Link to="/wordle">Wordle</Link>
            <Link to="/leaderboards/timed">Leaderboards</Link>
          </>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>
    </div>
  );
}

export default App;
