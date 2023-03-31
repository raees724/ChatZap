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



const RightBar = () => {
  const dispatch = useDispatch();
  const [followClicked, setFollowClicked] = useState(false);

  const [unfollowClicked,setUnfollowClicked] = useState(false);

  const currentUser = useSelector(state => state.user);
  const [notFollowingUsers, setNotFollowingUsers] = useState([]);
  
  const [Followers,setFollowers] = useState([]);
  const [Followings,setFollowings] = useState([]);

  

  const getNotFollowingUsers = async () =>{
    try {
      const response = await axios(`api/users/getNotFollowingUsers/${currentUser._id}`);
      console.log('17 res =>',response.data);

      dispatch(setNotFollowingUsers({notFollowingUsers: response.data}));
      setNotFollowingUsers(response.data);
    } catch (error) {
      console.log('getAllUsers error notfollwing: ' + error);
    }
  }

  const getFollowers = async () =>{
    try {
      const response = await axios(`api/users/getFollowers/${currentUser._id}`);
      console.log('Followers res =>',response.data);

      dispatch(setFollowers({Followers: response.data}));
      setFollowers(response.data);
    } catch (error) {
      console.log('getAllUsers error: Follwers' + error);
    }
  }

  const getFollowings = async () =>{
    try {
      const response = await axios(`api/users/getFollowings/${currentUser._id}`);
      console.log('Followings res =>',response.data);

      dispatch(setFollowings({Followings: response.data}));
      setFollowings(response.data);
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



  console.log('333366667, ', notFollowingUsers.notFollowingUsers);
  
  const handleFollow = async (userId) => {
    // Handle follow action here

    const response = await axios.put(`api/users/follow/${userId}`,{currentUserId: currentUser._id });
    console.log(`User with ID ${userId} followed`);
    getNotFollowingUsers();
    // Followers();
    // Followings();
    // dispatch(setNotFollowingUsers({notFollowingUsers: response.data}));
    
    const updatedFollowings = [...Followings.Followings, response.data];
    dispatch(setFollowings({ Followings: updatedFollowings }));
    setFollowings(updatedFollowings);

    setFollowClicked(true);
  }
  // let {tt} = currentUser;




  const handleUnfollow = async (userId) => {
    //Handle Unfollow Action

    const response = await axios.put(`api/users/unfollow/${userId}`,{currentUserId : currentUser._id})
    console.log(`User with Id ${userId} unfollowed`)
    getNotFollowingUsers();
    // Followings();

    const updatedFollowings = Followings.Followings.filter(user => user._id !== userId);
    dispatch(setFollowings({ Followings: updatedFollowings }));
    setFollowings(updatedFollowings);

    // dispatch(setFollowings({Followings: response.data}));
    setUnfollowClicked(true);
  }



  return (
    <div className="rightBar">
      <div className="container">
        {/* Suggestion list */}

        <div className="item">
          <span>You might Know..</span>
          { notFollowingUsers && notFollowingUsers.notFollowingUsers && notFollowingUsers.notFollowingUsers.map((user) => (
            
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <span>{user.username}</span>
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
          
          { Followers && Followers.Followers && Followers.Followers.map((user) => (


              // !currentUser.followings.includes( user._id) &&
            
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <span>{user.username}</span>
              </div>
              <div className="buttons">
                
              </div>
            </div>

          ))}
        </div>


        {/* Following List */}

        <div className="item">
          <span>Followings..</span>
          
          { Followings && Followings.Followings && Followings.Followings.map((user) => (

            
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <span>{user.username}</span>
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
