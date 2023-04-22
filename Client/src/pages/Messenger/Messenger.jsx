import React, { useEffect, useRef, useState } from "react";
import "./messenger.scss";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";

import io from "socket.io-client";

import Chattop from "../../components/ChatTop/Chattop";
import Profile from "../profile/Profile";
import { useParams } from "react-router-dom";

const socket = io.connect("ws://localhost:2000");

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const token = useSelector((state) => state.token);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat?.members.find(
      (member) => member !== user._id
    );
    console.log("Reciever is :", receiverId);

    socket.emit("sendMessage", {
      senderId: user._Id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit("addUser", user._id);
    socket.on("getUsers", (users) => {
      console.log("socket users", users);
    });
  }, [user._id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`api/conversations/${user._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`api/messages/${currentChat?._id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const receiverId = currentChat?.members.find((member) => member !== user._id);

  console.log("Reciever is:", receiverId);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="ConversationList">
              <>
                <h2>Conversation List</h2>
              </>
            </div>
            {conversations.map((e) => {
              return (
                <div onClick={() => setCurrentChat(e)}>
                  <Conversation conversation={e} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div>
                  <Chattop reciever={receiverId} />
                </div>

                <div className="chatBoxTop">
                  {messages.map((m, index) => {
                    return (
                      <div ref={scrollRef} key={index}>
                        <Message
                          message={m}
                          own={m.sender === user._id}
                          conversation={m.sender}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something ..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noCoversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
