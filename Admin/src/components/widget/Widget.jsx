import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FeedIcon from '@mui/icons-material/Feed';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

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
    // case "report":
    //   data = {
    //     title: "REPORTS",
    //     isMoney: false,
    //     link: "View all orders",
    //     icon: (
    //       <ShoppingCartOutlinedIcon
    //         className="icon"
    //         style={{
    //           backgroundColor: "rgba(218, 165, 32, 0.2)",
    //           color: "goldenrod",
    //         }}
    //       />
    //     ),
    //   };
    //   break;
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
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
