import React, { useEffect, useRef, useState } from 'react'
import './messenger.scss'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import { useSelector } from 'react-redux'
import axios from '../../utils/axios';
import {io} from 'socket.io-client'
import Chattop from '../../components/ChatTop/Chattop'
import Profile from '../profile/Profile'

const Messenger = () => {

    const [conversations,setConversations]=useState([]);
    const [currentChat,setCurrentChat]=useState(null);

    // const[Chatuser,setChatUser]=useState([]);

    const [messages,setMessages]=useState([]);
    const [newMessage,setNewMessage]=useState("");
    // const [socket,setSocket]=useState(null);
    
    const [arrivalMessage,setArrivalMessage]=useState(null);
    const scrollRef = useRef();
    const socket = useRef();
    const user = useSelector(state=>state.user);

    useEffect(()=>{
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessages",data=>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt : Date.now()
            })
        })
    },[]);

    // useEffect((conversation,currentUser)=>{
    //     const friendId = conversation.members.find((m)=> m !== currentUser._id)

    //     const getUser = async () =>{
    //         try{
    //         const res = await axios.get(`api/users/user/${friendId}`)
    //         console.log("Freind",res.data)
    //         setChatUser(res.data)
    //         }catch(err){
    //             console.log(err)
    //         }
    //     };
    //     getUser();
    // },[currentUser,conversation])


    useEffect(()=>{
        arrivalMessage &&
         currentChat?.members.includes(arrivalMessage.sender)&&
        setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat]);

    // useEffect2(()=>{
    //     socket?.on("welcome",message=>{
    //         console.log(message)
    //     })
    // },[socket])

    useEffect(()=>{
        socket.current.emit("addUser",user._id)
        socket.current.on("getUsers",users=>{
            console.log("socket users",users)
        })
    },[user])



    useEffect(()=>{
        const getConversations = async () =>{
            try{

                const res = await axios.get(`api/conversations/${user._id}`) 
                console.log(res.data,"777777")
                setConversations(res.data); 
            }catch(err){
                console.log(err)
            }
        };
        getConversations();
    },[user._id])

    useEffect(()=>{
        const getMessages = async () =>{
            try{
            const res = await axios.get(`api/messages/${currentChat?._id}`);
            console.log("Messages:",res.data)
            setMessages(res.data)
            }catch(err){
            console.log(err)
            }
        };
        getMessages();
    },[currentChat])


    // useEffect(()=>{
        
    // })


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const message = {
            sender: user._id,
            text:newMessage,
            conversationId : currentChat._id
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user._id);
            console.log("Recievers are 1",receiverId)

        socket.current.emit("sendMessage",{
            senderId:user._Id,
            receiverId,
            text: newMessage,
        })

        try{
            const res = await axios.post('api/messages', message);
            setMessages([...messages,res.data])
            setNewMessage("")
        }catch(err){
            console.log(err)
        }

    };

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({ behavior:"smooth" });
    },[messages])

    const receiverId = currentChat?.members.find(
        (member) => member !== user._id);

        console.log("Recievers are 2",receiverId)

  return (
    <>
    <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder='Search for Friends' className='chatMenuInput'/>
                {conversations.map((e) => {
                    return (
                        <div onClick={() => setCurrentChat(e)}>
      <Conversation conversation={e}  currentUser={user}/>
    </div>
  );
})}
            </div>
        </div>
        <div className="chatBox">
            
            <div className="chatBoxWrapper">

            {
                currentChat 
                
              ?
              
              
              <>  
              
   
             
        <div >
<Chattop reciever={receiverId}/>
</div>


                <div className="chatBoxTop">
                {messages.map(m=>{
                    
                    return(
                <div ref={scrollRef}>

                    <Message message={m} own={m.sender === user._id } conversation={m.sender} currentUser={user} reciever={receiverId}/>
                        
                </div>
                    );  
                })}

            </div>
            <div className="chatBoxBottom">
                <textarea className="chatMessageInput"
                 placeholder='write something ...'
                 onChange={(e)=>setNewMessage(e.target.value)}
                 value={newMessage}
                 ></textarea>
                <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
            </div></>
            :
            <span className='noCoversationText'>Open a conversation to start a chat</span>
            }
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Messenger
