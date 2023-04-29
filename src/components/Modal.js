import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../components/Styles/Modal_style.css";
import Comments from "./Comments";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
function Modal() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const data = location.state?.data;

  console.log(data);
  const pinId = data.data._id;
  // const userCreateName = data.data.userCreateName;
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

  const downloadImage = (url) => {
    saveAs(url); // Put your image url here.
  };

  useEffect(() => {
    fetch("http://localhost:5000/getAllComment", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
        setAllComment(data.data);
      });
  }, [allComment]);
  console.log(allComment);
  return (
    <div className="add_pin_modal">
      <div className="add_pin_container">
        <div className="side" id="left_side">
          <div className="section1">
            <div className="select_size">
              <Link to="/" style={{ "text-decoration": "none" }}>
                <div className="exit">👋</div>
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
              <span style={{ "font-size": "1.5em" }}>
                {data.data.user_create_name}
              </span>
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
