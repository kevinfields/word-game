import React from "react";
import "../styling/profilePage.css";

const UserHomePage = (props) => {
  return (
    <div className="page">
      <div className="user-profile-data">
        <div>Name: {props.user.displayName}</div>
        <div>Email: {props.user.email}</div>
        <div>ID: {props.user.uid}</div>
      </div>
    </div>
  );
};

export default UserHomePage;
