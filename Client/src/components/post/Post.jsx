import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import { useSelector, useDispatch } from 'react-redux';
import {format} from 'timeago.js';
import axios from '../../utils/axios';
import { setPost } from '../../state/index';


 


  const Post = ({post})=>{
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();
    const [commentOpen, setCommentOpen] = useState(false);
    const [comment, setComment] = useState("");
    
    const [comments, setComments] = useState(post.comments);

    const [open, setOpen] = useState(false);
    const token = useSelector((state) => state.token);
    const tttt = useSelector((state) => state.user._id);
    console.log('35 =?', tttt)
    const loggedInUserId = useSelector((state) => state.user._id);
    console.log(loggedInUserId)
    const user = useSelector((state) => state.user);

    // const [numLikes, setNumLikes] = useState(post.likes.length);
    // const [numComments, setNumComments] = useState(post.comments.length);

  

    


  const patchLike = async (e) => {
      // setIsLiked(e.target.cheked);
      setLiked(true)
      // setNumLikes(numLikes + 1);
      const response = await axios.patch(`api/users/posts/like/${post._id}`, {loggedInUserId}, {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
      });
      const updatedPost = response.data;
      console.log('upp ',updatedPost);
      dispatch(setPost({post: updatedPost}))
  }



const handleDeletePost = async(postId) =>{
  try{
    const response = await axios.delete(`api/users/post/${post._id}`);
    console.log('delete response', response);
  }catch (error) {
    console.log(error); 
  }
};


  const handleLike = ()=>{
    patchLike();
  }

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };
    

  return (
    <div className="post" style={{margin:'50px'}}>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {/* <img src={user.profilePic} alt="" /> */}
            <div className="details">
              <Link
                // to={`/profile/${user.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.author.username}</span>
              </Link>
              <span className="date">{format(post.createdAt) }</span>
            </div>
          </div>

          {/* <MoreHorizIcon/> */}
          { post.author._id== loggedInUserId ? <DeleteIcon onClick={handleDeletePost} style={{cursor: 'pointer'}} /> : <ReportIcon/>}
          


        </div>
        <div className="content">
          <p>{post.content}</p>
          <img src={post.image} alt="" />
        </div>

        <div className="info">
          <div className="item"  onClick={handleLike} >
            {liked || post.likes.includes(loggedInUserId) ? <FavoriteOutlinedIcon  /> : <FavoriteBorderOutlinedIcon  />}
            {post.likes.length} Likes
            
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.comments.length} Comments
            
          </div>
        </div>

        {commentOpen && <Comments 
        post={post}
       />}
        
        
      </div>
    </div>
  );
};

export default Post;


