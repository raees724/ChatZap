import React, { useEffect, useState } from 'react'
import './message.scss'
import {format} from 'timeago.js'
import axios from '../../utils/axios';
// import { setUser } from '../../Redux/store'; 
import { useSelector } from 'react-redux';
const Message = ({message,own,currentUser,conversation}) => {


  const[user,setUser]=useState([]);
  const token = useSelector((state) => state.token);

    
    useEffect(()=>{
         
        

        const getUser = async () =>{
            try{
            const res = await axios.get(`api/users/user/${conversation}`,{
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
              },
            })
            console.log("Freind",res.data)
            setUser(res.data)
            }catch(err){
                console.log(err)
            }
        };
        getUser();
    },[conversation,currentUser])

  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
        <img
        className='messageImg'
        src={user.profilePicture}
        alt=""
        />
        <p className='messageText'>{message.text}</p> 
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      
    </div>
  )
}

export default Message
