# JavaScript语言精粹和编程实践



## 第5章：JavaScript的函数式语言特性



#### 5.2.1.2 三元表达式的连用

```JavaScript
const obj = _get_from_Input()

const objType = (obj == 'String') ? String
	: (obj == 'Array') ? Array
	: (obj == 'Number') ? Number
	: (obj == 'Boolean') ? Boolean
	: (obj == 'RegExp') ? RegExp
	: Object

// 上下两种方式对比

switch (obj) {
    case 'String':
        obj = String; break;
    case 'Number':
        obj = Number; break;
    ...
    default :
    	obj = Object; break;
}

```

