import "./leftBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
// import { AuthContext } from "../../context/authContext";
// import { useContext } from "react";
import { useState } from 'react';
import { useContext } from "react";

import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useSelector,useDispatch, } from "react-redux";
// import { color } from "@mui/system";
import AddPost from "../../components/Addpost/AddPost";
import { setLogout } from "../../Redux/store";

const LeftBar = () => {


  // const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  

  const user = useSelector(state=>state.user);
  const { toggle, darkMode } = useContext(DarkModeContext);
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item" >
            <Link to="/">
             <HomeOutlinedIcon />
            </Link>
            <h4>Home</h4>
          </div>
          <div className="item">
            <Link to="/search">
            <SearchOutlinedIcon />
            </Link>
            <h4>Search</h4>
          </div>
          <div className="item">
            <Link to="/chat">
            <EmailOutlinedIcon />
            </Link>
            <h4>Messages</h4>
          </div>
          <div className="item">
            <Link to="/notifications">
            <NotificationsOutlinedIcon />
            </Link>
            <h4>Notification</h4>
          </div>
          <div className="item">
            <Link to={`/profile/${currentUser._id}`}>
            <PersonOutlinedIcon />
            </Link>
            <h4>Profile</h4>
          </div>
          <div className="item"  >
            <Link className="Link" to="/login" style={{textDecoration: 'none'}}>
            <h4 >
            {user ? (
              <h4 >
                <LogoutIcon onClick={() => dispatch(setLogout())}/>
              
            </h4>
            ) : (
              <button>
                <Link className="Link" to="/login" >
                  Login
                </Link>
              </button>
            )}
          </h4>
            </Link>
            <h4>LogOut</h4>
          </div>
          
          <AddPost/>
          <div className="item">
            <Link>
             {darkMode ? (
               <WbSunnyOutlinedIcon onClick={toggle} />
               ) : (
                 <DarkModeOutlinedIcon onClick={toggle} />
                 )}
                 </Link>
            <h4>Swith theme</h4>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LeftBar;
