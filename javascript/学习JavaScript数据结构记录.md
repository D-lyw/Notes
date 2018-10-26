# 学习JavaScript数据结构和算法一书 记录

在面向对象编程(oop)中,对象是类的实例. 一个类定义了对象的特征. 我们会创建很多的类来表示数据结构和算法

    function Book(title, pages, isbn){
        this.title = title;
        this.pages = pages;
        this.isbn = isbn;
    }

    类可以包含函数。可以声明和使用函数,如下所示:
    Book.prototype.printTitle = function(){
        console.log(this.title);
    };
    book.printTitle();

    也可以直接在类的定义里声明函数:
    function Book(title, pages, isbn){
        this.title = title;
        this.pages = pages;
        this.isbn = isbn;
        this.printIsbn = function(){
            console.log(this.isbn);
        }
    }

在原型的例子里, printTitle 方法只会创建一次,在 Book 类的所有实例中
***共享***。

如果是在定义类的内部结构时声明,每个类的实例都会有一份该方法的副
本。使用原型方法可以节约内存和降低实例化的开销。

最好在声明公共方法时使用基于原型的方法。

生成私有方法时用在类定义时内部声明的方式,这样其他实例不会访问到这个方法。


## 数据结构之数组

    var list = [];

    list.push();
    list.pop();

    list.unshift();
    list.shift();

#### 数组合并
+ concat 连接2个或更多数组,并返回结果

#### 迭代器函数
+ every 对数组中的每一项运行给定函数,如果该函数对每一项都
        返回 true ,则返回 true

+ filter 对数组中的每一项运行给定函数,返回该函数会返回 
        true 的项组成的数组

+ map 对数组中的每一项运行给定函数,返回每次函数调用的结果组成的数组

+ forEach 对数组中的每一项运行给定函数。这个方法没有返回值


#### 搜索

+ indexOf 返回第一个与给定参数相等的数组元素的索引,没有找到则返回-1

+ lastIndexOf 返回在数组中搜索到的与给定参数相等的元素的索引里最大的值



#### 排序

+ reverse 颠倒数组中元素的顺序,原先第一个元素现在变成最后
        一个,同样原先的最后一个元素变成了现在的第一个

+ sort 可以自定义排序 参数(compareFun)

+ slice 传入索引值,将数组里对应索引范围内的元素作为新数组返回

#### 数组转化为字符串

+ join 将所有的数组元素连接成一个字符串

+ toString 将数组所有的元素转化为字符串