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

  const [unfollowClicked,setUnfollowClicked] = useState(false);

  const currentUser = useSelector(state => state.user);

  const Followers = useSelector(state => state.followers);
  const Followings = useSelector(state => state.followings);
  const notFollowingUsers = useSelector(state => state.notFollowingUsers);

  console.log(" Store Followers:",Followers)
  console.log(" Store Followings:",Followings)
  console.log(" Store notFollowingUsers:",notFollowingUsers)


  // const [notFollowingUsers, setNotFollowingUsers] = useState([]);
  // const [Followers,setFollowers] = useState([]);
  // const [Followings,setFollowings] = useState([]);

  

  const getNotFollowingUsers = async () =>{
    try {
      const response = await axios(`api/users/getNotFollowingUsers/${currentUser._id}`);
      console.log('NotfollowingUser res =>',response.data);

      dispatch(setNotFollowingUsers({notFollowingUsers: response.data}));
      // setNotFollowingUsers(response.data);
    } catch (error) {
      console.log('getAllUsers error notfollwing: ' + error);
    }
  }

  const getFollowers = async () =>{
    try {
      const response = await axios(`api/users/getFollowers/${currentUser._id}`);
      console.log('Followers res =>',response.data);

      dispatch(setFollowers({followers: response.data}));
      // setFollowers(response.data);
    } catch (error) {
      console.log('getAllUsers error: Follwers' + error);
    }
  }

  const getFollowings = async () =>{
    try {
      const response = await axios(`api/users/getFollowings/${currentUser._id}`);
      console.log('Followings reverse saaayi vanna data res =>',response.data);

      dispatch(setFollowings({followings: response.data}));
      // setFollowings(response.data);
    } catch (error) {
      console.log('getAllUsers error: Follwings' + error);
    }
  }

  useEffect(()=>{
    getNotFollowingUsers();
    getFollowings();
    getFollowers();
  },[])
  
  // useEffect(()=>{
  //   getFollowings();
  // },[Followings])



  console.log('333366667, ', notFollowingUsers?.notFollowingUsers);
  
  const handleFollow = async (userId) => {
    // Handle follow action here

    const response = await axios.put(`api/users/follow/${userId}`,{currentUserId: currentUser._id });
    console.log(`User with ID ${userId} followed`);
    getNotFollowingUsers();
    // Followers();
    getFollowings();
    // dispatch(setNotFollowingUsers({notFollowingUsers: response.data}));
    
    const updatedFollowings = [...Followings.Followings, response.data];
    dispatch(setFollowings({ Followings: updatedFollowings }));
    // setFollowings(updatedFollowings);

    setFollowClicked(true);
  }
  // let {tt} = currentUser;




  const handleUnfollow = async (userId) => {
    //Handle Unfollow Action

    const response = await axios.put(`api/users/unfollow/${userId}`,{currentUserId : currentUser._id})
    console.log(`User with Id ${userId} unfollowed`)
    getNotFollowingUsers();
    getFollowings();

    const updatedFollowings = Followings.Followings.filter(user => user._id !== userId);
    dispatch(setFollowings({ Followings: updatedFollowings }));
    // setFollowings(updatedFollowings);

    // dispatch(setFollowings({Followings: response.data}));
    setUnfollowClicked(true);
  }



  return (
    <div className="rightBar">
      <div className="container">
        {/* Suggestion list */}

        <div className="item">
          <span>You might Know..</span>
          { notFollowingUsers?.map((user) => (
            
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img
                  src={user.profilePicture}
                  alt=""
                />
                <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{user.username}</span>
              </Link>
              </div>
              <div className="buttons">
                <button className="btnfollow" onClick={() => handleFollow(user._id)}>follow</button>
              </div>
            </div>

          ))}
        </div>

{/* // Followers List */}

<div className="item">
          <span>Followers..</span>
          
          { Followers?.map((user) => (


              // !currentUser.followings.includes( user._id) &&
            
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img
                  src={user.profilePicture}
                  alt=""
                />
                <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{user.username}</span>
              </Link>
              </div>
              <div className="buttons">
                
              </div>
            </div>

          ))}
        </div>


        {/* Following List */}

        <div className="item">
          <span>Followings..</span>
          
          { Followings?.map((user) => (

            
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img
                  src={user.profilePicture}
                  alt=""
                />
                <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{user.username}</span>
              </Link>
              </div>
              <div className="buttons">
                <button className="btnUnfollow" onClick={() => handleUnfollow(user._id)}>Unfollow</button>
              </div>
            </div>

          ))}
        </div>

        </div>
    </div>
  );
};

export default RightBar;
