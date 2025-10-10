//! This is an advanced review of the JS and its Data Structures and algorithms with the primary focus being able to solve the complex theoretical and pattern finding solutions that is expected of a programmer. This file will contain the solutions and problems for array Manipulations of the imfamous blind - 75 questions of the DSA. 

//! - [Two Sum](https://leetcode.com/problems/two-sum/)  
//* 1) getTwoSum of the n - length of the array where two elements will equal or not equal to the sum k target of n-length argh array:
const getTwoSum = (arr, k) => {
    //^ strict validation of the array argh and k - target value:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (!arr.every(item => typeof item === 'number' && !isNaN(item))) throw new TypeError('every element of the arr argh must be a number!');
    if (!arr.every(item => item > 0)) throw new RangeError('All numbers in the array argh must be positive');
    if (arr.length <= 2) throw new TypeError('arr length must greater than or equal to 2');
    if (typeof k !== 'number' || isNaN(k)) throw new TypeError('k target value must be a number');

    // main logic of the function getTwoSum:
    // init the left and right pointers which are pointing positionally in a dynamic array argh object:
    let left = 0;
    let right = arr.length - 1;

    // conditional while loop and move (i.e. decreament and increament)the pointers until the k-sum argh is found or not found:
    while (left < right) {
        // init the sum var to capture the sum dynamically:
        const sum = arr[left] + arr[right];
        // comprate against the sum k - target, with the return of the values [arr[left], arr[right]]:
        if (sum === k) {
            // modify the return to also return the index values for better clarity of the location of the k-target sum:
            return { values: [arr[left], arr[right]], indices: [left, right] }
        } else if (sum < k) {
            left++;
        } else {
            right--;
        }
    }
    // otherwise make a return if no sum target has been found in the argh array elements:
    return 'No two elements were found that will equal to sum target!';
}

// argh n-length array argh with k-target that is found in the array arghment elements:
console.log(getTwoSum([1, 2, 3, 5, 11, 15, 16], 20));

//* getTwoSum solving version B with with the Hash Map or so called global Map object of the JS: hash map lookup is O(1) in time complexity:
const getTwoSumMap = (arr, k) => {
    // strict validation of the array argument and k-target value:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (!arr.every(item => typeof item === 'number' && isFinite(item))) throw new TypeError('every element of the array argh must be finite and number');
    if (arr.length <= 2) throw new TypeError('array must contain at least two elements');
    if (typeof (k) !== 'number') throw new TypeError('k target value must be a number');

    // main logic of the function getTwoSumMap using the global map object:
    const seen = new Map();

    // traditional loop to capture all of the elements of the array argh numbers:
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]); // log of the elements so far:
        // init a complement object: 
        const complement = k - arr[i];
        if (seen.has(complement)) {
            //^ modify the return in order to see the values as well as the index:
            return {
                values: [complement, arr[i]],
                indices: [seen.get(complement), i]
            }
        } else {
            seen.set(arr[i], i)
        }
    }
    // else make a return statement if the target k sum is not found in the array argh:
    return 'no two elements were found that will equal to the k target sum value!';
}
// invoke the function with different arguments for clarity:
console.log(getTwoSumMap([2, 3, 4, 6, 11, 12], 23));

// NOTE CONCEPT OF "COMPLEMENT":
//     - For each number in the array (call it `num`),
//       we calculate the *missing number* that would reach the target.
// * Formula:
//^       complement = k - num
//     - Example:
//           If target (k) = 10 and current number = 6,
//           then complement = 10 - 6 = 4
//           → We need a 4 to reach the target 10.
//           - complement = the missing number to reach the target.


//! - [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)  
//* 2) Best Time To Sell Stock: Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

const maxProfit = (prices) => {
    // strict validation of the prices argh which is an array object:
    if (!Array.isArray(prices)) throw new TypeError('prices must be an array object!');
    if (!prices.every(item => typeof item === 'number' && isFinite(item))) throw new TypeError('every element of the prices argh must be a number and must be finite!');
    if (prices.length <= 2) throw new RangeError('prices argument must contain at least 2 element within the array object arument!');

    // init the defaut contingent variables of the function maxProfit (helper variables):
    let minPrice = Infinity;
    let bestProfit = 0;

    for (let i = 0; i < prices.length; i++) {
        // compare the current captured element to the minPrice var which is Infinity will always produce true:
        const price = prices[i];

        // update the minPrice if a cheaper price is found:
        if (price < minPrice) {
            minPrice = price;
        } else {
            // const profit of the price - minPrice to calculate potential profit if selling today:
            const profit = price - minPrice;
            // use Math.max method to find the max of the two variables for the return of the max value:
            bestProfit = Math.max(bestProfit, profit);
        }
    }
    // return the maximum profit:
    return bestProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));

//! 3) - [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) 
// Input: nums = [1,2,3,1]
// Output: true
// Explanation:
// The element 1 occurs at the indices 0 and 3.
const containsDuplicate = (arr) => {
    // strict validation of the array argh array:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (arr.length <= 2) throw new TypeError('arr argh must contain at least 2 elements within the array argh object!');
    if (!arr.every(item => typeof item === 'number' && isFinite(item))) throw new TypeError('every element of the arr argh must be a number and a finite number');

    // main logic of the function containsDuplicates using the Set global object which can only contain unique elements only:
    const seen = new Set(arr);

    // compare the size property of set to a length property array if they are not equal that means original array does contain a reapeting element within it: 
    if (seen.size !== arr.length) {
        return true;
    } else {
        return false;
    }
    // NOTE you can use a one liner -> return seen.size !== arr.length; which will return true or false:
}

console.log(containsDuplicate([1, 2, 3, 1]));

//! 4) - [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]

// NOTE Need to practice more with prefix, suffix and postfix operations in the array object:

const productOfArrExceptSelf = (arr) => {
    // strict validation of the arr argument array:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (arr.length < 1) throw new TypeError('arr argh must contain at least 1 element within the array argh object!');
    if (!arr.every(item => typeof item === 'number' && isFinite(item))) throw new TypeError('every element of the arr argh must be a number and a finite number');

    // arr prototype arr.length filled with 1's of the length 4:
    let result = new Array(arr.length).fill(1);

    // Step 1: Prefix pass - multiply all elements to the left of each index:
    let prefix = 1;
    for (let i = 0; i < arr.length; i++) {
        // grab the prototype result[i] array and assign a prefix value of 1 to it:
        result[i] = prefix;
        prefix = prefix * arr[i];
    }

    // Step 2: Postfix pass - multiply all elements to the right of each index:
    let postfix = 1;
    for (let i = arr.length - 1; i >= 0; i--) {
        result[i] = result[i] * postfix;
        postfix = postfix * arr[i];
    }
    return result;
}

console.log(productOfArrExceptSelf([1, 2, 3, 4]));

//! 5) - [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/);
// Given an integer array nums, find the subarray with the largest sum, and return its sum.
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4] NOTE contains negative value elements:
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.
//* NOTE  this function uses kadane's algorithm to solve it efficiently, Kadane's algorithm must preserve the original array and its elements in place DO NOT SORT:
const getMaxSubArray = (arr) => {
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array!');
    //^ DO NOT sort the array if using Kadane's algorithm: CRITICAL ERROR!
    let maxSoFar = arr[0];
    let currentMax = arr[0];

    // loop from the 1st index skipping the 0 index since we are already tracking it:
    for (let i = 1; i < arr.length; i++) {
        // either extend the previous subarray or start new from arr[i]:
        currentMax = Math.max(arr[i], currentMax + arr[i]); // 12 is the current max:
        // update the global max if the current sum is greater:
        maxSoFar = Math.max(maxSoFar, currentMax)
    }
    return maxSoFar;
}

console.log(getMaxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))

//! 6) - [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)  
// Given an integer array nums, find a subarray that has the largest product, and return the product.
// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.
// This function will also use kadane's algorithm and thus it must preserve its order:
const getMaxProductSubArray = (arr) => {
    //* strict validation of the array argh object:
    if (!Array.isArray(arr)) throw new TypeError('arr argh object must be an array object!');
    if (!arr.every(item => typeof item === 'number')) throw new TypeError('every element of the array argh must a number');
    if (arr.length < 1) throw new RangeError('array must contain at least 1 element');

    // init the helper variables:
    let maxProductSoFar = arr[0];
    let currentMax = arr[0];
    let currentMin = arr[0];

    // loop through n-length of the array from the index 1 since we are already tracking the 1st element in the above vars:
    for (let i = 1; i < arr.length; i++) {
        let value = arr[i];

        // if the current value is negative, swap currentMax and currentMin:
        if (value < 0) {
            // swap in place:
            [currentMax, currentMin] = [currentMin, currentMax]
        }
        // update the currentMax and currentMin by including the current value:
        currentMax = Math.max(value, currentMax * value);
        currentMin = Math.min(value, currentMin * value);

        // update the global best:
        maxProductSoFar = Math.max(maxProductSoFar, currentMax);
    }
    return maxProductSoFar;
}

console.log(getMaxProductSubArray([2, 3, -2, 4]));

//! 7) - [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) 
// Given the sorted rotated array nums of unique elements, return the minimum element of this array. 
// Input: nums = [3,4,5,1,2]
// Output: 1
// Explanation: The original array was [1,2,3,4,5] rotated 3 times.
// Rotaion is index shifting Not a 'rotation' in a classic sense:
const findMin = (arr) => {
    // strict validation of the arr argh object:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must an array object!');
    if (arr.length < 1) throw new RangeError('array must contain at least 1 element within it');
    if (!arr.every(item => typeof item === 'number' && isFinite(item))) throw new TypeError('every element of the array must a number and must be finite in value');

    // get the left and right pointers of the array argument:
    let left = 0;
    let right = arr.length - 1;

    // if the array is not rotated (first element < last element!):
    if (arr[left] < arr[right]) {
        return arr[left];
    }
    while (left < right) {
        // get the midpoint of the array argument:
        let mid = Math.floor((left + right) / 2);

        //* Case 1: mid element is greater than right element:
        // NOTE minimum is in the right half (Binary Search):
        if (arr[mid] > arr[right]) {
            left = mid + 1;
        } else {
            //* Case 2: mid element is less than or equal to right element:
            // minimum is in left half (including mid):
            right = mid;
        }
    }
    // When the loop ends, left == right, pointing to the smallest element:
    return arr[left];
}

console.log(findMin([3, 4, 5, 1, 2]));
//! 8) - [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)  
// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4 
// Time complexuty of this algorithm is O (log n) Space O(1) -> constant!

const findInRotatedArr = (arr, k) => {
    // strict validation of the array argh and the k target:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object');
    if (arr.length < 2) throw new TypeError('arr argh must contain at least at least 2 elements');
    if (!arr.every(item => typeof item === 'number' && isFinite(item))) throw new RangeError('every element of the array must a number and must finite in value');
    if (typeof (k) !== 'number') throw new TypeError('k target element must ba number value');

    // init the left and right pointers of the array indices:
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // if found right in the middle, i.e. k target equals to the arr[mid] value!
        if (arr[mid] === k) {
            return mid;
        }
        // determine which half is sorted:
        if (arr[left] <= arr[mid]) {
            // left half [left.. mid] is sorted:
            if (arr[left] <= k && k < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // right half [mid.. right] is sorted:
            if (arr[mid] < k && k <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return - 1;
}

console.log(findInRotatedArr([4, 5, 6, 7, 0, 1, 2], 0))

//! 9) - [3Sum](https://leetcode.com/problems/3sum/) 
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation: 
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

const getThreeSum = (arr) => {
    //* strict validation of the array argh value input:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (!arr.every(item => typeof item === 'number' && isFinite(item))) throw new TypeError('every element of the arr argh must be a finite number');
    if (arr.length < 3) throw new RangeError('arr must contain at least 3 elements within range');

    // array holder of result:
    let result = []
    //* Main logic of the function getThreeSum:
    // Step1: is to sort the array in place:
    arr.sort((a, b) => a - b);

    // Step2: Loop through each number as the fixed element
    for (let i = 0; i < arr.length - 2; i++) {
        // skip duplicates values for the first number:
        if (i > 0 && arr[i] === arr[i - 1]) continue;

        let left = i + 1;
        let right = arr.length - 1;

        // Step3: Use the two-pointer technique:
        while (left < right) {
            let total = arr[i] + arr[left] + arr[right];

            if (total === 0) {
                result.push([arr[i], arr[left], arr[right]]);

                // skip duplicates for left and right:
                while (left < right && arr[left] === arr[left + 1]) {
                    left = left + 1;
                }
                while (left < right && arr[right] === arr[right - 1]) {
                    right = right - 1;
                }
                // move the both pointers inwards:
                left = left + 1;
                right = right - 1;
            } else if (total < 0) {
                // need a bigger sum -> move left forward:
                left = left + 1;
            } else {
                // need a smaller sum -> move right backward:
                right = right - 1;
            }
        }
    }
    // return the finished result:
    return result;
}

// invoke the function with the expected output of [-1,0,1] and [-1,-1,2].
console.log(getThreeSum([-1, 0, 1, 2, -1, -4]));

//! 10) - [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)  
// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

// NOTE this algorithm uses two pointer technique in its approach to solve this challenge:
const mostWaterMaxArea = (arr) => {
    // strict validation of the array argh:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (!arr.every(item => typeof item === 'number' && isFinite(item))) throw new TypeError('every element of arr argh must be a finite number');
    if (arr.length < 2) throw new RangeError('arr must contain more than 2 elements');

    // main logic of the function, with the two-pointer technique approach!
    let left = 0;
    let right = arr.length - 1;
    let best = 0;

    // while conditional function of left < right:
    while (left < right) {
        let width = right - left;
        let height = Math.min(arr[left], arr[right]);
        let area = width * height;
        best = Math.max(best, area);

        // move the pointer at the shorter line inward:
        if (arr[left] < arr[right]) {
            left = left + 1;
        } else {
            right = right - 1;
        }
    }
    // return the best so far!
    return best;
}

console.log(mostWaterMaxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));

//! 11) - [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)  
// Given n non - negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

// NOTE Two pointer is one of the approaches with space optimization of O(1), idea being water at i min(max_left, max_rigth) - heigth[i] if positive: 
// Track running max left and max right while shrinking the window from both ends:
const trapRainWater = (arr) => {
    //* strict validation of the arr argh:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object');
    if (!arr.every(item => typeof item === 'number' && isFinite(item))) throw new RangeError('every element of the arr argh must be a finite number');
    if (arr.length < 3) throw new RangeError('arr argh must contain at least 3 elements within the argument range');

    // main logic of algorithm using the Two Pointer approach:
    let left = 0;
    let right = arr.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    // while conditional loop:
    while (left <= right) {
        if (arr[left] <= arr[right]) {
            if (arr[left] >= leftMax) {
                leftMax = arr[left];
            } else {
                water = water + (leftMax - arr[left]);
            }
            left = left + 1;
        } else {
            if (arr[right] >= rightMax) {
                rightMax = arr[right];
            } else {
                water = water + (rightMax - arr[right])
            }
            right = right - 1;
        }
    }
    return water;
}

console.log(trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));

//! 12) - [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)  
// You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
// Return the max sliding window.
// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
// Explanation: 
// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

// NOTE Optimal approach is Time Complexity, O(n) Space is O(k) using the Deque, we maintain a monotonic decreasing deque(stores indices). The front always holds the index of the maximum element in the current window.
const maxSlidingWindow = (arr, k) => {
    //* strict validation of the arr argh value and k argh value:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array!');
    if (!arr.every(item => typeof item === 'number' && isFinite(item))) throw new RangeError('every element of arr argh must a finite number value');
    if (arr.length < 3) throw new RangeError('arr must contain more than 3 elements');
    if (typeof (k) !== 'number') throw new TypeError('k argh value must be a number value');

    //^ main logic of the algorithm:
    const deque = []; // will store indices, Not the values:
    const result = []; // an empty array holder:

    // loop through n-length of the array argh input, to capture values:
    for (let i = 0; i < arr.length; i++) {
        //* step1: remove the indices out of the window (left side)
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift()
        }
        //* step2: remove smaller elements from right, because they will never be the max if a bigger one exists:
        while (deque.length > 0 && arr[deque[deque.length - 1]] < arr[i]) {
            deque.pop()
        }
        //* step3: add current index to the deque:
        deque.push(i);
        //* step4: the window is 'ready' once i >= k - 1:
        if (i >= k - 1) {
            result.push(arr[deque[0]])
        }
    }
    return result;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

//! 13) - [Merge Intervals](https://leetcode.com/problems/merge-intervals/)  
// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
//^ Overlap rule (inclusive endpoints), two intervals [aStart, aEnd] overlap iff bStart <= aEnd: Time: O(n log n) (sort dominates)
// Space: O(n) (output; in-place tweak possible)

// NOTE helper function of the valid matrix, in order to validate the matrix structres:
function isValidIntervals(matrix) {
    if (!Array.isArray(matrix)) return false;
    // allow empty list of intervals
    if (matrix.length === 0) return true;

    // every row must be a 2-tuple of finite numbers
    return matrix.every(
        (row) =>
            Array.isArray(row) &&
            row.length === 2 &&
            Number.isFinite(row[0]) &&
            Number.isFinite(row[1])
    );
}
// -- End of helper function for the validatio of the matrix structure -- //

//* argh input is matrix structure (intervals):
const mergeIntervals = (intervals) => {
    if (!isValidIntervals(intervals)) {
        throw new TypeError('intervals must be an array of [number, number]');
    }
    if (intervals.length === 0) return [];

    // (optional) normalize so start <= end
    // const arr = intervals.map(([s,e]) => (s <= e ? [s,e] : [e,s]));
    // const sorted = arr.sort((a,b) => a[0] - b[0]);

    const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);

    const merged = [];
    let [curStart, curEnd] = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
        const [s, e] = sorted[i];
        // CLOSED intervals overlap if nextStart <= currentEnd
        if (s <= curEnd) {
            curEnd = Math.max(curEnd, e);
        } else {
            merged.push([curStart, curEnd]);
            [curStart, curEnd] = [s, e];
        }
    }
    // final block:
    merged.push([curStart, curEnd]);
    return merged;
};


console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]));

//! 14) - [Insert Interval](https://leetcode.com/problems/insert-interval/)  
// You are given a list of non-overlapping intervals sorted by start time, and a new interval.
// Insert the new interval into the list and merge any overlaps.
// intervals = [[1,3],[6,9]]
// newInterval = [2,5]
// Output → [[1,5],[6,9]]

const insertIntervals = (intervals, newInterval) => {
    // helper variables:
    let result = [];
    let i = 0;
    let n = intervals.length;

    let newStart = newInterval[0];
    let newEnd = newInterval[1];

    // step1: add all intervals that end before newInterval starts:
    while (i < n && intervals[i][1] < newStart) {
        result.push(intervals[i]);
        i++;
    }

    // step2: merge all overlapping intervals with newInterval:
    while (i < n && intervals[i][0] <= newEnd) {
        newStart = Math.min(newStart, intervals[i][0]);
        newEnd = Math.max(newEnd, intervals[i][1]);
        i++;
    }
    //* push the merged interval:
    result.push([newStart, newEnd]);

    // step3: add the remaining intervals:
    while (i < n) {
        result.push(intervals[i])
        i++;
    }
    return result;
}

console.log(insertIntervals([[1, 3], [6, 9]], [2, 5]));