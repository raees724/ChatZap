import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    messages: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        setMessages: (state, action) => {
            state.messages = action.payload.messages;
        },
        setOtp: (state, action) => {
            state.otp = action.payload.otp;
        },
        setTempemail: (state, action) => {
            state.tempemail = action.payload.tempemail;
        },
        setNotFollowingUsers: (state, action) => {
            state.notFollowingUsers = action.payload.notFollowingUsers;
        },
        setFollowers:(state,action) =>{
            state.followers = action.payload.followers;
        },
        setFollowings:(state,action) =>{
            state.followings = action.payload.followings;
        },
        setSuggestedUsers: (state, action) => {
            state.suggestUsers = action.payload.suggestUsers;
        },
        setdeletePost: (state, action) => {
            const updatedPosts = state.posts.filter(post => post._id !== action.payload.post._id);
            state.posts = updatedPosts;
        }
    },
});

export const { setdeletePost,setMode,setSuggestedUsers, setLogin,setOtp,setTempemail, setEmail, setLogout, setPosts, setPost, setUser, setMessages, setToken, setNotFollowingUsers, setFollowers, setFollowings } =
    authSlice.actions;
export default authSlice.reducer;