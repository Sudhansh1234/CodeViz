import React from "react";

export default function Visualizer({ array, highlight, range, maxValue }) {
  const [l, r] = range || [];
  
  return (
    <div className="visualizer">
      <h3>Array Visualization</h3>
      <div className="visual-area">
        {array.map((v, i) => {
          const height = (v / (maxValue || 1)) * 100;
          const isHighlighted = highlight?.indices?.includes(i);
          const inRange = range && i >= l && i <= r;
          
          return (
            <div
              key={i}
              className={`v-bar ${isHighlighted ? "highlighted" : ""} ${inRange ? "in-range" : ""}`}
              style={{ height: `${height}%` }}
              title={`Index ${i}: ${v}`}
            >
              <div className="v-label">{v}</div>
            </div>
          );
        })}
      </div>
      
      <div className="visual-legend">
        <div className="legend-item">
          <div className="legend-color normal"></div>
          <span>Normal</span>
        </div>
        <div className="legend-item">
          <div className="legend-color highlighted"></div>
          <span>Comparing/Swapping</span>
        </div>
        <div className="legend-item">
          <div className="legend-color in-range"></div>
          <span>Search Range</span>
        </div>
      </div>
    </div>
  );
}
