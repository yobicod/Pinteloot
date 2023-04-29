import React, { useState, useEffect } from "react";
import "./Styles/profile.css";
import { v4 as uuidv4 } from "uuid";
import Avatar from "../Images/img_avatar.png";
import { saveAs } from "file-saver";
import { FiDownload } from "react-icons/fi";
//profile test
function Profile() {
  console.log("Render Profile");

  const user = JSON.parse(localStorage.getItem("user"));
  const [modal, setModal] = useState(false);
  const [createPost, setCreatePost] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    fetch("http://localhost:5000/getAllPost", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "postdata");
        setCreatePost(data.data);
      });
  }, []);

  const downloadImage = (url) => {
    saveAs(url); // Put your image url here.
  };

  const Imgcreate = () => {
    return createPost.map((value, index) => {
      if (value.user_create === user._id) {
        if (value.img.slice(0, 10) === "data:image") {
          return (
            <div className="img_profile" key={index + 1}>
              <img
                className="imgpost"
                src={value.img}
                style={{ width: "250px", height: "380px", margin: "25px 15px" }}
              ></img>
              <button
                className="btn_dowload"
                onClick={() => downloadImage(value.img)}
              >
                <FiDownload style={{ width: "20px", height: "20px" }} />
              </button>
            </div>
          );
        } else {
          return (
            <div className="img_profile" key={index + 1}>
              <video className="imgpost" width="270px" height="390px" controls>
                <source src={value.img} />
              </video>
              <button
                className="btn_dowload"
                onClick={() => downloadImage(value.img)}
              >
                <FiDownload style={{ width: "20px", height: "20px" }} />
              </button>
            </div>
          );
        }
      } else {
      }
    });
  };

  return (
    <div className="profile-container">
      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <div className="img-profile">
                <img className="avatar-edit" src={Avatar}></img>
              </div>
              <h2>Hello Modal</h2>
              <p>Name:</p>
              <input type="text"></input>

              <p>Lastname:</p>
              <input type="text"></input>
              <button
                className="close-modal button-profile"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-div">
        <div className="img-profile">
          <img className="avatar" src={Avatar}></img>
        </div>
        <div className="profile-detail">
          <h2>{user.name}</h2>
        </div>
        <div className="profile-button">
          <button className="button-share button-profile">Share</button>
          <button className="button-profile" onClick={toggleModal}>
            Edit profile
          </button>
        </div>
        <h2 style={{ marginTop: "3%" }}>My post</h2>
      </div>
      <div className="imgpost">
        <div className="div-create">
          <Imgcreate />
        </div>
      </div>
    </div>
  );
}

export default Profile;
