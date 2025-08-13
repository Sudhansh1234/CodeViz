import React, { useEffect, useRef, useState } from "react";
import Editor, { loader } from "@monaco-editor/react";
import Controls from "./components/Controls";
import Output from "./components/Output";
import TestCases from "./components/TestCases";
import Visualizer from "./components/Visualizer";
import { TEMPLATES } from "./templates/algorithms";
import { generateArray } from "./utils/arrayGen";
import "./App.css";

// Note: C++ native addons cannot be loaded in web browsers
// We'll use JavaScript translation for C++ code
console.log('ℹ️ Using JavaScript translation for C++ code (browser limitation)');

// Monaco local path (no CDN)
loader.config({
  paths: {
    vs: "/monaco-editor/min/vs"
  }
});

export default function App() {
  const [template, setTemplate] = useState("Bubble Sort (JS)");
  const [code, setCode] = useState(TEMPLATES["Bubble Sort (JS)"]);
  const [array, setArray] = useState(() => generateArray(30, 100));
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(80);
  const [target, setTarget] = useState(50);

  const [logs, setLogs] = useState([]);
  const [highlight, setHighlight] = useState({ indices: [] });
  const [range, setRange] = useState(null);
  const [language, setLanguage] = useState("js");
  const [algorithmType, setAlgorithmType] = useState("sorting");
  const [customTestCase, setCustomTestCase] = useState({ 
    input: [5, 2, 8, 1, 9], 
    expected: [1, 2, 5, 8, 9] 
  });

  const actionsRef = useRef([]);
  const indexRef = useRef(0);
  const runningRef = useRef(false);

  useEffect(() => {
    setArray(generateArray(size, 100));
  }, [size]);

  const prepare = () => {
    const arrCopy = array.slice();
    const pushes = [];

    function push(type, indices = [], arrSnapshot = null, r = null) {
      pushes.push({
        type,
        indices,
        array: arrSnapshot ? arrSnapshot.slice() : null,
        range: r
      });
    }

    try {
      // Check if it's C++ code
      const isCpp = code.includes("void visualize") || 
                    code.includes("int arr[]") || 
                    code.includes("for (int") ||
                    code.includes("int i = 0") ||
                    code.includes("int temp");

      // Note: C++ native addons cannot be loaded in web browsers
      // We'll use JavaScript translation for all C++ code

      // Fallback to JavaScript translation
      console.log('🔄 Falling back to JavaScript translation...');
      let processedCode = code;
      
      if (isCpp) {
        console.log('🔄 Translating C++ to JavaScript...');
        // C++ to JavaScript translation
        processedCode = code
          // Function signature conversion
          .replace(/void visualize\(int arr\[\], int n, void \(\*push\)\(char\*, int\[\], int\[\], int\[\]\)\)/g, 
                   'function visualize(arr, push)')
          .replace(/void visualize\(int arr\[\], int n, int target, void \(\*push\)\(char\*, int\[\], int\[\], int\[\]\)\)/g, 
                   'function visualize(arr, push, target)')
          // Variable declarations - handle all int declarations
          .replace(/int (\w+) = ([^;]+);/g, 'let $1 = $2;')
          .replace(/int (\w+);/g, 'let $1;')
          .replace(/int (\w+)\[\]/g, 'let $1')
          // For loops
          .replace(/for \(int (\w+) = (\w+); (\w+) < (\w+); (\w+)\+\+\)/g, 
                   'for (let $1 = $2; $3 < $4; $5++)')
          .replace(/for \(int (\w+) = (\w+); (\w+) <= (\w+); (\w+)\+\+\)/g, 
                   'for (let $1 = $2; $3 <= $4; $5++)')
          // While loops
          .replace(/while \((\w+)\)/g, 'while ($1)')
          // If statements
          .replace(/if \((\w+)\)/g, 'if ($1)')
          .replace(/else if \((\w+)\)/g, 'else if ($1)')
          .replace(/else/g, 'else')
          // Push function calls
          .replace(/push\("([^"]+)", \[([^\]]+)\], arr, \[\]\)/g, 
                   'push("$1", [$2], arr.slice())')
          .replace(/push\("([^"]+)", \[([^\]]+)\], arr, \[([^\]]+)\]\)/g, 
                   'push("$1", [$2], arr.slice(), [$3])')
          // Array access
          .replace(/arr\[(\w+)\]/g, 'arr[$1]')
          // Remove semicolons
          .replace(/;(\s*\n)/g, '$1');
        
        console.log('📝 Translated code:', processedCode);
      }

      // eslint-disable-next-line no-new-func
      const visualize = new Function(`${processedCode}; return visualize;`)();
      visualize(arrCopy, push, target);
      
      actionsRef.current = pushes;
      indexRef.current = 0;
      setLogs((l) => [...l, `Prepared ${pushes.length} actions using JavaScript translation`]);
      return true;
    } catch (e) {
      setLogs((l) => [...l, `Error: ${e.message}`]);
      return false;
    }
  };

  const applyAction = (a) => {
    if (!a) return;
    
    if (a.array) setArray(a.array);
    setHighlight({ indices: a.indices || [] });
    setRange(a.range || null);
    
    const label = a.type === "compare" ? `Compare ${a.indices}` :
                  a.type === "swap" ? `Swap ${a.indices}` :
                  a.type === "set" ? `Set ${a.indices}` :
                  a.type === "found" ? `Found at ${a.indices}` :
                  a.type === "notfound" ? `Not found` : "Done";
    
    setLogs((l) => [...l, label]);
  };

  const run = async () => {
    if (runningRef.current) return;
    
    if (actionsRef.current.length === 0) {
      const ok = prepare();
      if (!ok) return;
    }
    
    runningRef.current = true;
    
    while (runningRef.current && indexRef.current < actionsRef.current.length) {
      applyAction(actionsRef.current[indexRef.current++]);
      await new Promise((r) => setTimeout(r, speed));
    }
    
    runningRef.current = false;
  };

  const step = () => {
    if (actionsRef.current.length === 0) {
      const ok = prepare();
      if (!ok) return;
    }
    
    if (indexRef.current < actionsRef.current.length) {
      applyAction(actionsRef.current[indexRef.current++]);
    }
  };

  const stop = () => {
    runningRef.current = false;
  };

  const reset = () => {
    stop();
    setArray(generateArray(size, 100));
    actionsRef.current = [];
    indexRef.current = 0;
    setLogs([]);
    setHighlight({ indices: [] });
    setRange(null);
  };

  const onTemplateChange = (k) => {
    setTemplate(k);
    setCode(TEMPLATES[k] || "");
    
    // Only set language if it's not already set to a specific language
    // This prevents overriding user's language choice
    if (language === "custom") {
      if (k.includes("(C++)")) {
        setLanguage("cpp");
      } else if (k.includes("(JS)")) {
        setLanguage("js");
      }
    }
    
    // Set algorithm type based on template
    if (k.includes("Sort") && !k.includes("Search")) {
      setAlgorithmType("sorting");
    } else if (k.includes("Search")) {
      setAlgorithmType("searching");
    }
    
    reset();
  };

  const onLanguageChange = (lang) => {
    setLanguage(lang);
    reset();
  };

  const runTestCase = (testCase) => {
    setArray([...testCase.input]);
    setSize(testCase.input.length);
    setLogs([]);
    setHighlight({ indices: [] });
    setRange(null);
    actionsRef.current = [];
    indexRef.current = 0;
  };

  const updateCustomTestCase = (field, value) => {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        setCustomTestCase(prev => ({
          ...prev,
          [field]: parsed
        }));
      }
    } catch (e) {
      // Invalid JSON, ignore
    }
  };

  const getCurrentLanguage = () => {
    if (language === "custom") {
      // Detect language from custom code
      if (code.includes("void visualize") || code.includes("int arr[]")) {
        return "cpp";
      }
      return "js";
    }
    return language;
  };

  const testCases = [
    { input: [3, 1, 2], expected: [1, 2, 3] },
    { input: [5, 4, 9], expected: [4, 5, 9] },
    { input: [8, 3, 1, 7, 0], expected: [0, 1, 3, 7, 8] }
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>CodeViz</h1>
        
        <div className="header-controls">
          <select 
            className="language-toggle" 
            value={language} 
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            <option value="cpp">🟦 C/C++</option>
            <option value="js">🟨 JavaScript</option>
            <option value="custom">✨ Custom</option>
          </select>
          
          <select 
            className="algorithm-type" 
            value={algorithmType}
            onChange={(e) => {
              const type = e.target.value;
              setAlgorithmType(type);
              // Reset template when changing type
              setTemplate("");
              setCode("");
            }}
          >
            <option value="sorting">Sorting</option>
            <option value="searching">Searching</option>
          </select>
          
          <select 
            className="algorithm-select"
            value={template}
            onChange={(e) => onTemplateChange(e.target.value)}
          >
            <option value="">Select Algorithm</option>
            {Object.keys(TEMPLATES)
              .filter(key => {
                if (algorithmType === "sorting") {
                  return key.includes("Sort") && !key.includes("Search");
                } else if (algorithmType === "searching") {
                  return key.includes("Search");
                }
                return false;
              })
              .map(key => (
                <option key={key} value={key}>
                  {key.replace(" (JS)", "").replace(" (C++)", "")}
                </option>
              ))}
          </select>
        </div>
      </header>

      <main className="editor-container">
        <section className="editor-section">
          <Editor
            height="50vh"
            language={getCurrentLanguage() === "cpp" ? "cpp" : "javascript"}
            value={code}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14
            }}
          />
          
                     <div className="language-info">
             Current Language: {getCurrentLanguage() === "cpp" ? "C/C++" : "JavaScript"}
             <span style={{ color: '#ffa500', marginLeft: '10px' }}>
               🔄 Using JavaScript Translation
             </span>
           </div>
          
          <Controls
            onStart={run}
            onStop={stop}
            onStep={step}
            onReset={reset}
            speed={speed}
            setSpeed={setSpeed}
            size={size}
            setSize={setSize}
            target={target}
            setTarget={setTarget}
          />
        </section>

        <section className="sidebar">
          <Visualizer
            array={array}
            highlight={highlight}
            range={range}
            maxValue={Math.max(...array, 1)}
          />
          <Output text={logs.join("\n")} />
          <TestCases
            cases={testCases}
            onTestCaseClick={runTestCase}
            customTestCase={customTestCase}
            updateTestCase={updateCustomTestCase}
          />
        </section>
      </main>
    </div>
  );
}
