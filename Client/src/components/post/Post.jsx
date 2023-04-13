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
import { setPost } from '../../Redux/store';
import { setdeletePost } from '../../Redux/store';
// import { setPost } from '../../state/index';
import ReportPost from "../Report/ReportPost";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


 


  const Post = ({post})=>{

    console.log("Post banneneenenenenene", post)
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();
    const [commentOpen, setCommentOpen] = useState(false);
    const [comment, setComment] = useState("");
    
    const [comments, setComments] = useState(post.comments);

    const [isReportPostModalOpen, setIsReportPostModalOpen] = useState(false);

    const [open, setOpen] = useState(false);
    const token = useSelector((state) => state.token);
    // const tttt = useSelector((state) => state.user._id);
    // console.log('35 =?', tttt)
    const loggedInUserId = useSelector((state) => state.user._id);
    console.log(loggedInUserId)
    const user = useSelector((state) => state.user);


    

    // const [numLikes, setNumLikes] = useState(post.likes.length);
    // const [numComments, setNumComments] = useState(post.comments.length);

    // const handleReportPost =async (postId,Reason) => {
    //   try{
    //     const response = await axios.post(`api/users/posts/${post._id}/${Reason}`)
    //     console.log("444444444444555555555555",response)
    //     console.log(`Reporting post with reason ${Reason}`);
    //     toast.success(`Post Reported as ${Reason}`)
    //   }catch(error){
    //     // console.log(object)
    //     console.log(error);
    //   } 

    // };


    const handleReportPost =async (postId,Reason) => {
      try {
        confirmAlert({
          title: 'Confirm Report',
          message: 'Are you sure you want to report this post?',
          buttons: [
            {
              label: 'Yes',
              onClick: async () => {
                const response = await axios.post(`api/users/posts/${post._id}/${Reason}`);
                console.log("444444444444555555555555",response)
        console.log(`Reporting post with reason ${Reason}`);
        toast.success(`Post Reported as ${Reason}`)
              }
            },
          {
            label: 'No',
            onClick: () => console.log('Report canceled')
          }
        ]
      });
    } catch (error) {
      console.log(error); 
    }
    };

    
    // const handleDeletePost = async(postId) =>{
    //   try{
    //     showDeleteConfirmation(postId);
    //     console.log("Reached here")
    //     const response = await axios.delete(`api/users/post/${post._id}`);
    //     console.log("aksjdflkajslkdfja",response)
    //     console.log('delete response', response);
    //     console.log("aksjdflkajsl",post._id)
    //     dispatch(setdeletePost(post._id));
    //   }catch (error) {
    //     console.log(error); 
    //   }
    // };
      
      
    //   const handleDeletePost = async(postId) => {
    //     try {
    //       confirmAlert({
    //         title: 'Confirm Deletion',
    //         message: 'Are you sure you want to delete this post?',
    //         buttons: [
    //           {
    //             label: 'Yes',
    //             onClick: async () => {
    //               const response = await axios.delete(`api/users/post/${post._id}`);
    //               console.log('delete response', response);
    //               toast.success("Post deleted successfully");
    //               dispatch(setdeletePost(postId));
    //             }
    //           },
    //         {
    //           label: 'No',
    //           onClick: () => console.log('Deletion canceled')
    //         }
    //       ]
    //     });
    //   } catch (error) {
    //     console.log(error); 
    //   }
    // };

    const handleDeletePost = async(postId) => {
      try {
        const result = await Swal.fire({
          title: 'Confirm Deletion',
          text: 'Are you sure you want to delete this post?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
          const response = await axios.delete(`api/users/post/${post._id}`);
          console.log('delete response', response);
          Swal.fire(
            'Deleted!',
            'Your post has been deleted.',
            'success'
            );
            dispatch(setdeletePost(postId));
        }
      } catch (error) {
        console.log(error); 
      }
    };


  const patchLike = async (e) => {
      // setIsLiked(e.target.cheked);
      // setLiked(true)
      if (post.likes.includes(loggedInUserId)) {
        setLiked(false);
      } else {
        setLiked(true);
      }
      // setNumLikes(numLikes + 1);
      const response = await axios.patch(`api/users/posts/like/${post._id}`, {loggedInUserId}, {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
      });
      const updatedPost = response.data;
      console.log('upp ',updatedPost);
      dispatch(setPost({post: updatedPost}))
  }







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
            <img src={post.author.profilePicture} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.author._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.author.username}</span>
              </Link>
              <span className="date">{format(post.createdAt) }</span>
            </div>
          </div>

          {/* <MoreHorizIcon/> */}
          { post.author._id== loggedInUserId ? <DeleteIcon onClick={handleDeletePost} style={{cursor: 'pointer'}} /> : <ReportIcon onClick={() => setIsReportPostModalOpen(true)} style={{cursor: 'pointer'}}/>}
          
      <ReportPost isOpen={isReportPostModalOpen} onClose={() => setIsReportPostModalOpen(false)} onSubmit={handleReportPost} post= {post} />


        </div>
        <div className="content">
          <p>{post.content}</p>
          <img src={post.image} alt="" />
        </div>

        <div className="info">
          <div className="item"  onClick={handleLike} >
            {liked  ? <FavoriteOutlinedIcon  /> : <FavoriteBorderOutlinedIcon  />}
            {post.likes.length-1} Likes
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


