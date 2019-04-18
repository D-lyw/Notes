/**
 * @author D-lyw
 * @description Quick sort 快速排序
 */

function QuickSort() {
    var array = [8, 7, 6, 5, 4, 3, 2, 1, 0];
    this.insert = function (item) {
        array.push(item);
    }
    this.toString = function () {
        return array.join();
    }

    this.quickSort = function () {
        quick(array, 0, array.length - 1);
    }

    var quick = function (array, left, right) {

        var index;

        if (array.length > 1) {

            index = partition(array, left, right);

            if (left < index - 1) {
                quick(array, left, index - 1);
            }

            if (index < right) {
                quick(array, index, right);
            }
        }
    }

    var partition = function (array, left, right) {
        var pivot = array[Math.floor((right + left) / 2)],
            i = left,
            j = right;

        while (i <= j) {
            while (array[i] < pivot) {
                i++;
            }
            while (array[j] > pivot) {
                j--;
            }
            if (i <= j) {
                swapQuickSort(array, i, j);
                i++;
                j--;
            }
        }
        return i;
    }
    
    var swapQuickSort = function(array, index1, index2){
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    }
}

var quickSortTest = new QuickSort();
quickSortTest.quickSort();
console.log(quickSortTest.toString());