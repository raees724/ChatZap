import "./report.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Table from "../../components/table/Table"
import Report from "../../components/reports/report"

const Reports = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {/* <Table/> */}
        <Report/>
      </div>
    </div>
  )
}

export default Reports