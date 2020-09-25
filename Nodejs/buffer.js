/*
 * @Author: D-lyw 
 * @Date: 2019-03-26 16:27:03 
 * @Last Modified by: D-lyw
 * @Last Modified time: 2019-03-26 17:22:38
 */

/* *********************** */
//  Node.js api => Buffer  //
/* *********************** */

/*
在引入 TypedArray 之前, JavaScript 没有读取或操作二进制数据流的机制. 
Buffer 类用于在 tcp流 或者 文件系统等场景中处理字节流
现在有了 TypedArray, Buffer 类 以一种更优化, 更合适 Node.js 的方式实现 Uint8Array.

Buffer 类实例类似与整数数组, 但 Buffer 的大小是固定的, 且在V8堆外分配物理内存. Buffer的大小在创建时确定, 且无法改变

Buffer 类是一个全局变量, 使用时无需引用

*/

// 创建一个长度为10, 且用 0 填充的 buffer.
const buf1 = Buffer.alloc(10);
console.log(buf1);

// 创建一个长度为10, 用 1 填充的 buffer.
const buf2 = Buffer.alloc(10, 1);
console.log(buf2[1]);

// 创建一个长度为10, 且未初始化的 buffer
// 该方法比 .alloc() 更快, 但 返回的 buffer 实例, 未初始化, 可能含有旧数据, 因此需要 fill() 或 write() 重写
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);

const buf4 = Buffer.from([1, 2, 3]);
console.log(buf4);  // <Buffer 01 02 03>

const buf5 = Buffer.from('test', 'ascii');
console.log(buf5);  // <Buffer 74 65 73 74>
console.log(buf5.toString('hex'));  // 74657374
console.log(buf5.toString('base64'));   // dGVzdA==

const buf6 = Buffer.from('你好，世界！', 'binary');
const buf7 = Buffer.from('你好，世界！', 'utf8');
console.log(buf6);  // <Buffer 60 7d 0c 16 4c 01>
console.log(buf7);  // <Buffer e4 bd a0 e5a5 bd ef bc 8c e4 b8 96 e7 95 8c ef bc 81 e4 bd a0>

/*
1. Buffer.from(array) 返回一个 Buffer，包含传入的字节数组的拷贝。
2. Buffer.from(arrayBuffer[, byteOffset [, length]]) 返回一个 Buffer，与传入的 ArrayBuffer 共享内存。
3. Buffer.from(buffer) 返回一个 Buffer，包含传入的 Buffer 的内容的拷贝。
4. Buffer.from(string[, encoding]) 返回一个 Buffer，包含传入的字符串的拷贝。
5. Buffer.alloc(size[, fill[, encoding]]) 返回一个指定大小且已初始化的 Buffer。 该方法比 Buffer.allocUnsafe(size) 慢，但能确保新创建的 Buffer 不会包含旧数据。
6. Buffer.allocUnsafe(size) 与 Buffer.allocUnsafeSlow(size) 返回一个指定大小但未初始化的 Buffer。 因为 Buffer 是未初始化的，可能包含旧数据。
*/

var arr = [56, 23, 8];
const buffer = Buffer.from(arr);
const cpbuf = Buffer.from(buffer, 0, buffer.length);
console.log(buffer[1] === cpbuf[1]);
buffer[1] = 100;

console.log(cpbuf[1]);

