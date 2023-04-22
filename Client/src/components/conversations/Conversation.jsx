import React, { useEffect, useState } from "react";
import "./conversation.scss";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";

const Conversation = ({ conversation }) => {
  const [user, setUser] = useState([]);
  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.user._id);
  const friendId = conversation?.members.find((m) => m !== currentUser);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`api/users/user/${friendId}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [token]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={user.profilePicture} alt="" />
      <h3 className="conversationName">{user.username}</h3>
    </div>
  );
};

export default Conversation;
