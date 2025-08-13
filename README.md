# 🚀 CodeViz - Algorithm Visualization Platform

A browser-based application that provides live visualization of array algorithms (sorting and searching) with an interactive Monaco editor, similar to LeetCode but with real-time algorithm animation.

## ✨ Features

### 🎯 **Core Functionality**
- **Interactive Code Editor**: Monaco Editor with syntax highlighting for JavaScript and C++
- **Real-time Visualization**: Watch algorithms execute step-by-step with animated array bars
- **Multiple Algorithms**: Support for sorting and searching algorithms
- **Language Support**: JavaScript and C++ (with automatic translation)
- **Interactive Controls**: Run, Step, Stop, Reset with adjustable speed

### 🔧 **Algorithm Support**
#### Sorting Algorithms
- **Bubble Sort** - Simple comparison-based sorting
- **Selection Sort** - Find minimum and swap
- **Insertion Sort** - Build sorted array incrementally
- **Quick Sort** - Divide and conquer with pivot
- **Merge Sort** - Divide and conquer with merging
- **Heap Sort** - Binary heap-based sorting

#### Searching Algorithms
- **Linear Search** - Sequential element checking
- **Binary Search** - Divide and conquer search (requires sorted array)

### 🎮 **Interactive Features**
- **Speed Control**: Adjustable execution speed (10ms - 1000ms)
- **Array Size**: Dynamic array generation (5 - 100 elements)
- **Target Input**: Set search target for searching algorithms
- **Test Cases**: Predefined and custom test cases with click-to-run
- **Step-by-Step**: Execute algorithms one step at a time
- **Visual Feedback**: Color-coded comparisons, swaps, and highlights

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Code Editor**: Monaco Editor (VS Code's editor)
- **Styling**: CSS3 with responsive design
- **Build Tool**: Create React App
- **Language Support**: JavaScript + C++ (translated to JS)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone <your-repo-url>
cd codeviz

# Install dependencies
npm install

# Copy Monaco Editor assets
npm run copy-monaco

# Start development server
npm start
```

### Manual Monaco Setup (if npm script fails)
```bash
# Windows (PowerShell)
mkdir public\monaco-editor\min
Copy-Item -Recurse node_modules\monaco-editor\min\vs public\monaco-editor\min\vs

# Mac/Linux
mkdir -p public/monaco-editor/min
cp -r node_modules/monaco-editor/min/vs public/monaco-editor/min/vs
```

## 🎯 Usage

### 1. **Select Language & Algorithm Type**
- Choose your preferred language: 🟨 JavaScript, 🟦 C/C++, or ✨ Custom
- Select algorithm category: Sorting or Searching

### 2. **Pick an Algorithm**
- Choose from the available algorithms (Bubble Sort, Quick Sort, Binary Search, etc.)
- The editor will automatically populate with the selected algorithm's code

### 3. **Configure Parameters**
- **Array Size**: Adjust the number of elements (5-100)
- **Speed**: Set execution speed for visualization
- **Target**: For searching algorithms, specify the search target

### 4. **Run & Visualize**
- **Run**: Execute the algorithm with full animation
- **Step**: Execute one step at a time
- **Stop**: Pause execution
- **Reset**: Generate new array and clear logs

### 5. **Test Cases**
- Click on predefined test cases to run them
- Create custom test cases with your own input arrays
- View expected vs. actual results

## 🔍 How It Works

### Code Execution
1. **Language Detection**: Automatically detects JavaScript vs C++ code
2. **Translation**: C++ code is translated to JavaScript for browser execution
3. **Visualization Contract**: Uses a standardized `push()` function to communicate with the visualizer
4. **Real-time Updates**: Each algorithm step updates the visual representation

### Visualization Contract
```javascript
// The push function contract for algorithms
function push(type, indices, arraySnapshot, range) {
  // type: 'compare', 'swap', 'set', 'found', 'notfound', 'done'
  // indices: array of indices to highlight
  // arraySnapshot: current array state
  // range: [left, right] for binary search
}
```

## 📁 Project Structure

```
codeviz/
├── public/
│   ├── index.html
│   └── monaco-editor/     # Monaco Editor assets
├── src/
│   ├── components/
│   │   ├── Controls.js    # Algorithm controls
│   │   ├── Visualizer.js  # Array visualization
│   │   ├── Output.js      # Execution logs
│   │   └── TestCases.js   # Test case management
│   ├── templates/
│   │   └── algorithms.js  # Algorithm templates
│   ├── utils/
│   │   └── arrayGen.js    # Array generation utilities
│   ├── App.js             # Main application component
│   ├── App.css            # Application styles
│   └── index.js           # Entry point
├── package.json
└── README.md
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
1. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

2. Install gh-pages and deploy:
```bash
npm install --save-dev gh-pages
npm run deploy
```

### Deploy to Netlify/Vercel
- Connect your GitHub repository
- Set build command: `npm run build`
- Set publish directory: `build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Adding New Algorithms

### 1. Add Template to `algorithms.js`
```javascript
"New Algorithm (JS)": `function visualize(arr, push) {
  // Your algorithm implementation
  // Use push() function to communicate with visualizer
  push('done', [], arr.slice());
}`
```

### 2. Follow the Visualization Contract
- Use `push('compare', [i, j], arr.slice())` for comparisons
- Use `push('swap', [i, j], arr.slice())` for swaps
- Use `push('done', [], arr.slice())` when finished

## 🐛 Troubleshooting

### Common Issues
1. **Monaco Editor not loading**: Ensure assets are copied to `public/monaco-editor/`
2. **C++ translation errors**: Check console for specific error messages
3. **Visualization not working**: Verify algorithm uses correct `push()` function calls

### Debug Mode
- Open browser console to see translation logs
- Check for JavaScript errors in algorithm execution
- Verify array state updates in visualization

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Monaco Editor**: VS Code's powerful code editor
- **React**: UI library for building user interfaces
- **Algorithm Visualizations**: Inspired by educational algorithm platforms

## 📞 Support

- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join the conversation in GitHub Discussions
- **Contributions**: Pull requests are welcome!

---

**Happy Coding! 🎉**

*Built with ❤️ for algorithm education and visualization*
