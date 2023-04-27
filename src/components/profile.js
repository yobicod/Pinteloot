import React,{ useState, useEffect } from "react"
import "./Styles/profile.css"
import {v4 as uuidv4} from 'uuid'
import Avatar from '../Images/img_avatar.png'
//profile test
function Profile() {
    console.log("Render Profile")

    const [modal, setModal] = useState(false)
    const [createPost, setCreatePost] = useState([]);

    const toggleModal = () =>{
        setModal(!modal)
    }

    useEffect(() =>{
        fetch("http://localhost:5000/getAllPost", {
            method: "GET", 
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "postdata")
            setCreatePost(data.data)
        });
    }, []);

    

    const Imgcreate = () =>{
        return(
          createPost.map((value, index) =>{
            return(
                <img
                className="imgpost"
                src={value.img}
                style={{width:'250px', height:'380px', margin:'25px 15px'}}
                ></img> 
            )
        })  
        )   
    }

    return(
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
                        <input
                        type="text"
                        >
                        </input>

                        <p>Lastname:</p>
                        <input
                        type="text"
                        >
                        </input>
                        <button
                        className="close-modal button-profile"
                        onClick={toggleModal}
                        >Close</button>
                    </div>
                </div>
            </div>
            )}

            <div className="profile-div">
                <div className="img-profile">
                  <img className="avatar" src={Avatar}></img>  
                </div>
                <div className="profile-detail">
                    <h2>Yotsanan Kladkhaek</h2>
                </div>
                <div className="profile-button">
                    <button className="button-share button-profile">Share</button>
                    <button className="button-profile" 
                    onClick={toggleModal}>Edit profile</button>
                </div>
                <h2 style={{marginTop: '3%'}}>My post</h2>
            </div>
            <div className="imgpost">
                <div className="div-create">
                    <Imgcreate/>
                </div>
            </div>
        </div>
    );
    
}

export default Profile
