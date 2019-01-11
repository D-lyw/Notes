/**
 * @author D-lyw
 * @description Stack example1: 从十进制到二进制转换
 */

const Stack = require('./Stack');

var stack1 = new Stack();
var dealNum = 17;
var binaryString = '';

while(dealNum){
    stack1.push(dealNum % 2);
    dealNum = Math.floor(dealNum / 2);
}

for(var i = (stack1.size() -1); i >= 0; i--){
    binaryString += stack1.getIndex(i).toString();
}

// while(!stack1.isEmpty()){
//     binaryString += stack1.pop().toString();
// }


console.log(binaryString);