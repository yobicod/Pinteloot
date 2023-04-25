import React, { useState } from "react";
import "./Styles/reportPin.css";
function ReportPin() {
  const [reportType, setReportType] = useState("");
  const onChangeValue = (event) => {
    setReportType(event.target.value);
  };
  const submitReport = () => {
    alert(reportType);
  };
  const cancelReport = () => {
    console.log("Cancel");
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
            <input type="radio" value="Self-harm" name="Report Type" />
            Misinformation
            <p className="radio-description">
              Health, climate, voting misinformation{" "}
            </p>
          </div>
          <div className="formControl">
            <input type="radio" value="Self-harm" name="Report Type" />
            Hateful-activities
            <p className="radio-description">Prejudices</p>
          </div>
          <div className="formControl">
            <input type="radio" value="Self-harm" name="Report Type" />
            Dangerous goods
            <p className="radio-description">
              Drugs, weapons, regulated products
            </p>
          </div>
          <div className="formControl">
            <input type="radio" value="Self-harm" name="Report Type" />
            Harassment on critism
            <p className="radio-description">Insults, threat</p>
          </div>
          <div className="formControl">
            <input type="radio" value="Self-harm" name="Report Type" />
            Graphic violence
            <p className="radio-description">
              Violence images or promotion of violence
            </p>
          </div>
          <div className="formControl">
            <input type="radio" value="Self-harm" name="Report Type" />
            Privacy violation
            <p className="radio-description">
              Private photos, personal information
            </p>
          </div>
          <div className="formControl">
            <input type="radio" value="Self-harm" name="Report Type" />
            My intelluctual property
            <p className="radio-description">
              Copyright or trademark infringement
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
