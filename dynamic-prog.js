//! Dynamic programming is one of the most important ways of segmenting problems into seperate solvable states and solutions while solving the main problem in steps.
// NOTE one of the classic DP examples is the fibonacci sequence since there are many ways of solving it efficiently:

//! 1) Recursion + memoization which is a top down solution DP:
// this solution involves params of n, also initialized memo = new Map() so that it only runs once and does not repeat itself <- memoization:
const fiboMemo = (n, memo = new Map()) => {
    // validation and the default return in order for memoization to work:
    if (memo.has(n)) return memo.get(n);
    if (n <= 1) return BigInt(n); //^ BigInt return in the nth format:
    const val = fiboMemo(n - 1, memo) + fiboMemo(n - 2, memo);
    memo.set(n, val);
    return val;
}

console.log(fiboMemo(10)); // expected output is 55:

//! 2) Iterative Bottom - up (tabulation): Time complexity is O(n) and space is O(1):
// NOTE BigInt -> handles unlimited integer size safely, since fibo sequence numbers can explode relatively quickly and thus BigInt can hold arbitrarily integers without losing precision:
const fiboIter = (n) => {
    if (n <= 1) return BigInt(n);
    let a = 0n;
    let b = 1n;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
};

console.log(fiboIter(9)); // exptected output is 34

//! Fast doubling (divide and conquer) - O(log n) <- this is the best general choice:
const fiboFast = (n) => {
    // this is a helper function of pair:
    const pair = (m) => {
        if (m === 0) return [0n, 1n];
        const [a, b] = pair(Math.floor(m / 2));
        const c = a * (2n * b - a);
        const d = a * a + b * b;
        return (m % 2 === 0) ? [c, d] : [d, c + d];
    }
    return pair(n)[0];
}

console.log(fiboFast(11));

//! 1) - [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)  
// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps.In how many distinct ways can you climb to the top
// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

//* Bottom up solution, Space os O(1) constant:
const climbWays = (n) => {
    if (n <= 1) return 1;
    let a = 1;
    let b = 1;
    for (let i = 1; i < n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}

console.log(climbWays(2));

//* Top Down with memoization:
function minCostClimbMemo(cost) {
    const n = cost.length;
    const memo = new Array(n).fill(-1);

    // helper function:
    function f(i) {
        if (i < 0) return 0;
        if (i <= 1) return cost[i];
        if (memo[i] !== - 1) return memo[i];

        // compute and cache:
        memo[i] = cost[i] + Math.min(f(i - 1), f(i - 2));
        return memo[i];
    }

    // answer: min cost to reach the top (past last stair):
    return Math.min(f(n - 1), f(n - 2))
}

console.log(minCostClimbMemo([10, 15, 20]));
console.log(minCostClimbMemo([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));

//! 2) - [Coin Change](https://leetcode.com/problems/coin-change/) 
// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
// You may assume that you have an infinite number of each kind of coin.
// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1

//* Bottom up Dynamic Programming (Tabulation):
const getCoinChange = (arr, k) => {
    if (k === 0) return 0;
    let n = k + 1; // sentinel value:
    let dp = new Array(k + 1).fill(n);
    dp[0] = 0;

    for (let i = 1; i <= k; i++) {
        for (let coin of arr) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
        }
    }
    if (dp[k] === n) {
        return - 1;
    }
    return dp[k];
}

console.log(getCoinChange([1, 2, 5], 11)) // output: 3

//* Top - Down Dynamic Programming:
const getCoinChangeTP = (coins, amount) => {
    let memo = new Map(); // cache for subproblem:

    //^ Depth-First-Search remaining amount, helper function.
    function dfs(rem) {
        // rest of the logic goes in here for the dfs solution:
        if (rem === 0) return 0;
        if (rem < 0) return Infinity;
        if (memo.has(rem)) return memo.get(rem);

        let minCoins = Infinity;

        // loop of the coin to count the coins:
        for (let coin of coins) {
            let result = dfs(rem - coin)
            if (result !== Infinity) {
                minCoins = Math.min(minCoins, 1 + result);
            }
        }
        memo.set(rem, minCoins)
        return memo.get(rem);
    }
    const ans = dfs(amount);
    // ternary return:
    return ans === Infinity ? -1 : ans;
}

console.log(getCoinChangeTP([1, 2, 5], 11));

//! 3) - [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
// Given an integer array nums, return the length of the longest strictly increasing subsequence.
// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

//* reconstruct one LIS: 
const increaseSubsequenceLIS = (arr) => {
    //* strict validation of the array argh:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (!arr.every(item => typeof item === 'number' && isFinite(item))) throw new RangeError('every element of the array must a finite number value');

    // init the helper vars:
    let n = arr.length;
    let dp = new Array(n).fill(1);
    let prev = new Array(n).fill(-1);

    let bestLen = 1;
    let bestEnd = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        } if (dp[i] > bestLen) {
            bestLen = dp[i];
            bestEnd = i;
        }
    }

    //* backtrack:
    let seq = [];
    let k = bestEnd;
    while (k !== -1) {
        seq.push(arr[k])
        k = prev[k]
    }
    seq.reverse();
    return seq;
}

console.log(increaseSubsequenceLIS([10, 9, 2, 5, 3, 7, 101, 18]));

//* O(n log n) LIS with sequence reconstruction (strictly increasing):
// NOTE this computes a strictly increasing LIS (<) 
// for non-decreasing LIS, change the binary search to find the first index tails[idx] > x (i.e. replace >= with >)
const lisFast = (arr) => {
    // light validation of the input arr argh:
    if (!Array.isArray(arr)) throw new TypeError('arr must be an array object!');
    if (!arr.every(item => typeof item === 'number' && Number.isFinite(item))) {
        throw new RangeError('every element of the arr argh must be a finite number');
    }
    if (arr.length === 0) return { length: 0, seq: [] };
    if (arr.length === 1) return { length: 1, seq: [arr[0]] };

    const n = arr.length;
    // tails[len-1] = smallest tail value of an inc. subseq of length len
    // index in arr of that tail
    // predecessor indices for reconstruction
    const tails = [];
    const tailsIdx = [];
    const prev = new Array(n).fill(-1);

    for (let i = 0; i < n; i++) {
        const x = arr[i];

        // binary search: first pos with tails[pos] >= x (lower bound):
        let l = 0;
        let r = tails.length;
        while (l < r) {
            // NOTE bitwise operation >> CHECK for later review:
            const m = (l + r) >> 1;
            if (tails[m] >= x) r = m; else l = m + 1;
        }
        const pos = l;

        // place/update x at pos:
        if (pos === tails.length) {
            tails.push(x);
            tailsIdx.push(i);
        } else {
            tails[pos] = x;
            tailsIdx[pos] = i;
        }

        // link predecessor (for pos > 0, predecessor is the tail index of length pos):
        prev[i] = (pos > 0) ? tailsIdx[pos - 1] : -1;
    };

    // reconstruct one LIS:
    const length = tails.length;
    const seq = [];
    let k = tailsIdx[length - 1];
    while (k !== - 1) {
        seq.push(arr[k]);
        k = prev[k];
    }
    seq.reverse();

    return { length, seq };
}

// expected return: { length: 4, seq: [2,5,7,101] } 
console.log(lisFast([10, 9, 2, 5, 3, 7, 101, 18]));

//! 4)- [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)  
// Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.
// A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
// For example, "ace" is a subsequence of "abcde".
// A common subsequence of two strings is a subsequence that is common to both strings.
// Input: text1 = "abcde", text2 = "ace" 
// Output: 3  
// Explanation: The longest common subsequence is "ace" and its length is 3.
// NOTE snippet how to create a matrix 
//^ let dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));


//* This solution is Bottom-Up tabulation which is O(m x n):
const longestCommonSubsequence = (text1, text2) => {
    let m = text1.length;
    let n = text2.length;
    //^ this Array prototype takes in Array prototype and an anon function ()=>: 
    let dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}

console.log(longestCommonSubsequence('abcde', 'ace'));

//* reconstruct the actual LCS seqeunce:
//^ let dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
const lcsSequence = (text1, text2) => {
    const m = text1.length, n = text2.length;

    // 1) Build DP table: dp[i][j] = LCS length of text1[0..i-1], text2[0..j-1]
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    // 2) Backtrack from bottom-right to reconstruct one LCS
    const seq = [];
    let i = m;
    let j = n;
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            seq.push(text1[i - 1]);
            i--; j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    seq.reverse();
    return seq.join('');
}

console.log(lcsSequence('abcde', 'ace'))

// Memoization appraoch in Solving the lscSequence problem: which is a Top-Down appraoch,
// 1. Write a recursive function that expresses the problem in terms if smaller subproblems,
// 2. and cache (memoize) each result so you never recompute it twice.

//* this function will be recursive and will memoization approach in solving the problem:
const lcsLengthMemo = (text1, text2) => {
    // some validation of the input arghs:
    if (typeof (text1) !== 'string') throw new TypeError('text1 must be a string argh');
    if (typeof (text2) !== 'string') throw new TypeError('text2 must be a string argh');

    // init the m and n to the length property of each argh values of the strings:
    let m = text1.length;
    let n = text2.length;

    const memo = Array.from({length: m + 1}, ()=> Array(n + 1).fill(-1))

    // helper function of dfs
    function dfs(i, j) {
        if (i === 0 || j === 0) return 0;
        if (memo[i][j] !== - 1) return memo[i][j]

        if (text1[i - 1] === text2[j - 1]) {
            memo[i][j] = 1 + dfs(i - 1, j - 1);
        } else {
            memo[i][j] = Math.max(dfs(i - 1, j), dfs(i, j - 1));
        }
        return memo[i][j]
    }
    // return the function:
    return dfs(m, n)
}

console.log(lcsLengthMemo('abcde', 'ace'));

//! 5)- [Word Break](https://leetcode.com/problems/word-break/)  
// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
// Note that the same word in the dictionary may be reused multiple times in the segmentation.
// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
const wordBreak = (str, wordDict) => {
    // some validation of the input arghs:
    if (typeof (str) !== 'string') throw new TypeError('str must be a string argh');
    if (!Array.isArray(wordDict)) throw new TypeError('wordDict must be an array object');
    if (!wordDict.every(item => typeof item === 'string')) throw new TypeError('every element of the wordDict argh must be a string');

    // main logic of the function:
    let n = str.length;
    // dp prototype full of false values for the element values:
    let dp = new Array(n + 1).fill(false);
    dp[0] = true // reassign the first index[0] to a true element value:

    // loop that skips the first element address index value:
    for (let i = 1; i <= n; i++) {
        for (let word of wordDict) {
            let len = word.length;
            if (i >= len && dp[i - len] === true && str.slice(i - len, i) === word) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n]
}

//* expetected return is true since leetcode can be broken down into 'leet' and 'code'
console.log(wordBreak('leetcode', ['leet', 'code']));

// TODO  Top-Down recursive + memoized version next (which solves the same problem differently), finish the above wordBreak the above problem: