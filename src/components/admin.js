import React, { useState, useEffect } from "react";
import "./Styles/admin.css";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import viewBtn from "../Images/analytics.png";
import banBtn from "../Images/ban.png";
import Nav from "./nav";
function Admin() {
  const navigate = useNavigate();
  const [paneOption, setPaneOption] = useState("Pin");
  const [allReport, setAllReport] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const [allUser, setAllUser] = useState([]);
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

  const handleViewClick = (value) => {
    const data = {
      data: value,
    };
    navigate("/ModalAdmin", { state: { data } });
    console.log(value);
  };

  // const handleViewProfileClick = (value) => {
  //   console.log
  // };

  const handleBan = (value) => {
    console.log(value);
    fetch(`http://localhost:5000/deletePost/${value.pinData._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
        // setCreatePost(data.data);
      });

    fetch(`http://localhost:5000/deleteReport/${value._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
        // setCreatePost(data.data);
      });
    window.location.href = "/admin";
  };

  const handleBanComment = (value) => {
    console.log(value._id);
    fetch(`http://localhost:5000/deleteComment/${value._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
        // setCreatePost(data.data);
      });

    window.location.href = "/admin";
  };

  const handleBanUser = (value) => {
    console.log(value._id);
    fetch(`http://localhost:5000/deleteUser/${value._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
      });
    window.location.href = "/admin";
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

    fetch("http://localhost:5000/getAllComment", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
        setAllComment(data.data);
        console.log(allReport);
      });

    fetch("http://localhost:5000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
        setAllUser(data.data);
        console.log(allReport);
      });
  }, []);
  return (
    <div className="admin-container">
      <Nav />
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
          {paneOption === "Pin" && (
            <table className="table">
              <tr className="row">
                <th>ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Comment</th>
                <th className="view-table-header">View</th>
                <th className="ban-table-header">Ban</th>
              </tr>
              {allReport.map((value, index) => {
                console.log(value);
                return (
                  <tr className="row">
                    <td>{value._id}</td>
                    <td>{value.type}</td>
                    <td>test</td>
                    <td>test</td>
                    <td
                      onClick={() => {
                        handleViewClick(value.pinData);
                      }}
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img src={viewBtn}></img>
                    </td>
                    <td
                      onClick={() => {
                        handleBan(value);
                      }}
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img src={banBtn}></img>
                    </td>
                  </tr>
                );
              })}
            </table>
          )}

          {paneOption === "Comment" && (
            <table className="table">
              <tr className="row">
                <th>ID</th>
                <th>Comment</th>
                <th>User</th>
                {/* <th className="view-table-header">View</th> */}
                <th className="ban-table-header">Ban</th>
              </tr>
              {allComment.map((value, index) => {
                console.log(value);
                return (
                  <tr className="row">
                    <td>{value._id}</td>
                    <td>{value.text}</td>
                    <td>{value.userCreateComment}</td>
                    {/* <td
                      onClick={() => {
                        handleViewClick(value.pinData);
                      }}
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img src={viewBtn}></img>
                    </td> */}
                    <td
                      onClick={() => {
                        handleBanComment(value);
                      }}
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img src={banBtn}></img>
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
          {/* User Pane */}
          {paneOption === "User" && (
            <table className="table">
              <tr className="row">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th className="ban-table-header">Ban</th>
              </tr>
              {allUser.map((value, index) => {
                console.log(value);
                return (
                  <tr className="row">
                    <td>{value._id}</td>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    {/* <td
                      onClick={() => {
                        handleViewProfileClick(value);
                      }}
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img src={viewBtn}></img>
                    </td> */}
                    <td
                      onClick={() => {
                        handleBanUser(value);
                      }}
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img src={banBtn}></img>
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
