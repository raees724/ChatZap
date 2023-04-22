import React from "react";
import PropTypes from "prop-types";
import "../Report/ReportPost.scss";
import { Button } from "@mui/material";

const ReportPost = ({ isOpen, onClose, onSubmit, post }) => {
  const [reason, setReason] = React.useState("");

  const handleButtonClick = async (event) => {
    const reasonValue = event.target.value;
    setReason(reasonValue);
    onSubmit(post._id, reasonValue);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="report-post-modal">
      <div className="report-post-modal-content">
        <h2 className="report-post-modal-title">Report Post</h2>
        <div className="report-post-modal-field">
          <label htmlFor="reason">Reason:</label>
          <div className="report-post-modal-buttons">
            <Button
              type="button"
              value="inappropriate"
              onClick={handleButtonClick}
            >
              Inappropriate content
            </Button>
            <Button type="button" value="spam" onClick={handleButtonClick}>
              Its Spam
            </Button>
            <Button type="button" value="violence" onClick={handleButtonClick}>
              Violence
            </Button>
            <Button
              type="button"
              value="selfinjury"
              onClick={handleButtonClick}
            >
              Suicide or Self-Injury
            </Button>
            <Button type="button" value="bully" onClick={handleButtonClick}>
              Bullying or Harrasment
            </Button>
            <Button type="button" value="hate" onClick={handleButtonClick}>
              Hate speech or symbols
            </Button>
          </div>
        </div>
        <div className="report-post-modal-buttons">
          <Button
            type="button"
            className="report-post-modal-cancel"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

ReportPost.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReportPost;
