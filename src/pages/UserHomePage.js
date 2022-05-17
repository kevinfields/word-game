import React, {useState, useEffect} from "react";
import "../styling/profilePage.css";

const UserHomePage = (props) => {

  const [userData, setUserData] = useState({
    badges: [],
    completed: 0,
    highscores: 0,
  });

  const loadUserData = async () => {
    let data;
    await props.firestore.collection('users').doc(props.user.uid).get().then(doc => {
      data = doc.data();
    })
    setUserData({
      badges: data.badges,
      completed: data.completed,
      highscores: data.highscores,
    })
  }

  useEffect(() => {
    loadUserData();
  })

  return (
    <div className="page">
      <div className="user-profile-data">
        <div>Name: {props.user.displayName}</div>
        <div>Email: {props.user.email}</div>
        <div>ID: {props.user.uid}</div>
        <div>Completed Games: {userData.completed}</div>
        <div>Highscores: {userData.highscores}</div>
      </div>
      <div className='user-badges'>
        {userData.badges.map(item => (
          <div className='badge'>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHomePage;
