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

}

console.log(getCoinChangeTP([1, 2, 5], 11));