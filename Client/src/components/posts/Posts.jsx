// import Post from "../post/Post";
// import "./posts.scss";

// const Posts = () => {
//   //TEMPORARY
//   const posts = [
//     {
//       id: 1,
//       name: "John Doe",
//       userId: 1,
//       profilePic:
//         "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//     {
//       id: 2,
//       name: "Jane Doe",
//       userId: 2,
//       profilePic:
//         "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
//       desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam  tempore.",
//     },
//   ];

//   return <div className="posts">
//     {posts.map(post=>(
//       <Post post={post} key={post.id}/>
//     ))}
//   </div>;
// };

// export default Posts;


//
import Box from '@mui/material/Box';
import Post from '../post/Post';
// import Stories from '../Stories/Stories';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setPosts } from '../../Redux/store';
import axios from '../../utils/axios';
import { getPosts } from '../../utils/Constants';
import { useState } from 'react';


const Posts = () => {


  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  
  // const [posts,setPosts] = useState([]); 


  const getAllPosts = async () => {
    console.log('58888888888')
    const response = await axios.get(getPosts, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    })
    const postData = response.data;
    console.log('postdata = ',postData);
    setPosts(postData);
    dispatch(setPosts({ posts: postData }));
  }

  useEffect(() => {

    getAllPosts()

  }, [])


  return (
    <Box flex={4}>
      {/* <Stories /> */}
      <div className="posts">
     
   </div>
      
      {
        posts && posts.map(post => <Post post= {post} />)
      }
      </Box>
  )
}

export default Posts

