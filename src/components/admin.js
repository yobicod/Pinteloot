import React from "react";
import "./Styles/admin.css";
function Admin() {
  return (
    <div className="container">
      <div className="panel">
        <div className="left-panel">
          <p className="admin-text">Admin</p>
          <div className="route-container">
            <div className="button-control">
              <p>📌 Pin</p>
            </div>
            <div className="button-control">
              <p>💬 Comment</p>
            </div>
            <div className="button-control">
              <p>💂🏻‍♀️ User</p>
            </div>
          </div>
        </div>
        <div className="right-panel"></div>
      </div>
    </div>
  );
}

export default Admin;
