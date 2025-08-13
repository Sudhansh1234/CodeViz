cmake_minimum_required(VERSION 3.10)
project(CodeVizAlgorithms)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Emscripten specific settings
if(EMSCRIPTEN)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s WASM=1 -s EXPORTED_FUNCTIONS='[\"_main\"]' -s EXPORTED_RUNTIME_METHODS='[\"ccall\",\"cwrap\"]'")
endif()

# Find Emscripten
find_package(Emscripten REQUIRED)

# Create the library
add_library(algorithms SHARED
    algorithms.cpp
)

# Set output name
set_target_properties(algorithms PROPERTIES
    OUTPUT_NAME "algorithms"
    PREFIX ""
    SUFFIX ".js"
)
