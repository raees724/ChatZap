import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { getAllUsers} from "../../utils/Constants";
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";






// {
//   id: 2342355,
//   product: "ASUS ROG Strix",
//   img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
//   customer: "Harold Carol",
//   date: "1 March",
//   amount: 2000,
//   method: "Online",
//   status: "Pending",
// },


const List = () => {

  const [users, setUsers] = useState([]);


  // const searchBy = (e) => {
  //   let key = e.target.value;
  //   if (!key) {
  //     getUsersList();
  //   } else {
  //     axios
  //       .get(`${searchUser}/${key}`)
  //       .then((response) => {
  //         console.log(response.data.users);
  //         setUsers(response.data.users);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  const navigate = useNavigate();


  useEffect((key) => {
    getUsersList();
  }, []);

  const getUsersList = () => {
    axios
      .get(getAllUsers)
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((error) => {
        console.log("inside catch");
        console.log(error);
      });
  };

  const dispatch=useDispatch()
  const [state, setState] = useState([]);
  const [block, setBlock] = useState(false);
  useEffect(() => {
    axios.get(getAllUsers).then((response) => {
      setState(response.data);
    });
  },[block]);
  
  const blockStaff = (id) => {
      axios.patch(`http://localhost:2000/api/admin/block/${id}`).then(({ data }) => {
        console.log(data,'wwwwwwwwwwwwwrrrrrrrrrrrrrrrrr');
        setBlock(!block);
        dispatch(setState({user:data.user}))
        window.location.reload();
      })
      .then(() => {
        navigate(window.location.pathname, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
    };
  
    const unblockStaff = (id) => {
      axios
        .patch(`http://localhost:2000/api/admin/unblock/${id}`)
        .then(({ data }) => {
          console.log(data, 'rrrrrrrrrrrrrrrrr');
          setBlock(!block);
          dispatch(setState({ user: data.user }));
        })
        .then(() => {
          navigate(window.location.pathname, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  

  return (
    <>
    {/* <div className="search">
          <input type="text" name="query" placeholder="Search..." onChange={searchBy}/>
          <SearchOutlinedIcon  />
    </div> */}
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell className="tableCell">No</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Email </TableCell>
            {/* <TableCell className="tableCell">Phone</TableCell> */}
            <TableCell className="tableCell">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((obj, index) => (
            <TableRow key={index +1}>
              <TableCell className="tableCell">{index +1}</TableCell>
              <TableCell className="tableCell">{obj.username}</TableCell>
              <TableCell className="tableCell">{obj.email}</TableCell>
              {/* <TableCell className="tableCell">{obj.phone}</TableCell> */}
              {/* <TableCell className="tableCell">
              {/* <span className={`status ${obj.Pending}`}>{obj.status}</span> */}
              {/* <button style={{backgroundColor:"red"}}>Block</button> */}
              {/* </TableCell> */}
              <TableCell  align="left">
                  {obj.Block === true ? (
                      <Button
                
                        onClick={() =>unblockStaff (obj._id)}
                        variant="contained"
                        color="success"
                      >
                        UNBLOCK
                      </Button>
                    ) : (
                      <Button
            
                        onClick={() => blockStaff(obj._id)}
                        variant="outlined"
                        color="error"
                      >
                        BLOCK
                      </Button>
                    )}
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default List;