import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { format } from "timeago.js";
import axios from "../../utils/axios";
import { setPost } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Comments = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!comment.trim()) {
      // comment is empty or whitespace-only
      toast.error("Add a Comment");
      return;
    }

    try {
      const response = await axios.patch(
        `api/users/posts/comment/${post._id}`,
        { loggedInUserId, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      );
      toast.success("Commented Post");
      const updatedPost = response.data;

      setComments(updatedPost.comments);
      setComment("");

      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={user.profilePicture} alt="" />
        <form>
          <input
            type="text"
            placeholder="write a comment"
            required
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button onClick={handleCommentSubmit}>Send</button>
        </form>
      </div>
      {post.comments.map((comment) => (
        <div className="comment">
          <img src={comment.author.profilePicture} alt="" />
          <div className="info">
            <span>{comment.author.username}</span>
            <p>{comment.text}</p>
          </div>
          <span className="date">{format(comment.createdAt)}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
