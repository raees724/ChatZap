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


const Profile = () => {

  const { id } = useParams();
  
  console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiii ',id)

  const dispatch = useDispatch();
  // const user = useSelector(state=>state.user);
  const currentUser = useSelector(state => state.user);
  const token = useSelector((state) => state.token);
  const [posts,setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState('');
  const [profileUserPost, setProfileUserPost] = useState([]);
  


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
      // dispatch(setUser({user: data}));
    } catch (err) {
      
    }
  }
  
  useEffect(() => {
    getUser()
  },[id])

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
    setPosts(postData);
    // dispatch(setPosts({ posts: postData }));
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
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
          <h1 className="profileName">{profileUser?.username}</h1>
      </div>
          <div className="center">
            {
              currentUser._id != profileUser._id ? (
                <>
                  <button>Follow</button> 
                  <EmailOutlinedIcon/> 
                </>
              ):
              (
                <button>Edit</button>
              )

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
