//! Strings DSA: Strings are immutable Data Structures
//! 1) - [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) 
// Given a string s, find the length of the longest substring without duplicate characters.
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.

const lengthOfLongestSubstring = (s) => {
    if (s.length === 0) return 0;

    let lastIndex = new Map();
    let left = 0;
    let best = 0;

    for (let right = 0; right < s.length; right++) {
        let c = s[right];

        if (lastIndex.has(c) && lastIndex.get(c) >= left) {
            left = lastIndex.get(c) + 1; // shrink past the repeat:
        }
        lastIndex.get(c, right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}

console.log(lengthOfLongestSubstring("abcabcbb"));

//! 2)- [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)  
// Given a string s, return the longest palindromic substring in s.
// Input: s = "cbbd"
// Output: "bb"

//* approach A expand around the center - simple and practical O(n^2) time, O(1) space:
const longestPalindrome = (str) => {
    // some validation of the input arghs:
    if (typeof (str) !== 'string') throw new TypeError('str argh must be a string object');

    let bestStart = 0;
    let bestLen = 0;

    function expand(left, right) {
        while (left >= 0 && right < str.length && str[left] === str[right]) {
            left--;
            right++
        }
        return [left + 1, right - 1]; // return in a array DS, boundaries of a palindrome:
    }

    for (let i = 0; i < str.length; i++) {
        // odd length center at i:
        let [l1, r1] = expand(i, i);
        if (r1 - l1 + 1 > bestLen) {
            bestStart = l1;
            bestLen = r1 - l1 + 1;
        }
        // even-length palindrome:
        let [l2, r2] = expand(i, i + 1);
        if (r2 - l2 + 1 > bestLen) {
            bestStart = l2;
            bestLen = r2 - l2 + 1;
        }
    }
    return str.slice(bestStart, bestStart + bestLen);
}

console.log(longestPalindrome('cbbd'));
console.log(longestPalindrome('babad'));

// NOTE this is a different approach in solving the same problem of finding the longestPalindrome:
//* 2nd approach to above problem involves Dynamic Programming O(n^2) Time complexity: This is slower But an explicit palindrome Table:
const longestPalindromeDP = (str) => {
    const n = str.length;
    if (n === 0) return ' '; // base case if the input argh is empty:

    const dp = Array.from({ length: n }, () => Array(n).fill(false));
    let start = 0;
    let maxLen = 1;

    // substrings of length 1:
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }

    // substrings of length 2:
    for (let i = 0; i < n - 1; i++) {
        if (str[i] === str[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLen = 2;
        }
    }

    // substrings length of >= 3:
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            if (str[i] === str[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                start = i;
                maxLen = len;
            }
        }
    }
    return str.slice(start, start + maxLen);
}

// "bab" or "aba"
console.log(longestPalindromeDP('babad'));

// NOTE this is the most efficent solution to the above problem of palindrome:
//* The approach will involve Manacher's algorithm (O(n), O(n)) which is very efficient compared to the above 2 approaches DP or expansion from the center using pointers:
// TODO Study in depth the Manacher's algorithm: 
const longestPalManachers = (str) => {
    if (typeof str !== 'string') throw new TypeError('input must be a string');

    if (str.length <= 1) return str;

    // Transform: add sentinels to handle even/odd uniformly
    const t = '^#' + str.split('').join('#') + '#$';
    const n = t.length;

    const P = new Array(n).fill(0); // palindrome radius at each center
    let center = 0, right = 0;

    for (let i = 1; i < n - 1; i++) {
        const mirror = 2 * center - i;

        // Use mirror info if within the current right boundary
        if (i < right) P[i] = Math.min(right - i, P[mirror]);

        // Expand around center i
        while (t[i + 1 + P[i]] === t[i - 1 - P[i]]) P[i]++;

        // Update center and right boundary if expanded past right
        if (i + P[i] > right) {
            center = i;
            right = i + P[i];
        }
    }

    // Find max radius and center
    let maxLen = 0, centerIndex = 0;
    for (let i = 1; i < n - 1; i++) {
        if (P[i] > maxLen) {
            maxLen = P[i];
            centerIndex = i;
        }
    }

    // Map back to original string indices
    const start = Math.floor((centerIndex - maxLen) / 2);
    return str.slice(start, start + maxLen);
};

console.log(longestPalManachers('babad'));

//! 3) - [Valid Anagram](https://leetcode.com/problems/valid-anagram/)
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.
// Input: s = "anagram", t = "nagaram"
// Output: true
// TODO do the Valid Anagrams code algorithm:


//! 4)- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)  
//! 5)- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)  
//! 6)- [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)  
//! 7)- [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)  
//! 8)- [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)  
//! 9)- [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)  
//! 10)- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)  