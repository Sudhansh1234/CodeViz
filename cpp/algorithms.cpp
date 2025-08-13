#include <napi.h>
#include <vector>
#include <algorithm>
#include <string>

using namespace Napi;

// Global array for visualization
std::vector<int> globalArray;
std::vector<std::string> globalLogs;

// Simple visualization function that stores actions
void push(const std::string& type, const std::vector<int>& indices) {
    std::string log = type;
    if (!indices.empty()) {
        log += " [" + std::to_string(indices[0]);
        for (size_t i = 1; i < indices.size(); i++) {
            log += ", " + std::to_string(indices[i]);
        }
        log += "]";
    }
    globalLogs.push_back(log);
}

// Bubble Sort
void bubbleSort() {
    int n = globalArray.size();
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            push("compare", {j, j+1});
            if (globalArray[j] > globalArray[j+1]) {
                std::swap(globalArray[j], globalArray[j+1]);
                push("swap", {j, j+1});
            }
        }
    }
    push("done", {});
}

// Selection Sort
void selectionSort() {
    int n = globalArray.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            push("compare", {minIdx, j});
            if (globalArray[j] < globalArray[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            std::swap(globalArray[i], globalArray[minIdx]);
            push("swap", {i, minIdx});
        }
    }
    push("done", {});
}

// Insertion Sort
void insertionSort() {
    int n = globalArray.size();
    for (int i = 1; i < n; i++) {
        int key = globalArray[i];
        int j = i - 1;
        while (j >= 0 && globalArray[j] > key) {
            push("compare", {j, j+1});
            globalArray[j+1] = globalArray[j];
            push("set", {j+1});
            j--;
        }
        globalArray[j+1] = key;
        push("set", {j+1});
    }
    push("done", {});
}

// Quick Sort (iterative)
void quickSort() {
    if (globalArray.size() <= 1) {
        push("done", {});
        return;
    }
    
    std::vector<std::pair<int, int>> stack;
    stack.push_back({0, globalArray.size() - 1});
    
    while (!stack.empty()) {
        int left = stack.back().first;
        int right = stack.back().second;
        stack.pop_back();
        
        if (left < right) {
            int pivot = globalArray[right];
            int i = left - 1;
            
            for (int j = left; j < right; j++) {
                push("compare", {j, right});
                if (globalArray[j] <= pivot) {
                    i++;
                    if (i != j) {
                        std::swap(globalArray[i], globalArray[j]);
                        push("swap", {i, j});
                    }
                }
            }
            
            if (i + 1 != right) {
                std::swap(globalArray[i + 1], globalArray[right]);
                push("swap", {i + 1, right});
            }
            
            int pivotPos = i + 1;
            stack.push_back({left, pivotPos - 1});
            stack.push_back({pivotPos + 1, right});
        }
    }
    push("done", {});
}

// Merge Sort (iterative)
void mergeSort() {
    int n = globalArray.size();
    if (n <= 1) {
        push("done", {});
        return;
    }
    
    std::vector<int> temp(n);
    
    for (int width = 1; width < n; width = 2 * width) {
        for (int i = 0; i < n; i = i + 2 * width) {
            int left = i;
            int mid = std::min(i + width, n);
            int right = std::min(i + 2 * width, n);
            
            int l = left, r = mid, k = left;
            
            while (l < mid && r < right) {
                push("compare", {l, r});
                if (globalArray[l] <= globalArray[r]) {
                    temp[k] = globalArray[l];
                    l++;
                } else {
                    temp[k] = globalArray[r];
                    r++;
                }
                k++;
            }
            
            while (l < mid) {
                temp[k] = globalArray[l];
                l++;
                k++;
            }
            
            while (r < right) {
                temp[k] = globalArray[r];
                r++;
                k++;
            }
            
            for (int j = left; j < right; j++) {
                globalArray[j] = temp[j];
                push("set", {j});
            }
        }
    }
    push("done", {});
}

// Linear Search
void linearSearch(int target) {
    int n = globalArray.size();
    for (int i = 0; i < n; i++) {
        push("compare", {i});
        if (globalArray[i] == target) {
            push("found", {i});
            return;
        }
    }
    push("notfound", {});
}

// Binary Search
void binarySearch(int target) {
    // Sort array first
    std::vector<int> sortedArray = globalArray;
    std::sort(sortedArray.begin(), sortedArray.end());
    
    int left = 0, right = sortedArray.size() - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        push("compare", {mid});
        if (sortedArray[mid] == target) {
            push("found", {mid});
            return;
        }
        if (sortedArray[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    push("notfound", {});
}

// Set array for processing
void setArray(const std::vector<int>& arr) {
    globalArray = arr;
    globalLogs.clear();
}

// Get current array
std::vector<int> getArray() {
    return globalArray;
}

// Get logs
std::vector<std::string> getLogs() {
    return globalLogs;
}

// Clear logs
void clearLogs() {
    globalLogs.clear();
}

// NAPI function wrappers
Napi::Value BubbleSort(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    bubbleSort();
    return env.Undefined();
}

Napi::Value SelectionSort(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    selectionSort();
    return env.Undefined();
}

Napi::Value InsertionSort(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    insertionSort();
    return env.Undefined();
}

Napi::Value QuickSort(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    quickSort();
    return env.Undefined();
}

Napi::Value MergeSort(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    mergeSort();
    return env.Undefined();
}

Napi::Value LinearSearch(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Undefined();
    }
    int target = info[0].As<Napi::Number>().Int32Value();
    linearSearch(target);
    return env.Undefined();
}

Napi::Value BinarySearch(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Undefined();
    }
    int target = info[0].As<Napi::Number>().Int32Value();
    binarySearch(target);
    return env.Undefined();
}

Napi::Value SetArray(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Undefined();
    }
    
    Napi::Array jsArray = info[0].As<Napi::Array>();
    std::vector<int> arr;
    for (uint32_t i = 0; i < jsArray.Length(); i++) {
        arr.push_back(jsArray.Get(i).As<Napi::Number>().Int32Value());
    }
    
    setArray(arr);
    return env.Undefined();
}

Napi::Value GetArray(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::Array jsArray = Napi::Array::New(env, globalArray.size());
    
    for (size_t i = 0; i < globalArray.size(); i++) {
        jsArray.Set(i, Napi::Number::New(env, globalArray[i]));
    }
    
    return jsArray;
}

Napi::Value GetLogs(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::Array jsArray = Napi::Array::New(env, globalLogs.size());
    
    for (size_t i = 0; i < globalLogs.size(); i++) {
        jsArray.Set(i, Napi::String::New(env, globalLogs[i]));
    }
    
    return jsArray;
}

Napi::Value ClearLogs(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    clearLogs();
    return env.Undefined();
}

// Module initialization
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("bubbleSort", Napi::Function::New(env, BubbleSort));
    exports.Set("selectionSort", Napi::Function::New(env, SelectionSort));
    exports.Set("insertionSort", Napi::Function::New(env, InsertionSort));
    exports.Set("quickSort", Napi::Function::New(env, QuickSort));
    exports.Set("mergeSort", Napi::Function::New(env, MergeSort));
    exports.Set("linearSearch", Napi::Function::New(env, LinearSearch));
    exports.Set("binarySearch", Napi::Function::New(env, BinarySearch));
    exports.Set("setArray", Napi::Function::New(env, SetArray));
    exports.Set("getArray", Napi::Function::New(env, GetArray));
    exports.Set("getLogs", Napi::Function::New(env, GetLogs));
    exports.Set("clearLogs", Napi::Function::New(env, ClearLogs));
    
    return exports;
}

NODE_API_MODULE(algorithms, Init)
