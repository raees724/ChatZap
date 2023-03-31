import React, { useEffect, useState } from 'react'
import "../../pages/Search/search.scss"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from '../../utils/axios';
import Avatar from '@mui/material/Avatar';

const Search = () => {

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState([]);


  const searchUser = async (query) => {
      const response = await axios.get(`/api/users/search-users?query=${query}`);
      console.log(response.data);
      setUsers(response.data);
      console.log('users =>',users.length)
  }


  useEffect(()=>{
    searchUser(query);
  },[query])

  return (
    <div className="profile searchMain">
      
      <div className="profileContainer">
        <div className="uInfo">
            <h1>Search</h1>
            <div className="search">
            <br />
                <SearchOutlinedIcon />
                <input  type="text"  value={query} onChange={(e)=>setQuery(e.target.value)}  placeholder="Search..." />
            </div>

              {
                users.map((user)=>(
                  <div className="userRow" key={user._id}>
                    <Avatar
                            sx={{ width: 30, height: 30 }}
                    />
                    <h4>{user.username}</h4>
                  </div>
                ))
              }
        </div>
      </div>
    </div>
  );
};

export default Search;

