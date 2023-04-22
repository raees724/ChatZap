import "./navbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="navbar">
      <div className="left">
        <h1 className="chatzap-text">ChatZap</h1>
      </div>
      <div className="right">
        <div className="user">
          <img src={user.profilePicture} alt="" />
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span>{user?.username}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
