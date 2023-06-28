import React from "react";
import "./JsonComponent.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JsonComponent = ({ jsonResult, copyToClipboard }) => {
  const notify = () => toast.success('Copied!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
 
  const notifyError = () => toast.error('Failed', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const toBase64 = (str) => {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
      notifyError();
      console.error("Failed to convert JSON to Base64", e);
      return "";
    }
  };

  const copyBase64ToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(toBase64(jsonResult))
        .then(() => {
          notify();
        })
        .catch((err) => {
          notifyError();
          console.error("Error copying Base64 to clipboard", err);
        });
    } else {
      console.error("Clipboard API not available");
    }
  };

  const base64Result = toBase64(jsonResult);

  return (
    <div className="json-component-container">
      {/* Card for JSON Output */}
      <div className="card">
        <div className="base64-header">
          <button
            className="btn btn-dark copy-base64-button"
            onClick={copyToClipboard}
          >
            Copy
          </button>
          <h3 className="base64-title">JSON</h3>
        </div>
        <div>
          <textarea
            className="form-control json-output"
            value={jsonResult}
            readOnly
          />
        </div>
      </div>

      {/* Card for Base64 Output */}
      <div className="card">
        <div className="base64-header">
          <button
            className="btn btn-dark copy-base64-button"
            onClick={copyBase64ToClipboard}
          >
            Copy
          </button>
          <h3 className="base64-title">Base64 Encoded</h3>
        </div>

        <div>
          <textarea
            className="form-control json-output"
            value={base64Result}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default JsonComponent;
