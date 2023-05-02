import React, { useState, useEffect } from "react";
import "./Styles/profile.css";
import { v4 as uuidv4 } from "uuid";
import Avatar from "../Images/img_avatar.png";
import { saveAs } from "file-saver";
import { FiDownload } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import Nav from "./nav";

import editBtn from "../Images/pencil.png";
//profile test
function Profile() {
  console.log("Render Profile");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [modal, setModal] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [createPost, setCreatePost] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleEdit = (value) => {
    console.log(value);
    setDataEdit(value);
    setEditPost(!editPost);
  };

  const changeTitle = (event) => {
    const newInputValues = dataEdit;
    const newEditValues = {
      Title: event.target.value,
      Description: newInputValues.Description,
      Link: newInputValues.Link,
      img: newInputValues.img,
      user_create: newInputValues.user_create,
      user_create_name: newInputValues.user_create_name,
      _id: newInputValues._id,
    };
    setDataEdit(newEditValues);
  };

  const changeDescription = (event) => {
    const newInputValues = dataEdit;
    const newEditValues = {
      Title: newInputValues.Title,
      Description: event.target.value,
      Link: newInputValues.Link,
      img: newInputValues.img,
      user_create: newInputValues.user_create,
      user_create_name: newInputValues.user_create_name,
      _id: newInputValues._id,
    };
    setDataEdit(newEditValues);
  };

  const changeLink = (event) => {
    const newInputValues = dataEdit;
    const newEditValues = {
      Title: newInputValues.Title,
      Description: newInputValues.Description,
      Link: event.target.value,
      img: newInputValues.img,
      user_create: newInputValues.user_create,
      user_create_name: newInputValues.user_create_name,
      _id: newInputValues._id,
    };
    setDataEdit(newEditValues);
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

  const handleOnsummitEdit = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:5000/editpost/${dataEdit._id}`,
        {
          method: "PUT",
          body: JSON.stringify(dataEdit),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);
      setDataEdit({});
      window.location.href = "/profile";
      // handle success
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  const onHandleClick = (value) => {
    const data = {
      data: value,
    };
    console.log(data);
    // const data = value;
    navigate("/Modal", { state: { data } });
  };
  const Imgcreate = () => {
    return createPost
      .slice(0)
      .reverse()
      .map((value, index) => {
        const data = value;
        console.log(data);
        if (value.user_create === user._id) {
          if (value.img.slice(0, 10) === "data:image") {
            return (
              <div className="img_profile" key={index + 1}>
                <img
                  className="imgpost"
                  src={value.img}
                  style={{
                    width: "250px",
                    height: "380px",
                    margin: "25px 15px",
                  }}
                  onClick={() => {
                    onHandleClick(data);
                  }}
                ></img>
                <button
                  className="btn_dowload"
                  onClick={() => downloadImage(value.img)}
                >
                  <FiDownload style={{ width: "20px", height: "20px" }} />
                </button>

                {/* <button className="btn_edit" onClick={() => toggleEdit(value)}>
                  <FiEdit3 style={{ width: "20px", height: "20px" }} />
                </button> */}
              </div>
            );
          } else {
            return (
              <div className="img_profile" key={index + 1}>
                <video
                  className="imgpost"
                  width="270px"
                  height="390px"
                  controls
                >
                  <source src={value.img} />
                </video>
                <button
                  className="btn_dowload"
                  onClick={() => downloadImage(value.img)}
                >
                  <FiDownload style={{ width: "20px", height: "20px" }} />
                </button>

                <button className="btn_edit" onClick={toggleEdit}>
                  <FiEdit3 style={{ width: "20px", height: "20px" }} />
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
      <Nav />
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

      {editPost && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <div className="img-profile">
                <img className="avatar-edit" src={dataEdit.img}></img>
              </div>
              <h2>Edit Post</h2>

              <p>Title:</p>
              <input
                type="text"
                value={dataEdit.Title}
                onChange={changeTitle}
              ></input>

              <p>Description:</p>
              <input
                type="text"
                value={dataEdit.Description}
                onChange={changeDescription}
              ></input>

              <p>Link:</p>
              <input
                type="text"
                value={dataEdit.Link}
                onChange={changeLink}
              ></input>

              <p></p>
              <button
                className="button-profile"
                onClick={() => handleOnsummitEdit()}
              >
                Summit change
              </button>

              <button
                className="close-modal button-close"
                onClick={() => toggleEdit()}
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
          {/* <button className="button-share button-profile">Share</button>
           */}
          <img
            src={editBtn}
            onClick={toggleModal}
            style={{ cursor: "pointer" }}
          ></img>

        {user.Role === 'role' ?
        (
          <Link to="/admin" style={{ textDecoration: "none", color: "#fff" }}>
          <button className="admin_btn">Admin page</button>
         </Link>
        ):
        (<div></div>)
        }
         
          {/* <button className="button-profile">Edit profile</button> */}
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
