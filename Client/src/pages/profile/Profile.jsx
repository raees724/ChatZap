import "./profile.scss";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import Post from "../../components/post/Post"
import { useDispatch,useSelector } from "react-redux";
import axios from '../../utils/axios';
import { useEffect, useState } from "react";
import { getUserPost } from '../../utils/Constants';
import { useParams } from 'react-router-dom';
import {setUser} from '../../Redux/store'
// import Post from '../../components/post/Post';
import Edit from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadImage from "../../components/Upload/UploadImage";
import EditProfile from "../../components/Editprofile/Editprofile";
import { Button } from "@mui/material";
import { setPosts } from "../../Redux/store";
import { useNavigate } from 'react-router-dom';

import { setFollowers } from "../../Redux/store";
import { setFollowings } from "../../Redux/store";
import { setNotFollowingUsers } from "../../Redux/store";

const Profile = (setCurrentChat) => {

  const { id } = useParams();
  
  console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiii ',id)

  const dispatch = useDispatch();
  const [openImageUpload, setImageUpload] = useState(false);
  // const user = useSelector(state=>state.user);
  const currentUser = useSelector(state => state.user);
  const token = useSelector((state) => state.token);
  console.log("Token that is generated", token);
  // const [posts,setPosts] = useState([]);
  const posts = useSelector((state) => state.posts);
  const [profileUser, setProfileUser] = useState('');
  const [editProfile, setEditProfile] = useState(false);
  const [profileUserPost, setProfileUserPost] = useState([]);
  const navigate = useNavigate();

  const [notFollowingUsers, setNotFollowingUsers] = useState([]);
  const [followClicked, setFollowClicked] = useState(false);
  const [unfollowClicked,setUnfollowClicked] = useState(false);
  const [Followers,setFollowers] = useState([]);
  const [porfFollowings,setporfFollowings] = useState([]);

  console.log("asdfasdf porfFol",porfFollowings)
  

  const getNotFollowingUsers = async () =>{
    try {
      const response = await axios(`api/users/getNotFollowingUsers/${currentUser._id}`);
      console.log('17 res of not following users=>',response.data);

      dispatch(setNotFollowingUsers({notFollowingUsers: response.data}));
      setNotFollowingUsers(response.data);
    } catch (error) {
      console.log('getAllUsers error notfollwing: ' + error);
    }
  }

  const getFollowings = async () =>{
    try {
      const response = await axios(`api/users/getFollowings/${currentUser._id}`);
      console.log('Followings res =>',response.data);

      dispatch(setFollowings({followings: response.data}));
      setporfFollowings(response.data);
    } catch (error) {
      console.log('getAllUsers error: Follwings' + error);
    }
  }


  const handleFollow = async (userId) => {
    // Handle follow action here

    const response = await axios.put(`api/users/follow/${userId}`,{currentUserId: currentUser._id });
    console.log(`User with ID ${userId} followed`);
    getNotFollowingUsers();
    // Followers();
    getFollowings();
    // dispatch(setNotFollowingUsers({notFollowingUsers: response.data}));
    
    const updatedFollowings = [...porfFollowings.Followings, response.data];
    // dispatch(setFollowings({ Followings: updatedFollowings }));
    setporfFollowings(updatedFollowings);

    setFollowClicked(true);
  }
  // let {tt} = currentUser;




  const handleUnfollow = async (userId) => {
    //Handle Unfollow Action

    const response = await axios.put(`api/users/unfollow/${userId}`,{currentUserId : currentUser._id})
    console.log(`User with Id ${userId} unfollowed`)
    getNotFollowingUsers();
    getFollowings();


    const updatedFollowings = porfFollowings.Followings.filter(user => user._id !== userId);
    // dispatch(setFollowings({ Followings: updatedFollowings }));
    setporfFollowings(updatedFollowings);

    // dispatch(setFollowings({Followings: response.data}));
    setUnfollowClicked(true);
  } 

  const createConverStation = async (profileUserId) => {
    const response = await axios.post('api/conversations', {"senderId":(currentUser._id),"receiverId":(profileUserId)})

    // const member = data.members;
    navigate(`/chat`);
}

  const getUser = async () => {
    console.log('*********************8888888')
    try {
      const { data } = await axios.get(`api/users/user/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
      console.log('datatatatat ',data)
      setProfileUser(data);
      // dispatch(setUser({user:data}))
      setFollowers(data.followers)
      setporfFollowings(data.followings);
      // dispatch(setUser({user: data}));
    } catch (err) {
      
    }
  }
  
  useEffect(() => {
    getUser()
  },[id])

  useEffect(()=>{
    getNotFollowingUsers();
    getFollowings()
  },[])

  const getUserPosts = async () => {
    console.log('58888888888')
    const response = await axios.get(`/api/users/getUserPost/${profileUser._id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    })
    console.log("Response kitti", response)
    const postData = response.data;
    console.log('postdata = ',postData);
    // setPosts(postData);
    dispatch(setPosts({ posts: postData }));
  }

  useEffect(() => {
    if(profileUser)
      getUserPosts()
  }, [id,profileUser]);

  console.log('ppp ',posts)


  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="uInfo">
        <div className="images">
        <img
          src={profileUser.profilePicture}
          alt=""
          className="profilePic"
        />
        {/* <UploadImage open={openImageUpload} setOpen={setImageUpload} /> */}
        
        <div>
          <h1 className="profileName">{profileUser?.username}</h1>
          <p className="profileName">{profileUser?.bio}</p>
        </div>
          
          {
              currentUser._id != profileUser._id ? (
                <>
                  <button style={{visibility:"hidden"}}></button>
                </>
              ):
              (
                <UploadImage open={openImageUpload} setOpen={setImageUpload} />
              )

            }
          
        
      </div>
          <div className="center">
            {/* {
              currentUser._id != profileUser._id ? (
                <>
                  <button>Follow</button> 
                  <EmailOutlinedIcon/> 
                </>
              ):
              (
                
                <EditProfile open={editProfile} setOpen={setEditProfile} />
                )
              } */}
              {
                          currentUser?._id === profileUser._id && 
                          <EditProfile open={editProfile} setOpen={setEditProfile} />
              }
              {
                          currentUser?._id !== profileUser._id && Followers?.includes(currentUser._id) &&
                          <>
                                <button className="btnUnfollow" onClick={() => handleUnfollow(profileUser._id)}>Unfollow</button> 
                                <EmailOutlinedIcon onClick={() => createConverStation(profileUser._id)}/> 
                          </>   
              }
              {
                          currentUser?._id !== profileUser._id && !Followers?.includes(currentUser._id) &&
                          <>
                               <button className="btnfollow" onClick={() => handleFollow(profileUser._id)}>Follow</button> 
                                <EmailOutlinedIcon onClick={() => createConverStation(profileUser._id)}/> 
                          </>
              }
          </div>
      <div className="left">
      <h4>{posts?.length} Posts</h4>
      <h4>{profileUser?.followers?.length} Followers</h4>
      <h4>{profileUser?.followings?.length} Following</h4>
      </div>
          {/* <div className="right">
            
          </div> */}
        </div>
{/*       
      {
        //  Array.isArray(posts) && posts.map(post => <Posts post= {post} />)
        Array.isArray(posts) &&
        posts.map(({
          _id,
          content,
          author,
          image,
          likes,
          comments,
          createdAt,
      }) => (
          <Posts
              key={_id}
              postId={_id}
              content={content}
              author={author}
              image={image}
              likes={likes}
              comments={comments}
              createdAt={createdAt}
          />
      ))} */}


        {
          posts && posts?.map(post => <Post post= {post} />)
        }

      </div>

      
    </div>
  );
};

export default Profile;
