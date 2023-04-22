import "./leftBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useContext } from "react";
import walk from "../../assets/walk.gif";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useSelector, useDispatch } from "react-redux";
import AddPost from "../../components/Addpost/AddPost";
import { setLogout } from "../../Redux/store";

const LeftBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setIsRunning(false);
        setTimeout(() => setIsRunning(true), 1000);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const user = useSelector((state) => state.user);
  const { toggle, darkMode } = useContext(DarkModeContext);
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <Link to="/" style={{ textDecoration: "none" }}>
              <HomeOutlinedIcon />
            </Link>
            <h4>Home</h4>
          </div>
          <div className="item">
            <Link to="/search" style={{ textDecoration: "none" }}>
              <SearchOutlinedIcon />
            </Link>
            <h4>Search</h4>
          </div>
          <div className="item">
            <Link to="/chat" style={{ textDecoration: "none" }}>
              <EmailOutlinedIcon />
            </Link>
            <h4>Messages</h4>
          </div>
          <div className="item">
            <Link to="/notifications" style={{ textDecoration: "none" }}>
              <NotificationsOutlinedIcon />
            </Link>
            <h4>Notification</h4>
          </div>
          <div className="item">
            <Link
              to={`/profile/${currentUser._id}`}
              style={{ textDecoration: "none" }}
            >
              <PersonOutlinedIcon />
            </Link>
            <h4>Profile</h4>
          </div>
          <div className="item">
            <Link
              className="Link"
              to="/login"
              style={{ textDecoration: "none" }}
            >
              <h4>
                {user ? (
                  <h4>
                    <LogoutIcon onClick={() => dispatch(setLogout())} />
                  </h4>
                ) : (
                  <button>
                    <Link className="Link" to="/login">
                      Login
                    </Link>
                  </button>
                )}
              </h4>
            </Link>
            <h4>LogOut</h4>
          </div>

          <AddPost />
          <div className="item">
            <Link style={{ textDecoration: "none" }}>
              {darkMode ? (
                <WbSunnyOutlinedIcon onClick={toggle} />
              ) : (
                <DarkModeOutlinedIcon onClick={toggle} />
              )}
            </Link>
            <h4>Swith theme</h4>
          </div>
        </div>
        <div className="gif-container">
          <img
            src={walk}
            alt="animated gif"
            style={{
              width: "300px",
              height: "300px",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
