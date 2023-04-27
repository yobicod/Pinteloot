import React from "react";

function Comments() {
    return(
        <div class="comment" >
            <div style={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <img src="https://via.placeholder.com/50" alt="Profile Picture" width="30" height="30" style={{ marginRight: "2%",borderRadius:"100%" }}/>
                <span class="comment-author" style={{"font-size":"1.2em"}}>John Doe</span>
            </div>
            <div class="comment-details">
                <p class="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel lacus eget nibh consectetur lobortis sed nec nisl. Donec sed sapien non tortor malesuada vehicula.</p>
                <div class="comment-actions">
                </div>
            </div>
        </div>
        
    )
}

export default Comments;