import React, { useEffect, useState } from 'react'
import "../../pages/Search/search.scss"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from '../../utils/axios';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const Notification = () => {

  // const [users, setUsers] = useState([]);
  // const [query, setQuery] = useState([]);


  // const searchUser = async (query) => {
  //     const response = await axios.get(`/api/users/search-users?query=${query}`);
  //     console.log(response.data);
  //     setUsers(response.data);
  //     console.log('users =>',users.length)
  // }


  // useEffect(()=>{
  //   searchUser(query);
  // },[query])

  const [notifications, setNotifications] = useState([]);
  const token = useSelector(state => state.token);
  const currentUser = useSelector(state => state.user);
  const getNotifications = async () => {
      try {
          const { data } = await axios.get(`api/users/notifications/${currentUser._id}`, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`,
              },
          })
          console.log("Notifications data",data)
          setNotifications(data);
      } catch (err) {
          console.log(err);
      }
  }

  

  useEffect(() => {
      getNotifications()
  }, [])


  return (
    <div className="profile searchMain">
      
      <div className="profileContainer">
        <div className="uInfo">
            <h1>Notification</h1>

              {
                notifications.map((notif)=>(
                  <div className="userRow" key={notif._id}>
                   
          <div className="user">
          <img
            src={notif.friend.profilePicture}
            alt=""
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover"
          }} 
            /> 
          <p>{notif.friend.username}</p>
          <span>{notif.content}</span>
          <img src={notif?.postId?.image} alt='' style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover"
                  }} />
          
          
        </div>
                  </div>
                ))
              }
        </div>
      </div>

    </div>
  );
};

export default Notification;

