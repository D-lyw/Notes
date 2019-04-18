// 手写快排练习

// 快排思路， 选择一个基准值， 将其他值依次与它比较， 小于基准值 放于左侧， 大于基准值， 放于右侧

/*
function quickSort(arr){
    var L = [];
    var R = [];
    if (arr.length <= 1) {
        return arr;
    }

    let base = arr[0];
    for(let i = 1; i < arr.length; i++){
        if (arr[i] < base) {
            L.push(arr[i]);
        } else {
            R.push(arr[i]);
        }
    }
    return Array.prototype.concat(quickSort(L), base, quickSort(R));
}
*/

let testArr = [43, 54, 23, -9, 3, 101]


function quickSort(arr, l, r){
    var pivot = arr[l];
    if(l >= r) {
        return;
    }
    var i = l , j = r;
    while(i < j ) {
        while (j > i) {
            if (arr[j] < pivot) {           // 从右到左找到第一个小于基准值的数， 并于基准值交换。
                arr[i] = arr[j];
                break;
            }
            j--;
        }
        while(i < j) {
            if (arr[i] > pivot) {           // 从左往右比较， 找到第一个大于基准值的数， 并于此时右侧的arr[j]值进行交换
                arr[j] = arr[i];
                break;
            }
            i++;
        }
    }
    // 当i==j值时
    arr[i] = pivot;
    quickSort(arr, l, i - 1);
    quickSort(arr, i + 1, r);
}

quickSort(testArr, 0, 5);
console.log(testArr);