import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const LoginPage = (props) => {
  const makeAccountIfNone = async (user) => {
    let data;
    await props.usersRef
      .doc(user.uid)
      .get()
      .then((doc) => {
        data = doc.data();
      });

    if (data !== undefined) {
      return;
    } else {
      await props.usersRef.doc(user.uid).set({
        ...data,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        id: user.uid,
      });
    }
  };

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider).then((data) => {
      makeAccountIfNone(data.user);
      props.nav(`/profile/${data.user.uid}`);
    });
  };

  return (
    <div className="page">
      <button onClick={() => login()}>Log In or Sign Up</button>
    </div>
  );
};

export default LoginPage;
