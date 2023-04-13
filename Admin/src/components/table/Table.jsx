import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { getAllUsers} from "../../utils/Constants";
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';


const List = () => {
  
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">No</TableCell>
              <TableCell className="tableCell">ProfilePic</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Email </TableCell>
              <TableCell className="tableCell">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : users
            ).map((obj, index) => (
              <TableRow key={index + 1}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell"><img src={obj.profilePicture} alt="" style={{ width: '60px', height: '60px' ,borderRadius:"50%"}} /></TableCell>
                <TableCell className="tableCell">{obj.username}</TableCell>
                <TableCell className="tableCell">{obj.email}</TableCell>
                <TableCell align="left">
                  {obj.Block === true ? (
                    <Button
                      onClick={() => unblockStaff(obj._id)}
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
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default List;
