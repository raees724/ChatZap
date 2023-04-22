import React, { useEffect, useState } from "react";
import "../ChatTop/Chattop.scss";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";

const Chattop = (reciever) => {
  const [recieverUser, setRecieverUser] = useState("");
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`api/users/user/${reciever.reciever}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setRecieverUser(data);
    } catch (err) {}
  };

  useEffect(() => {
    getUser();
  }, [reciever]);

  return (
    <div className="userTop">
      <img
        className="conversationImg"
        src={recieverUser.profilePicture}
        alt=""
      />
      <h2>{recieverUser.username}</h2>
    </div>
  );
};

export default Chattop;
