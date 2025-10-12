//! Strings DSA:

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