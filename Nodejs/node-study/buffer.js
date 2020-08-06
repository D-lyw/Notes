const buf1 = Buffer.alloc(10);
console.log(buf1);

const buf2 = Buffer.alloc(10, 1);
console.log(buf2[1]);

const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);
