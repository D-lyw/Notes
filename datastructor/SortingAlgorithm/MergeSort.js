/**
 * @author D-lyw
 * @description Merge sort 归并排序
 */

function MergeSort() {
    var array = [8, 7, 6, 5, 4, 3, 2, 1, 0];
    this.insert = function (item) {
        array.push(item);
    }
    this.toString = function () {
        return array.join();
    }

    this.mergeSort = function () {
        array = mergeSortRec(array);
    }

    var mergeSortRec = function (array) {
        var length = array.length;
        if (length === 1) {
            return array;
        }
        var mid = Math.floor(length / 2),
            left = array.slice(0, mid),
            right = array.slice(mid, length);
        console.log("Left: " + left.join() + " Right: " + right.join());
        return merge(mergeSortRec(left), mergeSortRec(right));
    }

    var merge = function (left, right) {
        var result = [],
            iL = 0,
            iR = 0;

        while (iL < left.length && iR < right.length) {
            if(left[iL] < right[iR]) {
                result.push(left[iL++]);
            } else {
                result.push(right[iR++]);
            }
        }

        while (iL < left.length) {
            result.push(left[iL++]);
        }

        while (iR < right.length) {
            result.push(right[iR++]);
        }
        console.log(result.join());
        return result;
    }
}

var mergeSort = new MergeSort();

mergeSort.mergeSort();
console.log(mergeSort.toString());