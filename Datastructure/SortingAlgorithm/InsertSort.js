/**
 * @author D-lyw
 * @description Insert sort 插入排序
 * 插入排序每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序了，接着，
    它和第二项进行比较，第二项是应该待在原位还是插到第一项之前呢？这样，头两项就已正确排
    序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢？），以此类推
 */

function InsertSort(){
    var array = [3, 5, 1, 4, 2];
    this.insert = function(args){
        array.push(args);
    }
    this.toString = function(){
        return array.join();
    }

    this.insertSort = function(){
        var length = array.length,
            j, temp;
        for(var i = 1; i < length; i++){
            j = i; 
            temp = array[i];
            while(j > 0 && array[j-1] > temp){
                array[j] = array[j-1];
                j--;
            }
            array[j] = temp;
            console.log(this.toString());
        }
    }

}

var InsertSortTest = new InsertSort();
InsertSortTest.insertSort();

/**
 * 
3,5,1,4,2
1,3,5,4,2
1,3,4,5,2
1,2,3,4,5
 */