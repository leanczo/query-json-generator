import React, { useState } from "react";
import "./JsonComponent.css";

const JsonComponent = ({
  jsonResult,
  copyToClipboard,
  copySuccess,
  generateJSON,
}) => {
  const [copyBase64Success, setCopyBase64Success] = useState(false);

  const toBase64 = (str) => {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
      console.error("Failed to convert JSON to Base64", e);
      return "";
    }
  };

  const copyBase64ToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(toBase64(jsonResult))
        .then(() => {
          setCopyBase64Success(true);
          setTimeout(() => {
            setCopyBase64Success(false);
          }, 2000);
        })
        .catch((err) => {
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
        <div>
          <button className="btn btn-success" onClick={generateJSON}>
            Generate JSON
          </button>
          <button
            className="btn btn-success clip-container"
            onClick={copyToClipboard}
          >
            <h className="copy-label">Copy</h>
          </button>
          {copySuccess ? (
            <div className="copy-success">Copied to clipboard!</div>
          ) : null}
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
            className="btn btn-success copy-base64-button"
            onClick={copyBase64ToClipboard}
          >
                {copyBase64Success ? (
          <div className="copy-success">Base64 Copied to clipboard!</div>
        ) : null}
            Copy Base64
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
