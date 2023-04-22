import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import axios from "../../utils/axios";
import { setPost } from "../../Redux/store";
import { setdeletePost } from "../../Redux/store";
import ReportPost from "../Report/ReportPost";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [isReportPostModalOpen, setIsReportPostModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const user = useSelector((state) => state.user);
  
  
  
  const handleReportPost = async (postId, Reason) => {
    try {
      confirmAlert({
        title: "Confirm Report",
        message: "Are you sure you want to report this post?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              const { data } = await axios.post(
                `api/users/posts/${postId}/${Reason}`,
                {},
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              toast.success(`Post Reported as ${Reason}`);
            },
          },
          {
            label: "No",
            onClick: () => console.log("Report canceled"),
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const result = await Swal.fire({
        title: "Confirm Deletion",
        text: "Are you sure you want to delete this post?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await axios.delete(`api/users/post/${post._id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        dispatch(setdeletePost(postId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchLike = async (e) => {
    if (post.likes.includes(loggedInUserId)) {
      setLiked(false);
    } else {
      setLiked(true);
    }

    const response = await axios.patch(
      `api/users/posts/like/${post._id}`,
      { loggedInUserId },
      {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    const updatedPost = response.data;

    dispatch(setPost({ post: updatedPost }));
  };

  const handleLike = () => {
    patchLike();
  };

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  useEffect(() => {
    const checkLiked = () => {
      if (post.likes.includes(loggedInUserId)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };
    checkLiked();
  }, [post.likes, loggedInUserId]);

  return (
    <div className="post" style={{ margin: "50px" }}>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.author.profilePicture} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.author._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.author.username}</span>
              </Link>
              <span className="date">{format(post.createdAt)}</span>
            </div>
          </div>

          {post.author._id == loggedInUserId ? (
            <DeleteIcon
              onClick={handleDeletePost}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <ReportIcon
              onClick={() => setIsReportPostModalOpen(true)}
              style={{ cursor: "pointer" }}
            />
          )}

          <ReportPost
            isOpen={isReportPostModalOpen}
            onClose={() => setIsReportPostModalOpen(false)}
            onSubmit={handleReportPost}
            post={post}
          />
        </div>
        <div className="content">
          <p>{post.content}</p>
          <img src={post.image} alt="" />
        </div>

        <div className="info">
          <div className="item" onClick={handleLike}>
            {liked ? (
              <span className="liked">
                <FavoriteOutlinedIcon />
              </span>
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            {post.likes.length - 1} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.comments.length} Comments
          </div>
        </div>

        {commentOpen && <Comments post={post} />}
      </div>
    </div>
  );
};

export default Post;
