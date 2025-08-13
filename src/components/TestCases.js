import React from "react";

export default function TestCases({ cases, onTestCaseClick, updateTestCase, customTestCase }) {
  const handleTestCaseClick = (testCase) => {
    if (onTestCaseClick) {
      onTestCaseClick(testCase);
    }
  };

  return (
    <div className="testcases">
      <strong>Test Cases</strong>
      <ul className="testcase-list">
        {cases.map((t, i) => (
          <li key={i} className="testcase-item">
            <div 
              className="testcase-content"
              onClick={() => handleTestCaseClick(t)}
              style={{ cursor: 'pointer' }}
              title="Click to run this test case"
            >
              <div className="testcase-input">
                <strong>Input:</strong> {JSON.stringify(t.input)}
              </div>
              <div className="testcase-expected">
                <strong>Expected:</strong> {JSON.stringify(t.expected)}
              </div>
              {i === cases.length - 1 && (
                <div className="testcase-label">✨ Custom Test Case</div>
              )}
            </div>
          </li>
        ))}
      </ul>
      
      {/* Custom Test Case Input */}
      <div className="custom-testcase">
        <strong>Edit Custom Test Case:</strong>
        <div className="custom-input-group">
          <label>Input Array (JSON):</label>
          <input
            type="text"
            value={JSON.stringify(customTestCase?.input || [])}
            onChange={(e) => updateTestCase('input', e.target.value)}
            placeholder="[1,2,3]"
            className="custom-input"
          />
        </div>
        <div className="custom-input-group">
          <label>Expected Output (JSON):</label>
          <input
            type="text"
            value={JSON.stringify(customTestCase?.expected || [])}
            onChange={(e) => updateTestCase('expected', e.target.value)}
            placeholder="[1,2,3]"
            className="custom-input"
          />
        </div>
      </div>
    </div>
  );
}
