import "./report.scss";
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
import { getAllPosts} from "../../utils/Constants";
import { getAllUsers} from "../../utils/Constants";
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';


const Report = () => {
  
  const [users, setUsers] = useState([]);
  
  const [posts,setPosts]=useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();


  useEffect((key) => {
    getPostsList();
  }, []);

  const getPostsList = () => {
    axios
      .get(getAllPosts)
      .then((response) => {
        console.log("777777777777777",response)
        setPosts(response.data.posts);
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
    axios.get(getAllPosts).then((response) => {
      setState(response.data);
    });
  },[block]);

  
  
  const blockpost = (id) => {
      axios.patch(`http://localhost:2000/api/admin/blockpost/${id}`).then(({ data }) => {
        console.log(data,'wwwwwwwwwwwwwrrrrrrrrrrrrrrrrr');
        setBlock(!block);
        dispatch(setState({post:data.posts}))
        window.location.reload();
      })
      .then(() => {
        navigate(window.location.pathname, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
    };
  
    const unblockpost = (id) => {
      axios
        .patch(`http://localhost:2000/api/admin/unblockpost/${id}`)
        .then(({ data }) => {
          console.log(data, 'rrrrrrrrrrrrrrrrr');
          setBlock(!block);
          dispatch(setState({ post:data.posts }));
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
    rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">No</TableCell>
              <TableCell className="tableCell">Post</TableCell>
              <TableCell className="tableCell">Reason </TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : posts
            ).map((obj, index) => (
              <TableRow key={index + 1}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">
                <img src={obj.image} alt="" style={{ width: '60px', height: '60px' }} />
                    </TableCell>
                
                <TableCell className="tableCell">Reported the post as  
                    {
                      obj.reports.map((report) => ' '+report+'')
                    }
                </TableCell>
                <TableCell align="left">
                  {obj.isDisabled === true ? (
                    <Button
                      onClick={() => unblockpost(obj._id)}
                      variant="contained"
                      color="success"
                    >
                      UNBLOCK
                    </Button>
                  ) : (
                    <Button
                      onClick={() => blockpost(obj._id)}
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

export default Report;
