import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
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
          {/* <Widget type="order" /> */}
          <Widget type="report" />
          <Widget type="posts" />
        </div>
        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
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
