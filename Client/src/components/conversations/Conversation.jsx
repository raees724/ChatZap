import React, { useEffect, useState } from 'react'
import "./conversation.scss"
import axios from '../../utils/axios';
import { useSelector } from 'react-redux';

const Conversation = ({conversation, currentUser}) => {
    console.log(currentUser,"currentUser in converstion component")

    const[user,setUser]=useState([]);
    const token = useSelector((state) => state.token);



    useEffect(()=>{
        const friendId = conversation.members.find((m)=> m !== currentUser._id)
        console.log("Freind id L:",friendId)

        const getUser = async () =>{
            try{
            const res = await axios.get(`api/users/user/${friendId}`, {
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
    },[currentUser,conversation])

  return (
    <div className="conversation">
        <img
        className='conversationImg'
        src={user.profilePicture}
        alt=""
        />
        <span className='conversationName'>{user.username}</span>
    </div>
  )
}

export default Conversation
