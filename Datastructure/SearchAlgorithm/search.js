/**
 * @author D-lyw
 * @description Search Algorithm 搜索算法
 *  (1) 顺序搜索
 *  (2)  二分搜索
 */

function SearchAlgorithm() {

    var array = [];
    
    // 顺序查找
    this.sequentialSearch = function (item) {
        for (var i = 0; i < array.length; i++) {
            if (item == array[i]) {
                return i;
            }
        }
        return -1;
    }
    
    // 二分查找
    this.binarySearch = function (item) {

        // 先进行排序处理

        var low = 0,
            high = array.length - 1;
        var mid, element;

        while (low <= high) {
            mid = Math.floor((low + high) / 2);
            element = array[mid];
            if (element < item) {
                low = mid + 1;
            } else if (element > item) {
                high = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
    }
}