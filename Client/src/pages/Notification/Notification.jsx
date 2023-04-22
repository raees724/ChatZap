import React, { useEffect, useState } from "react";
import "../../pages/Search/search.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "../../utils/axios";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { setNotFollowingUsers } from "../../Redux/store";
import { setToken } from "../../Redux/store";
import { setFollowers } from "../../Redux/store";
import { setFollowings } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.user._id);

  const getNotifications = async () => {
    try {
      const { data } = await axios.get(
        `api/users/notifications/${currentUser._id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Notifications data", data);
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="profile searchMain">
      <div className="profileContainer">
        <div className="uInfo">
          <h1>Notification</h1>

          {notifications.map((notif) => (
            <div className="userRow" key={notif._id}>
              <div className="user">
                {notif?.type === "like" && (
                  <>
                    <Link
                      to={`/profile/${notif.friend._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        src={notif.friend.profilePicture}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                    <p>{notif.friend.username}</p>
                    <span>{notif.content}</span>
                    <img
                      src={notif?.postId?.image}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                  </>
                )}
              </div>
              <div className="user">
                {notif?.type === "Comment" && (
                  <>
                    <Link
                      to={`/profile/${notif.friend._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        src={notif.friend.profilePicture}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                    <p>{notif.friend.username}</p>
                    <span>{notif.content}</span>
                    <img
                      src={notif?.postId?.image}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                  </>
                )}
              </div>

              <div className="user">
                {notif?.type === "follow" && (
                  <>
                    <Link
                      to={`/profile/${notif.friend._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        src={notif.friend.profilePicture}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>

                    <p>{notif.friend.username}</p>

                    <span>{notif.content}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
