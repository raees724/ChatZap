import "./rightBar.scss";
import { setUser } from "../../Redux/store";
import { setNotFollowingUsers } from "../../Redux/store";
import { setToken } from "../../Redux/store";
import { setFollowers } from "../../Redux/store";
import { setFollowings } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RightBar = () => {
  const dispatch = useDispatch();
  const [followClicked, setFollowClicked] = useState(false);
  const [unfollowClicked, setUnfollowClicked] = useState(false);
  const currentUser = useSelector((state) => state.user);
  const currentUserId = useSelector((state) => state.user._id);
  const Followers = useSelector((state) => state.followers);
  const Followings = useSelector((state) => state.followings);
  const token = useSelector((state) => state.token);
  const notFollowingUsers = useSelector((state) => state.notFollowingUsers);

  const getNotFollowingUsers = async () => {
    try {
      const response = await axios(
        `api/users/getNotFollowingUsers/${currentUser._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setNotFollowingUsers({ notFollowingUsers: response.data }));
    } catch (error) {
      console.log("getAllUsers error notfollwing: " + error);
    }
  };

  const getFollowers = async () => {
    try {
      const response = await axios(
        `api/users/getFollowers/${currentUser._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setFollowers({ followers: response.data }));
    } catch (error) {
      console.log("getAllUsers error: Follwers" + error);
    }
  };

  const getFollowings = async () => {
    try {
      const response = await axios(
        `api/users/getFollowings/${currentUser._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setFollowings({ followings: response.data }));
    } catch (error) {
      console.log("getAllUsers error: Follwings" + error);
    }
  };

  useEffect(() => {
    getNotFollowingUsers();
    getFollowings();
    getFollowers();
  }, []);

  const handleFollow = async (userId) => {
    const response = await axios.put(
      `api/users/follow/${userId}`,
      { currentUserId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getNotFollowingUsers();
    getFollowings();

    const updatedFollowings = [...Followings.Followings, response.data];
    dispatch(setFollowings({ Followings: updatedFollowings }));

    setFollowClicked(true);
  };

  const handleUnfollow = async (userId) => {
    const response = await axios.put(
      `api/users/unfollow/${userId}`,
      { currentUserId: currentUserId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getNotFollowingUsers();
    getFollowings();

    const updatedFollowings = Followings.Followings.filter(
      (user) => user._id !== userId
    );
    dispatch(setFollowings({ Followings: updatedFollowings }));

    setUnfollowClicked(true);
  };

  return (
    <div className="rightBar">
      <div className="container">
        {/* Suggestion list */}

        <div className="item">
          <span>You might Know..</span>
          {notFollowingUsers?.map((user) => (
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img src={user.profilePicture} alt="" />
                <Link
                  to={`/profile/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span>{user.username}</span>
                </Link>
              </div>
              <div className="buttons">
                <button
                  className="btnfollow"
                  onClick={() => handleFollow(user._id)}
                >
                  follow
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* // Followers List */}

        <div className="item">
          <span>Followers..</span>

          {Followers?.map((user) => (
            // !currentUser.followings.includes( user._id) &&

            <div className="user" key={user._id}>
              <div className="userInfo">
                <img src={user.profilePicture} alt="" />
                <Link
                  to={`/profile/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span>{user.username}</span>
                </Link>
              </div>
              <div className="buttons"></div>
            </div>
          ))}
        </div>

        {/* Following List */}

        <div className="item">
          <span>Followings..</span>

          {Followings?.map((user) => (
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img src={user.profilePicture} alt="" />
                <Link
                  to={`/profile/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span>{user.username}</span>
                </Link>
              </div>
              <div className="buttons">
                <button
                  className="btnUnfollow"
                  onClick={() => handleUnfollow(user._id)}
                >
                  Unfollow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
