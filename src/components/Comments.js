import React from "react";

function Comments(props) {
  const comment = props.data;
  console.log(comment);
  return (
    <div class="comment">
      <div
        style={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <img
          src="https://via.placeholder.com/50"
          alt="Profile Picture"
          width="30"
          height="30"
          style={{ marginRight: "2%", borderRadius: "100%" }}
        />
        <span class="comment-author" style={{ "font-size": "1.2em" }}>
          {comment.userCreateComment}
        </span>
      </div>
      <div class="comment-details">
        <p class="comment-text">{comment.text}</p>
        <div class="comment-actions"></div>
      </div>
    </div>
  );
}

export default Comments;
