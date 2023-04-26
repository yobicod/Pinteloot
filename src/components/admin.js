import React, {useState} from "react";
import "./Styles/admin.css";

function Admin() {
  const [paneOption, setPaneOption] = useState("");
  
  const handlePinClick = () => {
    setPaneOption("Pin");
  }
  
  const handleCommentClick = () => {
    setPaneOption("Comment");
  }
  
  const handleUserClick = () => {
    setPaneOption("User");
  }
  
  return (
    <div className="container">
      <div className="panel">
        <div className="left-panel">
          <p className="admin-text">Admin</p>
          <div className="route-container">
            <div className="button-control" onClick={handlePinClick}>
              <p>📌 Pin</p>
            </div>
            <div className="button-control" onClick={handleCommentClick}>
              <p>💬 Comment</p>
            </div>
            <div className="button-control" onClick={handleUserClick}>
              <p>💂🏻‍♀️ User</p>
            </div>
          </div>
        </div>
        <div className="right-panel">
          <div className="report-header"><p className="header-text">{paneOption} Report</p></div>
          <div className="report-stat-container">
            <div className="stat-box">
              <p className="report-type">Spam</p>
              <p className="report-amount">0</p>
            </div>
            <div className="stat-box">
              <p className="report-type">Spam</p>
              <p className="report-amount">0</p>
            </div>
            <div className="stat-box">
              <p className="report-type">Spam</p>
              <p className="report-amount">0</p>
            </div>
            <div className="stat-box">
              <p className="report-type">Spam</p>
              <p className="report-amount">0</p>
            </div>
            <div className="stat-box">
              <p className="report-type">Spam</p>
              <p className="report-amount">0</p>
            </div>
            <div className="stat-box">
              <p className="report-type">Spam</p>
              <p className="report-amount">0</p>
            </div>
          
          </div>
          <table className="table">
            <tr className="row">
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Comment</th>
              <th className="view-table-header">View</th>
              <th className="ban-table-header">Ban</th>
            </tr>
            <tr className="row">
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr className="row">
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr className="row">
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr className="row">
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
