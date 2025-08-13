@echo off
echo Building CodeViz C++ algorithms...

REM Create build directory
if not exist "build" mkdir build
cd build

REM Configure with CMake
cmake .. -G "MinGW Makefiles" -DCMAKE_TOOLCHAIN_FILE=%EMSDK%/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake

REM Build
cmake --build .

echo Build complete!
pause
