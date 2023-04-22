import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FeedIcon from '@mui/icons-material/Feed';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../utils/axios";
import { getUsersCountss,getPostsCountss,getReportCountss} from "../../utils/Constants";



const Widget = ({ type }) => {
  let data;

  const [usersCount, setUsersCount] = useState([]);
  const [postsCount, setPostsCount] = useState([]);
  const [reportCount, setReportCount] = useState([]);



  useEffect((key) => {
    getUsersCount();
    getPostsCount();
    getReportCount();
  }, []);
  
  const getUsersCount = () => {
    axios
      .get(getUsersCountss)
      .then((response) => {
        setUsersCount(response.data);
        console.log("User Count:",response.data.count)
      })
      .catch((error) => {
        console.log("inside catch User");
        console.log(error);
      });
  };

  const getPostsCount = () => {
    axios
      .get(getPostsCountss)
      .then((response) => {
        setPostsCount(response.data);
        console.log("Post Count:",response.data.count)
      })
      .catch((error) => {
        console.log("inside catch Post");
        console.log(error);
      });
  };

  const getReportCount = () => {
    axios
      .get(getReportCountss)
      .then((response) => {
        setReportCount(response.data);
        console.log("Report Count:",response.data.count)
      })
      .catch((error) => {
        console.log("inside catch Report");
        console.log(error);
      });
  };
  

  //temporary
  const amountUser = usersCount.count;
  const amountPost = postsCount.count;
  const amountRepo = reportCount.count;
  

  // const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
  
      case "report":
        data = {
          title: "REPORTS",
          isMoney: true,
          link: "View all reports",
        icon: (
          <ReportProblemIcon
          className="icon"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
          ),
        };
        break;
        case "posts": 
        
        data = {
          title: "POSTS",
          isMoney: true,
      link: "See details",
      icon: (
          <FeedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
        {type === "user" && amountUser}
        {type === "posts" && amountPost}
        {type === "report" && amountRepo}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
