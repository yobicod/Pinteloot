import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Styles/reportPin.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
function ReportPin() {
  const location = useLocation();
  const data = location.state?.dataToReport;
  console.log(typeof data);
  const [reportType, setReportType] = useState("");
  // console.log(reportType);
  const onChangeValue = (event) => {
    setReportType(event.target.value);
  };
  const submitReport = async (e) => {
    const dataObj = {
      pinData: data,
      type: reportType,
    };
    if (reportType.length > 0) {
      e.preventDefault();
      let result = await fetch("http://localhost:5000/report", {
        method: "post",
        body: JSON.stringify(dataObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      if (result) {
        alert("Data saved succesfully");
      }
      window.location.href = "/";
    } else {
      alert("Please select report type");
    }
  };
  const cancelReport = () => {
    window.location.href = "/";
  };

  return (
    <div className="box">
      <div className="container">
        <h1>Report Pin</h1>
        <div onChange={onChangeValue}>
          <div className="formControl">
            <input type="radio" value="Spam" name="Report Type" /> Spam
            <p className="radio-description">Misleading or repettitive posts</p>
          </div>
          <div className="formControl">
            <input type="radio" value="Nudity" name="Report Type" /> Nudity
            <p className="radio-description">Sexually explicit contents</p>
          </div>
          <div className="formControl">
            <input type="radio" value="Self-harm" name="Report Type" />
            Self-harm
            <p className="radio-description">
              Eating disorders, cutting, suicide
            </p>
          </div>
          <div className="formControl">
            <input type="radio" value="Misinformation" name="Report Type" />
            Misinformation
            <p className="radio-description">
              Health, climate, voting misinformation{" "}
            </p>
          </div>
          <div className="formControl">
            <input type="radio" value="Harrassment" name="Report Type" />
            Harassment on critism
            <p className="radio-description">Insults, threat</p>
          </div>
          <div className="formControl">
            <input type="radio" value="Violence" name="Report Type" />
            Graphic violence
            <p className="radio-description">
              Violence images or promotion of violence
            </p>
          </div>
        </div>
        <div className="bottom-container">
          <button className="button" onClick={cancelReport}>
            Cancel
          </button>
          <button className="button" onClick={submitReport}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportPin;
