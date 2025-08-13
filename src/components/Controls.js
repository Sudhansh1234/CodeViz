import React from "react";

export default function Controls({
  onStart, onStop, onStep, onReset,
  speed, setSpeed, size, setSize,
  target, setTarget
}) {
  return (
    <div className="controls">
      <div className="control-buttons">
        <button onClick={onStart} className="btn btn-primary">Start</button>
        <button onClick={onStop} className="btn btn-secondary">Stop</button>
        <button onClick={onStep} className="btn btn-info">Step +</button>
        <button onClick={onReset} className="btn btn-danger">Reset</button>
      </div>

      <div className="control-sliders">
        <div className="control-group">
          <label>Speed: {speed}ms</label>
          <input 
            type="range" 
            min={10} 
            max={1000} 
            value={speed} 
            onChange={e => setSpeed(+e.target.value)}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label>Size: {size}</label>
          <input 
            type="range" 
            min={5} 
            max={100} 
            value={size} 
            onChange={e => setSize(+e.target.value)}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label>Target:</label>
          <input 
            type="number" 
            value={target} 
            onChange={e => setTarget(+e.target.value)}
            className="target-input"
            min="1"
            max="100"
          />
        </div>
      </div>
    </div>
  );
}
