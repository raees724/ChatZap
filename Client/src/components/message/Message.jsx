import React, { useEffect, useState } from "react";
import "./message.scss";
import { format } from "timeago.js";
import axios from "../../utils/axios";

import { useSelector } from "react-redux";
const Message = ({ message, own, conversation }) => {
  const [user, setUser] = useState([]);
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`api/users/user/${conversation}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data);
    } catch (err) {}
  };

  useEffect(() => {
    getUser();
  }, [conversation]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={user.profilePicture} alt="" />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
};

export default Message;
