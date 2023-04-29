import React from "react";
import { useLocation } from "react-router-dom";
import "../components/Styles/Modal_style.css";
import Comments from "./Comments";

function Modal() {

    const location = useLocation();
    const data = location.state?.data;
    console.log(data);

    return (
        <div className="add_pin_modal">
            <div className="add_pin_container">
                <div className="side" id="left_side">
                    <div className="section2">
                        <img src={data.data.img} className="modals_pin"/>
                    </div>
                </div>

                <div className="side" id="right_side">
                    <div className="section1">
                        <div className="select_size">
                            <div className="save_image">Save image</div>
                        </div>
                    </div>
                    <div className="section2">
                        <div className="title_image">
                            <h1>{data.data.Title}</h1>
                        </div>
                        <div className="account">
                            <img src="https://via.placeholder.com/150" alt="Profile Picture" width = "30" height = "30" style={{ marginRight: "4%", borderRadius:"100%"}}/>
                            <span style={{"font-size":"1.5em"}}>Name Surname</span>
                        </div>
                        <div className="comment">
                            {/*comment ยังไมา่ได้ใช้ทำไร so เอามาทำ scrolbar ซะนะมึง*/}
                            <Comments />
                        </div>
                    </div>
                    <div className="section3">
                        <input placeholder="Add your comment" type="text" className="new_comment" id="new_pin_comment" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;