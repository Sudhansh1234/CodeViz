import React from "react";

export default function Output({ text }) {
  return (
    <div className="output">
      <h3>Execution Logs</h3>
      <div className="output-content">
        <pre>{text || "— No logs yet —"}</pre>
      </div>
    </div>
  );
}
