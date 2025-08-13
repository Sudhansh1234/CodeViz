# PowerShell script to copy Monaco Editor assets
# Run this script after npm install to ensure Monaco assets are available locally

Write-Host "Copying Monaco Editor assets..." -ForegroundColor Green

# Create directory if it doesn't exist
if (!(Test-Path "public\monaco-editor\min")) {
    New-Item -ItemType Directory -Path "public\monaco-editor\min" -Force
}

# Copy Monaco assets
if (Test-Path "node_modules\monaco-editor\min\vs") {
    Copy-Item -Recurse -Path "node_modules\monaco-editor\min\vs" -Destination "public\monaco-editor\min\vs" -Force
    Write-Host "Monaco Editor assets copied successfully!" -ForegroundColor Green
} else {
    Write-Host "Error: Monaco Editor assets not found in node_modules" -ForegroundColor Red
    Write-Host "Please run 'npm install' first" -ForegroundColor Yellow
    exit 1
}

Write-Host "Setup complete! You can now run 'npm start'" -ForegroundColor Green
