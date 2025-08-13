export const TEMPLATES = {
  "Bubble Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            push("compare", [j, j+1], arr, []);
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                push("swap", [j, j+1], arr, []);
            }
        }
    }
    push("done", [], arr, []);
}`,
  "Binary Search (C++)": `void visualize(int arr[], int n, int target, void (*push)(char*, int[], int[], int[])) {
    // Sort array first for binary search
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        push("compare", [mid], arr, [left, right]);
        if (arr[mid] == target) {
            push("found", [mid], arr, [left, right]);
            return;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    push("notfound", [], arr, []);
}`,
  "Insertion Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            push("compare", [j, j+1], arr, []);
            arr[j+1] = arr[j];
            push("set", [j+1], arr, []);
            j--;
        }
        arr[j+1] = key;
        push("set", [j+1], arr, []);
    }
    push("done", [], arr, []);
}`,
  "Selection Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            push("compare", [minIdx, j], arr, []);
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
            push("swap", [i, minIdx], arr, []);
        }
    }
    push("done", [], arr, []);
}`,
  "Quick Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    int stack[100];
    int top = -1;
    
    stack[++top] = 0;
    stack[++top] = n - 1;
    
    while (top >= 0) {
        int high = stack[top--];
        int low = stack[top--];
        
        if (low < high) {
            int pivot = arr[high];
            int i = low - 1;
            
            for (int j = low; j < high; j++) {
                push("compare", [j, high], arr, []);
                if (arr[j] <= pivot) {
                    i++;
                    if (i != j) {
                        int temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                        push("swap", [i, j], arr, []);
                    }
                }
            }
            
            if (i + 1 != high) {
                int temp = arr[i + 1];
                arr[i + 1] = arr[high];
                arr[high] = temp;
                push("swap", [i + 1, high], arr, []);
            }
            
            int pi = i + 1;
            
            if (pi - 1 > low) {
                stack[++top] = low;
                stack[++top] = pi - 1;
            }
            
            if (pi + 1 < high) {
                stack[++top] = pi + 1;
                stack[++top] = high;
            }
        }
    }
    
    push("done", [], arr, []);
}`,
  "Merge Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    int temp[100];
    
    for (int width = 1; width < n; width = 2 * width) {
        for (int i = 0; i < n; i = i + 2 * width) {
            int left = i;
            int mid = (i + width < n) ? i + width : n;
            int right = (i + 2 * width < n) ? i + 2 * width : n;
            
            int l = left, r = mid, k = left;
            
            while (l < mid && r < right) {
                push("compare", [l, r], arr, []);
                if (arr[l] <= arr[r]) {
                    temp[k] = arr[l];
                    l++;
                } else {
                    temp[k] = arr[r];
                    r++;
                }
                k++;
            }
            
            while (l < mid) {
                temp[k] = arr[l];
                l++;
                k++;
            }
            
            while (r < right) {
                temp[k] = arr[r];
                r++;
                k++;
            }
            
            for (int j = left; j < right; j++) {
                arr[j] = temp[j];
                push("set", [j], arr, []);
            }
        }
    }
    
    push("done", [], arr, []);
}`,
  "Linear Search (C++)": `void visualize(int arr[], int n, int target, void (*push)(char*, int[], int[], int[])) {
    for (int i = 0; i < n; i++) {
        push("compare", [i], arr, []);
        if (arr[i] == target) {
            push("found", [i], arr, []);
            return;
        }
    }
    push("notfound", [], arr, []);
}`,
  "Heap Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    int stack[100];
    int stackTop = 0;
    
    // Build max heap using iterative approach
    for (int i = n / 2 - 1; i >= 0; i--) {
        int current = i;
        while (current < n) {
            int largest = current;
            int left = 2 * current + 1;
            int right = 2 * current + 2;
            
            if (left < n) {
                push("compare", [largest, left], arr, []);
                if (arr[left] > arr[largest]) {
                    largest = left;
                }
            }
            
            if (right < n) {
                push("compare", [largest, right], arr, []);
                if (arr[right] > arr[largest]) {
                    largest = right;
                }
            }
            
            if (largest != current) {
                int temp = arr[current];
                arr[current] = arr[largest];
                arr[largest] = temp;
                push("swap", [current, largest], arr, []);
                current = largest;
            } else {
                break;
            }
        }
    }
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        push("swap", [0, i], arr, []);
        
        int current = 0;
        while (current < i) {
            int largest = current;
            int left = 2 * current + 1;
            int right = 2 * current + 2;
            
            if (left < i) {
                push("compare", [largest, left], arr, []);
                if (arr[left] > arr[largest]) {
                    largest = left;
                }
            }
            
            if (right < i) {
                push("compare", [largest, right], arr, []);
                if (arr[right] > arr[largest]) {
                    largest = right;
                }
            }
            
            if (largest != current) {
                int temp = arr[current];
                arr[current] = arr[largest];
                arr[largest] = temp;
                push("swap", [current, largest], arr, []);
                current = largest;
            } else {
                break;
            }
        }
    }
    
    push("done", [], arr, []);
}`,
  "Counting Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    if (n == 0) {
        push("done", [], arr, []);
        return;
    }
    
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    
    int count[101] = {0};
    
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }
    
    int index = 0;
    for (int i = 0; i <= maxVal; i++) {
        for (int j = 0; j < count[i]; j++) {
            arr[index] = i;
            push("set", [index], arr, []);
            index++;
        }
    }
    
    push("done", [], arr, []);
}`,
  "Radix Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    if (n == 0) {
        push("done", [], arr, []);
        return;
    }
    
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    
    int exp = 1;
    while (maxVal / exp > 0) {
        int count[10] = {0};
        int output[100];
        
        for (int i = 0; i < n; i++) {
            int index = (arr[i] / exp) % 10;
            count[index]++;
        }
        
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        for (int i = n - 1; i >= 0; i--) {
            int index = (arr[i] / exp) % 10;
            output[count[index] - 1] = arr[i];
            count[index]--;
        }
        
        for (int i = 0; i < n; i++) {
            arr[i] = output[i];
            push("set", [i], arr, []);
        }
        
        exp *= 10;
    }
    
    push("done", [], arr, []);
}`,
  "Shell Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    int gap = n / 2;
    
    while (gap > 0) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            
            while (j >= gap && arr[j - gap] > temp) {
                push("compare", [j, j - gap], arr, []);
                arr[j] = arr[j - gap];
                push("set", [j], arr, []);
                j -= gap;
            }
            
            arr[j] = temp;
            push("set", [j], arr, []);
        }
        
        gap /= 2;
    }
    
    push("done", [], arr, []);
}`,
  "Cocktail Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    bool swapped = true;
    int start = 0;
    int end = n - 1;
    
    while (swapped) {
        swapped = false;
        
        for (int i = start; i < end; i++) {
            push("compare", [i, i + 1], arr, []);
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                push("swap", [i, i + 1], arr, []);
                swapped = true;
            }
        }
        
        if (!swapped) break;
        
        swapped = false;
        end--;
        
        for (int i = end - 1; i >= start; i--) {
            push("compare", [i, i + 1], arr, []);
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                push("swap", [i, i + 1], arr, []);
                swapped = true;
            }
        }
        
        start++;
    }
    
    push("done", [], arr, []);
}`,
  "Gnome Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    int index = 0;
    while (index < n) {
        if (index == 0) {
            index++;
        }
        push("compare", [index, index - 1], arr, []);
        if (arr[index] >= arr[index - 1]) {
            index++;
        } else {
            int temp = arr[index];
            arr[index] = arr[index - 1];
            arr[index - 1] = temp;
            push("swap", [index, index - 1], arr, []);
            index--;
        }
    }
    push("done", [], arr, []);
}`,
  "Comb Sort (C++)": `void visualize(int arr[], int n, void (*push)(char*, int[], int[], int[])) {
    int gap = n;
    bool swapped = true;
    
    while (gap > 1 || swapped) {
        gap = (gap * 10) / 13;
        if (gap < 1) gap = 1;
        
        swapped = false;
        for (int i = 0; i < n - gap; i++) {
            push("compare", [i, i + gap], arr, []);
            if (arr[i] > arr[i + gap]) {
                int temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                push("swap", [i, i + gap], arr, []);
                swapped = true;
            }
        }
    }
    push("done", [], arr, []);
}`,
  "Bubble Sort (JS)": `function visualize(arr, push) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      push('compare', [j, j+1], arr.slice());
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        push('swap', [j, j+1], arr.slice());
      }
    }
  }
  push('done', [], arr.slice());
}`,
  "Binary Search (JS)": `function visualize(arr, push, target) {
  arr.sort((a,b)=>a-b);
  let l=0, r=arr.length-1;
  while (l<=r) {
    const m = Math.floor((l+r)/2);
    push('compare', [m], arr.slice(), [l, r]);
    if (arr[m] === target) { push('found', [m], arr.slice(), [l, r]); return; }
    if (arr[m] < target) l = m + 1;
    else r = m - 1;
  }
  push('notfound', [], arr.slice());
}`,
  "Insertion Sort (JS)": `function visualize(arr, push) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      push('compare', [j, j+1], arr.slice());
      arr[j+1] = arr[j];
      push('set', [j+1], arr.slice());
      j--;
    }
    arr[j+1] = key;
    push('set', [j+1], arr.slice());
  }
  push('done', [], arr.slice());
}`,
  "Selection Sort (JS)": `function visualize(arr, push) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      push('compare', [minIdx, j], arr.slice());
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      push('swap', [i, minIdx], arr.slice());
    }
  }
  push('done', [], arr.slice());
}`,
  "Quick Sort (JS)": `function visualize(arr, push) {
  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      push('compare', [j, high], arr.slice());
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          push('swap', [i, j], arr.slice());
        }
      }
    }
    
    if (i + 1 !== high) {
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      push('swap', [i + 1, high], arr.slice());
    }
    
    return i + 1;
  }
  
  function quickSort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }
  
  quickSort(0, arr.length - 1);
  push('done', [], arr.slice());
}`,
  "Merge Sort (JS)": `function visualize(arr, push) {
  function merge(left, right, startIdx) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
      push('compare', [startIdx + i, startIdx + left.length + j], arr.slice());
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    
    while (i < left.length) {
      result.push(left[i]);
      i++;
    }
    
    while (j < right.length) {
      result.push(right[j]);
      j++;
    }
    
    // Update the original array
    for (let k = 0; k < result.length; k++) {
      arr[startIdx + k] = result[k];
      push('set', [startIdx + k], arr.slice());
    }
  }
  
  function mergeSort(low, high) {
    if (high - low <= 0) return;
    
    const mid = Math.floor((low + high) / 2);
    mergeSort(low, mid);
    mergeSort(mid + 1, high);
    
    const left = arr.slice(low, mid + 1);
    const right = arr.slice(mid + 1, high + 1);
    merge(left, right, low);
  }
  
  mergeSort(0, arr.length - 1);
  push('done', [], arr.slice());
}`,
  "Linear Search (JS)": `function visualize(arr, push, target) {
  for (let i = 0; i < arr.length; i++) {
    push('compare', [i], arr.slice());
    if (arr[i] === target) {
      push('found', [i], arr.slice());
      return;
    }
  }
  push('notfound', [], arr.slice());
}`,
  
  "Heap Sort (JS)": `function visualize(arr, push) {
  function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n) {
      push('compare', [largest, left], arr.slice());
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
    
    if (right < n) {
      push('compare', [largest, right], arr.slice());
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
    
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      push('swap', [i, largest], arr.slice());
      heapify(n, largest);
    }
  }
  
  // Build max heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr.length, i);
  }
  
  // Extract elements from heap one by one
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    push('swap', [0, i], arr.slice());
    heapify(i, 0);
  }
  
  push('done', [], arr.slice());
}`,
  
  "Counting Sort (JS)": `function visualize(arr, push) {
  if (arr.length === 0) {
    push('done', [], arr.slice());
    return;
  }
  
  const maxVal = Math.max(...arr);
  const count = new Array(maxVal + 1).fill(0);
  
  // Count occurrences
  for (const num of arr) {
    count[num]++;
  }
  
  // Reconstruct array
  let index = 0;
  for (let i = 0; i <= maxVal; i++) {
    for (let j = 0; j < count[i]; j++) {
      arr[index] = i;
      push('set', [index], arr.slice());
      index++;
    }
  }
  
  push('done', [], arr.slice());
}`,
  
  "Radix Sort (JS)": `function visualize(arr, push) {
  if (arr.length === 0) {
    push('done', [], arr.slice());
    return;
  }
  
  const maxVal = Math.max(...arr);
  let exp = 1;
  
  while (Math.floor(maxVal / exp) > 0) {
    // Counting sort for current digit
    const count = new Array(10).fill(0);
    const output = new Array(arr.length).fill(0);
    
    for (let i = 0; i < arr.length; i++) {
      const index = Math.floor(arr[i] / exp) % 10;
      count[index]++;
    }
    
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    for (let i = arr.length - 1; i >= 0; i--) {
      const index = Math.floor(arr[i] / exp) % 10;
      output[count[index] - 1] = arr[i];
      count[index]--;
    }
    
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      push('set', [i], arr.slice());
    }
    
    exp *= 10;
  }
  
  push('done', [], arr.slice());
}`,
  
  "Shell Sort (JS)": `function visualize(arr, push) {
  const n = arr.length;
  let gap = Math.floor(n / 2);
  
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      while (j >= gap && arr[j - gap] > temp) {
        push('compare', [j, j - gap], arr.slice());
        arr[j] = arr[j - gap];
        push('set', [j], arr.slice());
        j -= gap;
      }
      
      arr[j] = temp;
      push('set', [j], arr.slice());
    }
    
    gap = Math.floor(gap / 2);
  }
  
  push('done', [], arr.slice());
}`,
  
  "Cocktail Sort (JS)": `function visualize(arr, push) {
    const n = arr.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;
    
    while (swapped) {
        swapped = false;
        
        // Forward pass
        for (let i = start; i < end; i++) {
            push('compare', [i, i + 1], arr.slice());
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                push('swap', [i, i + 1], arr.slice());
                swapped = true;
            }
        }
        
        if (!swapped) break;
        
        swapped = false;
        end--;
        
        // Backward pass
        for (let i = end - 1; i >= start; i--) {
            push('compare', [i, i + 1], arr.slice());
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                push('swap', [i, i + 1], arr.slice());
                swapped = true;
            }
        }
        
        start++;
    }
    
    push('done', [], arr.slice());
}`,
  "Gnome Sort (JS)": `function visualize(arr, push) {
    let index = 0;
    while (index < arr.length) {
        if (index === 0) {
            index++;
        }
        push('compare', [index, index - 1], arr.slice());
        if (arr[index] >= arr[index - 1]) {
            index++;
        } else {
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            push('swap', [index, index - 1], arr.slice());
            index--;
        }
    }
    push('done', [], arr.slice());
}`,
  "Comb Sort (JS)": `function visualize(arr, push) {
    let gap = arr.length;
    let swapped = true;
    
    while (gap > 1 || swapped) {
        gap = Math.floor((gap * 10) / 13);
        if (gap < 1) gap = 1;
        
        swapped = false;
        for (let i = 0; i < arr.length - gap; i++) {
            push('compare', [i, i + gap], arr.slice());
            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                push('swap', [i, i + gap], arr.slice());
                swapped = true;
            }
        }
    }
    push('done', [], arr.slice());
}`,
  // Python Algorithms
  "Bubble Sort (Python)": `def visualize(arr, push):
    for i in range(len(arr)):
        for j in range(len(arr) - i - 1):
            push('compare', [j, j+1], arr[:])
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                push('swap', [j, j+1], arr[:])
    push('done', [], arr[:])`,
  
  "Binary Search (Python)": `def visualize(arr, push, target):
    arr.sort()
    l, r = 0, len(arr) - 1
    while l <= r:
        m = (l + r) // 2
        push('compare', [m], arr[:], [l, r])
        if arr[m] == target:
            push('found', [m], arr[:], [l, r])
            return
        elif arr[m] < target:
            l = m + 1
        else:
            r = m - 1
    push('notfound', [], arr[:])`,
  
  "Insertion Sort (Python)": `def visualize(arr, push):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            push('compare', [j, j+1], arr[:])
            arr[j+1] = arr[j]
            push('set', [j+1], arr[:])
            j -= 1
        arr[j+1] = key
        push('set', [j+1], arr[:])
    push('done', [], arr[:])`,
  
  "Selection Sort (Python)": `def visualize(arr, push):
    for i in range(len(arr) - 1):
        min_idx = i
        for j in range(i + 1, len(arr)):
            push('compare', [min_idx, j], arr[:])
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            push('swap', [i, min_idx], arr[:])
    push('done', [], arr[:])`,
  
  "Quick Sort (Python)": `def visualize(arr, push):
    def partition(low, high):
        pivot = arr[high]
        i = low - 1
        
        for j in range(low, high):
            push('compare', [j, high], arr[:])
            if arr[j] <= pivot:
                i += 1
                if i != j:
                    arr[i], arr[j] = arr[j], arr[i]
                    push('swap', [i, j], arr[:])
        
        if i + 1 != high:
            arr[i + 1], arr[high] = arr[high], arr[i + 1]
            push('swap', [i + 1, high], arr[:])
        
        return i + 1
    
    def quick_sort(low, high):
        if low < high:
            pi = partition(low, high)
            quick_sort(low, pi - 1)
            quick_sort(pi + 1, high)
    
    quick_sort(0, len(arr) - 1)
    push('done', [], arr[:])`,
  
  "Merge Sort (Python)": `def visualize(arr, push):
    def merge(left, right, start_idx):
        result = []
        i = j = 0
        
        while i < len(left) and j < len(right):
            push('compare', [start_idx + i, start_idx + len(left) + j], arr[:])
            if left[i] <= right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        
        while i < len(left):
            result.append(left[i])
            i += 1
        
        while j < len(right):
            result.append(right[j])
            j += 1
        
        # Update the original array
        for k in range(len(result)):
            arr[start_idx + k] = result[k]
            push('set', [start_idx + k], arr[:])
    
    def merge_sort(low, high):
        if high - low <= 0:
            return
        
        mid = (low + high) // 2
        merge_sort(low, mid)
        merge_sort(mid + 1, high)
        
        left = arr[low:mid + 1]
        right = arr[mid + 1:high + 1]
        merge(left, right, low)
    
    merge_sort(0, len(arr) - 1)
    push('done', [], arr[:])`,
  
  "Linear Search (Python)": `def visualize(arr, push, target):
    for i in range(len(arr)):
        push('compare', [i], arr[:])
        if arr[i] == target:
            push('found', [i], arr[:])
            return
    push('notfound', [], arr[:])`,
  
  "Heap Sort (Python)": `def visualize(arr, push):
    def heapify(n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n:
            push('compare', [largest, left], arr[:])
            if arr[left] > arr[largest]:
                largest = left
        
        if right < n:
            push('compare', [largest, right], arr[:])
            if arr[right] > arr[largest]:
                largest = right
        
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            push('swap', [i, largest], arr[:])
            heapify(n, largest)
    
    # Build max heap
    for i in range(len(arr) // 2 - 1, -1, -1):
        heapify(len(arr), i)
    
    # Extract elements from heap one by one
    for i in range(len(arr) - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        push('swap', [0, i], arr[:])
        heapify(i, 0)
    
    push('done', [], arr[:])`,
  
  "Counting Sort (Python)": `def visualize(arr, push):
    if len(arr) == 0:
        push('done', [], arr[:])
        return
    
    max_val = max(arr)
    count = [0] * (max_val + 1)
    
    # Count occurrences
    for num in arr:
        count[num] += 1
    
    # Reconstruct array
    index = 0
    for i in range(max_val + 1):
        for _ in range(count[i]):
            arr[index] = i
            push('set', [index], arr[:])
            index += 1
    
    push('done', [], arr[:])`,
  
  "Radix Sort (Python)": `def visualize(arr, push):
    if len(arr) == 0:
        push('done', [], arr[:])
        return
    
    max_val = max(arr)
    exp = 1
    
    while max_val // exp > 0:
        # Counting sort for current digit
        count = [0] * 10
        output = [0] * len(arr)
        
        for i in range(len(arr)):
            index = (arr[i] // exp) % 10
            count[index] += 1
        
        for i in range(1, 10):
            count[i] += count[i - 1]
        
        for i in range(len(arr) - 1, -1, -1):
            index = (arr[i] // exp) % 10
            output[count[index] - 1] = arr[i]
            count[index] -= 1
        
        for i in range(len(arr)):
            arr[i] = output[i]
            push('set', [i], arr[:])
        
        exp *= 10
    
    push('done', [], arr[:])`,
  
  "Shell Sort (Python)": `def visualize(arr, push):
    n = len(arr)
    gap = n // 2
    
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            
            while j >= gap and arr[j - gap] > temp:
                push('compare', [j, j - gap], arr[:])
                arr[j] = arr[j - gap]
                push('set', [j], arr[:])
                j -= gap
            
            arr[j] = temp
            push('set', [j], arr[:])
        
        gap //= 2
    
    push('done', [], arr[:])`,
  
  "Cocktail Sort (Python)": `def visualize(arr, push):
    n = len(arr)
    swapped = True
    start = 0
    end = n - 1
    
    while swapped:
        swapped = False
        
        # Forward pass
        for i in range(start, end):
            push('compare', [i, i + 1], arr[:])
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                push('swap', [i, i + 1], arr[:])
                swapped = True
        
        if not swapped:
            break
        
        swapped = False
        end -= 1
        
        # Backward pass
        for i in range(end - 1, start - 1, -1):
            push('compare', [i, i + 1], arr[:])
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                push('swap', [i, i + 1], arr[:])
                swapped = True
        
        start += 1
    
    push('done', [], arr[:])`
};
