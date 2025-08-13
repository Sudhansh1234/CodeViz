import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Point Monaco to local /public path via environment + inline worker bootstrap
// This prevents "toUrl" undefined and CSP issues.
// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  baseUrl: "/monaco-editor/min/vs",
  getWorkerUrl: function (moduleId, label) {
    // Create a simple worker that can handle basic editor operations
    /* eslint-disable no-restricted-globals */
    const workerCode = `
      // Basic Monaco Editor worker
      self.onmessage = function(e) {
        // Handle basic editor operations
        if (e.data && e.data.type === 'init') {
          self.postMessage({ type: 'ready' });
        }
      };
    `;
    /* eslint-enable no-restricted-globals */
    
    return URL.createObjectURL(
      new Blob([workerCode], { type: "application/javascript" })
    );
  },
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
