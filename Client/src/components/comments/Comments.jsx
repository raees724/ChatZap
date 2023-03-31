import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import {format} from 'timeago.js';
import axios from '../../utils/axios'
import { setPost } from '../../state/index';
import { useDispatch, useSelector } from "react-redux";

const Comments = ({post}) => {

  const [comments, setComments] = useState(post.comments);
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  // const [numComments, setNumComments] = useState(post.comments.length);
  
    const handleCommentSubmit = async () => {
      try {
          const response = await axios.patch(
              `api/users/posts/comment/${post._id}`,

              { loggedInUserId, comment }, {
              headers: { Authorization: `Bearer ${token}` },
              "Content-Type": "application/json",
          });
          const updatedPost = response.data;

          setComments(updatedPost.comments);
          setComment("");

          dispatch(setPost({ post: updatedPost }));
          // setComment("");
      } catch (error) {
          console.error(error);
      }
  }



  

  return (
    <div className="comments">
       <div className="write">
        {/* <img src={currentUser.profilePic} alt="" /> */}
        <form>
        <input type="text" placeholder="write a comment" required onChange={(e) => setComment(e.target.value)} value={comment} />
        <button onClick={ handleCommentSubmit} >Send</button>
        </form>
      </div> 
      {post.comments.map((comment) => (
        <div className="comment">
          {/* <img src={comment.profilePicture} alt="" /> */}
          <div className="info">
            <span>{comment.author.username}</span>
            <p>{comment.text}</p>
          </div>
          <span className="date">{format(comment.createdAt) }</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
