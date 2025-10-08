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
// - [3Sum](https://leetcode.com/problems/3sum/)  
// - [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)  
// - [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)  
// - [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)  
// - [Merge Intervals](https://leetcode.com/problems/merge-intervals/)  
// - [Insert Interval](https://leetcode.com/problems/insert-interval/)  

