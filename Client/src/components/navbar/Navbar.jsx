import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
// import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useSelector } from "react-redux";



const Navbar = () => {

  

  // const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const user = useSelector(state=>state.user);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>ChatZap</h1>
        </Link>
      </div>
      <div className="right">
        <div className="user">
        
          <img
            src={user.profilePicture}
            alt=""
          />
          <Link  to={`/profile/${user._id}`}
                style={{ textDecoration: "none", color: "inherit" }}>
          <span>{user?.username}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;