import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header(props) {
  const handleclick = () => {
    props.onLogout();
  };

  return (
    <header>
      <div>
        <h1>
          <HighlightIcon />
          NoteKeep
        </h1>
        <div className="tagline">Notes Empower Ideas.</div>
      </div>
      <p className="userName">Welcome {props.name}</p>
      <button className="logoutbtn" onClick={handleclick}>
        LOGOUT
      </button>
    </header>
  );
}

export default Header;
