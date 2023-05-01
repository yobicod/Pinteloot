import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../components/Styles/Modal_style.css";
import { saveAs } from "file-saver";
import Comments from "./Comments";
import ReportPin from "./reportPin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";

function Modal() {
  //use navigate
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  //รับค่าจาก pin
  const location = useLocation();
  const data = location.state?.data;

  const dataToReport = data.data;
  console.log(dataToReport);

  //move to reportpage
  const gotoReport = () => {
    navigate("/report", { state: { dataToReport } });
  };

  const downloadImage = (url) => {
    saveAs(url); // Put your image url here.
  };

  //   console.log(user);
  const pinId = data.data._id;
  const userCreateComment = user.name;

  const [allComment, setAllComment] = useState([]);
  const [comment, setComment] = useState("");

  const inputComment = (event) => {
    setComment(event.target.value);
  };

  const handleKeydown = async (event) => {
    const commentObj = {
      pinId: pinId,
      userCreateComment: userCreateComment,
      text: comment,
    };

    if (event.key === "Enter") {
      console.log("Key press");
      if (comment.length === 0) {
        alert("Please fill comment");
      } else {
        event.preventDefault();
        let result = await fetch("http://localhost:5000/comment", {
          method: "post",
          body: JSON.stringify(commentObj),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setComment("");
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/getAllComment", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "postdata");
        setAllComment(data.data);
      });
  }, [allComment]);
  // console.log(allComment);
  return (
    <div className="add_pin_modal">
      <div className="add_pin_container">
        <div className="side" id="left_side">
          <div className="section1">
            <div className="select_size">
              <Link to="/" style={{ "text-decoration": "none" }}>
                <div className="exit">x</div>
              </Link>
            </div>
          </div>
          <div className="section2">
            <img src={data.data.img} className="modals_pin" />
          </div>
        </div>

        <div className="side" id="right_side">
          <div className="section1">
            <div className="select_size">
              <div
                className="save_image"
                onClick={() => downloadImage(data.data.img)}
              >
                Save image
              </div>
              <div className="report" onClick={gotoReport}>
                <div>📝</div>
              </div>
            </div>
          </div>
          <div className="section2">
            <div className="title_image">
              <h1>{data.data.Title}</h1>
            </div>
            <div className="account">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile Picture"
                width="30"
                height="30"
                style={{ marginRight: "4%", borderRadius: "100%" }}
              />
              <span style={{ "font-size": "1.5em" }}>{user.name}</span>
            </div>
            <div className="pin-comment-container">
              {allComment.map((x) => {
                if (x.pinId === data.data._id) {
                  return <Comments data={x} />;
                }
                return null;
              })}
            </div>
          </div>
          <div className="section3">
            <input
              placeholder="Add your comment"
              type="text"
              className="new_comment"
              id="new_pin_comment"
              onChange={inputComment}
              value={comment}
              onKeyDown={handleKeydown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
