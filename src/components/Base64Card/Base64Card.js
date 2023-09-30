import React, { useState } from "react";
import "./Base64Card.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Base64Card = () => {
  const notify = () =>
    toast.success("Copied!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (message) =>
    toast.error(message ?? "Failed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [base64Input, setBase64Input] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");

  const convertToJSON = () => {
    try {
      const decoded = atob(base64Input);
      setJsonOutput(decoded);
    } catch (error) {
      console.error("Error decoding base64:", error);
      notifyError();
      setJsonOutput("Error decoding base64");
    }
  };

  const convertToBase64 = () => {
    try {
      const encoded = btoa(jsonOutput);
      setBase64Input(encoded);
    } catch (error) {
      notifyError();
      console.error("Error encoding to base64:", error);
      setBase64Input("Error encoding to base64");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        notify();
      },
      (err) => {
        notifyError();
      }
    );
  };

  const beautifyJSON = () => {
    try {
      const parsedJSON = JSON.parse(jsonOutput);
      const beautifiedJSON = JSON.stringify(parsedJSON, null, 2);
      setJsonOutput(beautifiedJSON);
    } catch (error) {
      console.error("Error beautifying JSON:", error);
      notifyError("Error beautifying JSON");
    }
  };
  

  return (
    <div className="card">
      <h4>Base64 to JSON Converter</h4>
      <div className="grid-container">
        <button
          className="btn btn-dark convert-to-json"
          onClick={convertToJSON}
        >
          Convert to JSON
        </button>
        <textarea
          className="form-control base64-input output"
          value={base64Input}
          placeholder="Enter Base64"
          onChange={(e) => setBase64Input(e.target.value)}
        />
        <button
          className="btn btn-dark copyJson"
          onClick={() => copyToClipboard(base64Input)}
        >
          Copy
        </button>
        <button
          className="btn btn-dark convert-to-base64"
          onClick={convertToBase64}
        >
          Convert to Base64
        </button>
        <textarea
          className="form-control json-output"
          value={jsonOutput}
          placeholder="Enter JSON"
          onChange={(e) => setJsonOutput(e.target.value)}
        />
       
        <button
          className="btn btn-dark copyBase64"
          onClick={() => copyToClipboard(jsonOutput)}
        >
          Copy
        </button>
        <button
          className="btn btn-dark beauty"
          onClick={beautifyJSON}
        >
          Beauty
        </button>
  
      </div>
    </div>
  );
};

export default Base64Card;
