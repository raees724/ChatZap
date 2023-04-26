import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";
import Report from "../../components/reports/report";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="report" />
          <Widget type="posts" />
        </div>
        <div className="listContainer">
          <div className="listTitle">User List</div>
          <Table />
        </div>
        <div className="listContainer">
          <div className="listTitle">Report List</div>
          <Report />
        </div>
      </div>
    </div>
  );
};

export default Home;
