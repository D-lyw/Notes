/**
 * @author D-lyw
 * @description Select sort 选择排序
 * 选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并
 * 将其放置在第一位，接着找到第二小的值并将其放在第二位, 以此类推
 */

function SelectSort(){
    var array = [];

    this.selectionSort = function(){
        var aLength = array.length;
        var indexMin;
        for(var i = 0; i < aLength - 1; i++){
            indexMin = i;
            for(var j = i; j < aLength; j++){
                if(array[indexMin] > array[j]){
                    indexMin = j;
                }
            }
            if(indexMin != i){
                var temp = array[indexMin];
                array[indexMin] = array[i];
                array[i] = temp;
            }
            console.log(this.toString());
        }
    }

    this.insert = function(item){
        array.push(item);
    }
    this.toString = function(){
        return array.join();
    }
}

var selectSortTest = new SelectSort();

var countTime = 8; 
while(countTime--){
    selectSortTest.insert(countTime);
}

selectSortTest.selectionSort();

/**
 * 
0,6,5,4,3,2,1,7
0,1,5,4,3,2,6,7
0,1,2,4,3,5,6,7
0,1,2,3,4,5,6,7
0,1,2,3,4,5,6,7
0,1,2,3,4,5,6,7
0,1,2,3,4,5,6,7
 * 
 * 
 * 
 */