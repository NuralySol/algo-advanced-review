//! searching algorithms are the fundemenetal in the efficiency battle of the datasets, with some data sets having a large amount of elements.

//* given the sorted array of number types use the binary search to find the element target:
const sortedArray = [1, 3, 5, 7, 8, 11, 14];
const kTarget = 11;

//* binary search in principle, works by seperating the iterables in halves and discarding the other half (i.e. like a phone book looking up for the address or the person).

// this function will take two arghs arr object, and k-target value:
const binarySearch = (arr, k) => {
    // sort the array if the array is not sorted but this will add to the complexity of the funciton algorithm:
    if (!Array.isArray(arr)) throw new TypeError('arr input argh must be an array object!');
    if (!arr.every(item => typeof item === 'number')) throw new RangeError('every element of the arr argh must be a number data type');
    if (arr.length <= 2) throw new RangeError('length property must contain at least 2 elements');
    if (typeof (k) !== 'number') throw new Error('k target must be a number');

    // need the left and right pointers for the array point indices:
    let left = 0;
    let right = arr.length - 1;

    // iterate the argh arr;
    while (left <= right) {
        // init the midpoint of the arr argh:
        const mid = Math.floor((left + right) / 2);
        const midVal = arr[mid];

        // if the target is found at mid then good job:
        if (midVal === k) {
            // use the hash format for a better return:
            return { value: arr[mid], index: mid };
        }

        if (midVal < k) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return - 1;
}

console.log(binarySearch(sortedArray, kTarget));

// Linear-Search Algorithm: is one of the most fundemental algorithms O(n) is the time complexity if the data set is relatively small:

const arrayOfNums = [1, 2, 4, 6, 11, 16, 111, 220];
const kTarget1 = 111;

// use the linear search to find the k - target element within the arrayOfNums:
const linearSearch = (arr, k) => {
    if (arr.length === 0) return -1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === k) {
            return { value: arr[i], index: i };
        }
    }
    // otherwise if not in array argh return -1:
    return -1;
}

console.log(linearSearch(arrayOfNums, kTarget1));

// Example Hash Table setup (array of buckets):
// this will simulate hashtable:
const hashTable = new Array(5);
hashTable[2] = [['apple', 10], ['apricot', 15]];
hashTable[3] = [['banana', 25]];

// a simple hash function to convert a key (string) into a numeric index:
// NOTE this is a helper function:
const hashFunction = (key, tableSize) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash + key.charCodeAt(i) * i) % tableSize;
    }
    return hash;
}

//* main search hash function:
const hashSearch = (hashTable, key) => {
    // some validation of the hashTable structure, and the key:
    if (!Array.isArray(hashTable)) throw new TypeError('hashTable must be an array');
    if (typeof key !== 'string') throw new TypeError('key must be a string');
    if (hashTable.length === 0) return null;

    const index = hashFunction(key, hashTable.length);
    const bucket = hashTable[index];

    // empty bucket -> key not found:
    if (!bucket) return null; 

    // iterate through each [key, value] pair in the bucket:
    for (const [storedKey, storedValue] of bucket) {
        if (storedKey === key) {
            return storedValue; // key found -> return value:
        }
    }
    // key not found after checking bucket:
    return null;
}

// Example searches:
console.log(hashSearch(hashTable, 'apple'));   // Output: 10
console.log(hashSearch(hashTable, 'banana'));  // Output: 25
console.log(hashSearch(hashTable, 'grape'));   // Output null: