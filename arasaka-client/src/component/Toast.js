/** @format */

import React, { useState, useEffect } from "react";
import "../css/Toast.css";

const Toast = (props) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleHideToast = () => {
    setIsActive(false);
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
      <div
        id="liveToast"
        className="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">{props.title}</strong>
          <button
            type="button"
            className="btn-close"
            onClick={handleHideToast}
            aria-label="Close"
          />
        </div>
        <div className="toast-body">{props.message}</div>
      </div>
    </div>
  );
};

export default Toast;
