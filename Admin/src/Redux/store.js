// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     mode: "light",
//     user: null,
//     token: null,
//     posts: [],
//     messages: [],
// };

// export const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setMode: (state) => {
//             state.mode = state.mode === "light" ? "dark" : "light";
//         },
//         setLogin: (state, action) => {
//             state.user = action.payload.user;
//             state.token = action.payload.token;
//         },
//         setLogout: (state) => {
//             state.user = null;
//             state.token = null;
//         },
//         setPosts: (state, action) => {
//             state.posts = action.payload.posts;
//         },
//         setPost: (state, action) => {
//             const updatedPosts = state.posts.map((post) => {
//                 if (post._id === action.payload.post._id) return action.payload.post;
//                 return post;
//             });
//             state.posts = updatedPosts;
//         },
//         setUser: (state, action) => {
//             state.user = action.payload.user;
//         },
//         setMessages: (state, action) => {
//             state.messages = action.payload.messages;
//         }
//     },
// });

// export const { setMode, setLogin, setLogout, setPosts, setPost, setUser, setMessages } =
//     authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    admin: null,
    token:null,
    
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {  
            state.admin = action.payload.admin;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.admin = null;
            state.token = null;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setUser: (state, action) => {
            state.admin = action.payload.admin;
        },
        setMessages: (state, action) => {
            state.messages = action.payload.messages;
        }
    },
});

export const { setMode, setLogin,setToken, setLogout,setMove, setPost, setUser, setMessages } =
    authSlice.actions;
export default authSlice.reducer;