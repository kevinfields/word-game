import React from "react";
import { useNavigate } from "react-router-dom";

//props: display (button text), route (nav path), css (optional styling)

const NavButton = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className={props.css ? props.css : "general-nav-button"}
      onClick={() => navigate(props.route)}
    >
      {props.display}
    </div>
  );
};

export default NavButton;
