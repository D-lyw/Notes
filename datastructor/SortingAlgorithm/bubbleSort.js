/**
 * @author D-lyw
 * @description Bubble sort 冒泡排序
 */

function BubbleSort(){
    var array = [];

    this.insert = function(item){
        array.push(item);
    }

    this.bubbleSort = function(){
        var length = array.length;
        for(var i = 0; i < length; i++){
            for(var j = 0; j < length - 1 -i; j++){
                if(array[j] > array[j+1]){
                    var temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
                console.log(this.toString());
            }
            console.log();
        }
    }

    this.toString = function(){
        return array.join();
    }
}

var bubbleTest = new BubbleSort();

var countTime = 8; 
while(countTime--){
    bubbleTest.insert(countTime);
}

bubbleTest.bubbleSort();

/**
 * 
[7, 6, 5, 4, 3, 2, 1, 0]  --->  [0, 1, 2, 3, 4, 5, 6, 7]

6,7,5,4,3,2,1,0
6,5,7,4,3,2,1,0
6,5,4,7,3,2,1,0
6,5,4,3,7,2,1,0
6,5,4,3,2,7,1,0
6,5,4,3,2,1,7,0
6,5,4,3,2,1,0,7

5,6,4,3,2,1,0,7
5,4,6,3,2,1,0,7
5,4,3,6,2,1,0,7
5,4,3,2,6,1,0,7
5,4,3,2,1,6,0,7
5,4,3,2,1,0,6,7

4,5,3,2,1,0,6,7
4,3,5,2,1,0,6,7
4,3,2,5,1,0,6,7
4,3,2,1,5,0,6,7
4,3,2,1,0,5,6,7

3,4,2,1,0,5,6,7
3,2,4,1,0,5,6,7
3,2,1,4,0,5,6,7
3,2,1,0,4,5,6,7

2,3,1,0,4,5,6,7
2,1,3,0,4,5,6,7
2,1,0,3,4,5,6,7

1,2,0,3,4,5,6,7
1,0,2,3,4,5,6,7

0,1,2,3,4,5,6,7
 */