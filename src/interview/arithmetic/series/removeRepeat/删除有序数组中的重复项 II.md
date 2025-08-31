# 删除有序数组中的重复项 II

## 题目

### 难度

中等

### 描述
一个有序数组 nums ，需要 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。

不要使用额外的数组空间，必须在 **原地** 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

### 示例

- 示例 1:

    输入: nums = [1,1,1,2,2,3]
    输出: 5, nums = [1,1,2,2,3]
- 示例 2:

    输入: nums = [0,0,1,1,1,1,2,3,3]
    输出: 7, nums = [0,0,1,1,2,3,3]

### 链接地址

[leedCode链接](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description/?envType=study-plan-v2&envId=top-interview-150)

## 答题思路

这里有两个考点，第一个是要修改原数组，第二个是返回不重复元素数量。

这里题目做了进一步要求，就是每个元素最多出现两次，那么我们就可以通过一个变量（例如 Map、Object）来记录当前元素出现的次数，如果超过两次，我们就把这个元素从数组中删掉，并终止这次的循环；否则表明数据未出现过或者只出现过一次，记录该数据出现的次数 +1 ，并让循环索引自增1。

## 解答代码
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let map = new Map()
    let i = 0
    while (i < nums.length) {
        if (map.get(nums[i]) >= 2) {
            nums.splice(i, 1)
            continue
        }
        map.set(nums[i], (map.get(nums[i]) || 0) + 1)
        i++
    }
    return nums.length;
};
```