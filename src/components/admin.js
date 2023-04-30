import React, { useState, useEffect } from "react";
import "./Styles/admin.css";

function Admin() {
  const [paneOption, setPaneOption] = useState("");
  const [allReport, setAllReport] = useState([]);
  const spamNo = allReport.filter((x) => x.type === "Spam").length;
  const nudityNo = allReport.filter((x) => x.type === "Nudity").length;
  const selfharmNo = allReport.filter((x) => x.type === "Self-harm").length;
  const misInfoNo = allReport.filter((x) => x.type === "Misinformation").length;
  const harrassmentNo = allReport.filter(
    (x) => x.type === "Harrassment"
  ).length;
  const violenceNo = allReport.filter((x) => x.type === "Violence").length;

  console.log(spamNo);
  const handlePinClick = () => {
    setPaneOption("Pin");
  };

  const handleCommentClick = () => {
    setPaneOption("Comment");
  };

  const handleUserClick = () => {
    setPaneOption("User");
  };

  useEffect(() => {
    fetch("http://localhost:5000/getAllReport", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
        setAllReport(data.data);
        console.log(allReport);
      });
  }, []);
  return (
    <div className="admin-container">
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
          <div className="report-header">
            <p className="header-text">{paneOption} Report</p>
          </div>
          <div className="report-stat-container">
            <div className="stat-box">
              <p className="report-type">Spam</p>
              <p className="report-amount">{spamNo}</p>
            </div>
            <div className="stat-box">
              <p className="report-type">Nudity</p>
              <p className="report-amount">{nudityNo}</p>
            </div>
            <div className="stat-box">
              <p className="report-type">Self-harm</p>
              <p className="report-amount">{selfharmNo}</p>
            </div>
            <div className="stat-box">
              <p className="report-type">Misinformation</p>
              <p className="report-amount">{misInfoNo}</p>
            </div>
            <div className="stat-box">
              <p className="report-type">Harrassment</p>
              <p className="report-amount">{harrassmentNo}</p>
            </div>
            <div className="stat-box">
              <p className="report-type">Violence</p>
              <p className="report-amount">{violenceNo}</p>
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
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
