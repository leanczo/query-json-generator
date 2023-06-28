import React, { useState } from "react";

const Base64Card = () => {
  const [base64Input, setBase64Input] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");

  const convertToJSON = () => {
    try {
      const decoded = atob(base64Input);
      setJsonOutput(decoded);
    } catch (error) {
      console.error("Error decoding base64:", error);
      setJsonOutput("Error decoding base64");
    }
  };

  const convertToBase64 = () => {
    try {
      const encoded = btoa(jsonOutput);
      setBase64Input(encoded);
    } catch (error) {
      console.error("Error encoding to base64:", error);
      setBase64Input("Error encoding to base64");
    }
  };

  return (
    <div className="card">
      <h3>Base64 to JSON Converter</h3>
      <div className="item-row">
        <textarea
          className="form-control"
          value={base64Input}
          onChange={(e) => setBase64Input(e.target.value)}
        />
        <button className="btn btn-primary" onClick={convertToJSON}>
          Convert to JSON
        </button>
      </div>
      <div className="item-row">
        <textarea
          className="form-control"
          value={jsonOutput}
          onChange={(e) => setJsonOutput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={convertToBase64}>
          Convert to Base64
        </button>
      </div>
    </div>
  );
};

export default Base64Card;
