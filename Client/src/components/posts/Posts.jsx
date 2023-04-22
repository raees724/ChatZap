import Box from "@mui/material/Box";
import Post from "../post/Post";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPosts } from "../../Redux/store";
import axios from "../../utils/axios";
import { getPosts } from "../../utils/Constants";
import { useState } from "react";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getAllPosts = async () => {
    const response = await axios.get(getPosts, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    const postData = response.data;

    setPosts(postData);
    dispatch(setPosts({ posts: postData }));
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Box flex={4}>
      <div className="posts"></div>

      {posts && posts.map((post) => <Post post={post} />)}
    </Box>
  );
};

export default Posts;
