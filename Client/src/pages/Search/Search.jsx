import React, { useEffect, useState } from "react";
import "../../pages/Search/search.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "../../utils/axios";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState([]);
  const token = useSelector((state) => state.token);

  const searchUser = async (query) => {
    const response = await axios.get(`/api/users/search-users?query=${query}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(response.data);
  };

  useEffect(() => {
    searchUser(query);
  }, [query]);

  return (
    <div className="profile searchMain">
      <div className="profileContainer">
        <div className="uInfo">
          <h1>Search</h1>
          <div className="search">
            <br />
            <SearchOutlinedIcon />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
            />
          </div>

          {users.map((user) => (
            <div className="userRow" key={user._id}>
              <div className="user">
                <img src={user.profilePicture} alt="" />
                <Link
                  to={`/profile/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span>{user?.username}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
