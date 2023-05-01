import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./Styles/createpin.css";
import { v4 as uuidv4 } from "uuid";
import Nav from "./nav";

function Createpin() {
  console.log("Rendered create");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user._id);
  const [inputValues, setInputValues] = useState([
    {
      Title: "",
      Description: "",
      Link: "",
      img: "",
      user_create: "",
      user_create_name: "",
    },
  ]);

  const inputTitle = (title, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = {
      Title: title.target.value,
      Description: newInputValues[index].Description,
      Link: newInputValues[index].Link,
      img: newInputValues[index].img,
      user_create: newInputValues[index].user_create,
      user_create_name: newInputValues[index].user_create_name,
    };
    setInputValues(newInputValues);
  };

  const inputDescription = (description, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = {
      Title: newInputValues[index].Title,
      Description: description.target.value,
      Link: newInputValues[index].Link,
      img: newInputValues[index].img,
      user_create: newInputValues[index].user_create,
      user_create_name: newInputValues[index].user_create_name,
    };
    setInputValues(newInputValues);
  };

  const inputLink = (link, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = {
      Title: newInputValues[index].Title,
      Description: newInputValues[index].Description,
      Link: link.target.value,
      img: newInputValues[index].img,
      user_create: newInputValues[index].user_create,
      user_create_name: newInputValues[index].user_create_name,
    };
    setInputValues(newInputValues);
  };

  const addNewpin = () => {
    const newInputValues = {
      Title: "",
      Description: "",
      Link: "",
      img: "",
      user_create: "",
      user_create_name: "",
    };
    console.log(newInputValues);
    const newItems = [...inputValues, newInputValues];
    setInputValues(newItems);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    inputValues.map(async (value, index) => {
      let result = await fetch("http://localhost:5000/post", {
        method: "post",
        body: JSON.stringify(inputValues[index]),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      if (result) {
        // alert("Data saved succesfully");
        setInputValues([
          {
            Title: "",
            Description: "",
            Link: "",
            img: "",
            user_create: "",
            user_create_name: "",
          },
        ]);
        window.location.href = "/";
      }
    });
  };

  const MyDropzone = ({ index, pictures }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        "video/*": [".mp3", ".mp4"],
      },

      onDrop: (acceptedFiles) => {
        console.log(pictures);
        const reader = new FileReader();
        var image64 = "";

        reader.readAsDataURL(acceptedFiles[0]);

        reader.onload = () => {
          image64 = reader.result.toString();
          console.log(image64);
          const newInputValues = [...inputValues];
          newInputValues[index] = {
            Title: newInputValues[index].Title,
            Description: newInputValues[index].Description,
            Link: newInputValues[index].Link,
            img: image64,
            user_create: user._id,
            user_create_name: user.name,
          };
          setInputValues(newInputValues);
        };
      },
    });

    return (
      <div className="pic">
        <button className="button-newpost" onClick={addNewpin}>
          New Pin
        </button>
        <h2>Add Image:</h2>

        <div
          {...getRootProps({ id: `my-dropzone-${index}` })}
          className={`dropzone ${isDragActive ? "active" : null}`}
        >
          {/* {pictures} */}
          <input
            {...getInputProps()}
            // className={`dropzone ${index}`}
          />
          {pictures.length > 0 ? (
            <img
              key={uuidv4()}
              src={pictures}
              style={{ width: "500px", height: "500px" }}
            ></img>
          ) : (
            <p>
              {" "}
              {isDragActive ? (
                <span>Drop the files here ...</span>
              ) : (
                <span>
                  Drag 'n' drop some files here, or click to select files
                </span>
              )}
            </p>
          )}
        </div>

        <div className="div-createpost">
          <button className="button-createpost" onClick={handleOnSubmit}>
            Create post
          </button>
        </div>
      </div>
    );
  };

  return inputValues.map((value, index) => {
    return (
      <div className="div-first">
        <Nav />
        <div className="container-post">
          <MyDropzone pictures={value.img} index={index} />

          <form className="form">
            <div className="formcontroll">
              <input
                className="title"
                type="text"
                placeholder="Add your title"
                onChange={(title) => inputTitle(title, index)}
                value={value.Title}
              ></input>
            </div>
            <div className="formcontroll">
              <input
                className="descrip"
                type="text"
                placeholder="Tell every one your pin is about 😊"
                onChange={(description) => inputDescription(description, index)}
                value={value.Description}
              ></input>
            </div>
            <div className="formcontrollLink">
              <input
                className="link"
                type="text"
                placeholder="Link"
                onChange={(link) => inputLink(link, index)}
                value={value.Link}
              ></input>
            </div>
          </form>
        </div>
      </div>
    );
  });
}

export default Createpin;
