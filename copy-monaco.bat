@echo off
echo Copying Monaco Editor assets...
if not exist "public\monaco-editor\min" mkdir "public\monaco-editor\min"
xcopy "node_modules\monaco-editor\min\vs" "public\monaco-editor\min\vs" /E /I /Y
echo Monaco Editor assets copied successfully!
pause
