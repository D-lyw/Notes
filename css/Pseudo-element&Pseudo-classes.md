# CSS 伪类和伪元素

## 一、介绍

> CSS introduces the concepts of pseudo-elements and pseudo-classes to permit formatting based on information that lies outside the document tree.



伪类：用于当已有元素处于的某个状态时，为其添加对应的样式，这个样式的状态是根据用户行为而动态变化

伪元素：用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过:before 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。



## 二、伪元素使用单冒号还是双冒号

CSS3 规范中的要求使用双冒号 (::) 表示伪元素，以此来区分伪元素和伪类，比如::before 和::after 等伪元素使用双冒号 (::)，:hover 和:active 等伪类使用单冒号 (:)。除了一些低于 IE8 版本的浏览器外，大部分浏览器都支持伪元素的双冒号 (::) 表示方法。

然而，除了少部分伪元素，如::backdrop 必须使用双冒号，大部分伪元素都支持单冒号和双冒号的写法，比如::after，写成:after 也可以正确运行。

对于伪元素是使用单冒号还是双冒号的问题，w3c 标准中的描述如下：

Please note that the new CSS3 way of writing pseudo-elements is to use a double colon, eg a::after { ... }, to set them apart from pseudo-classes. You may see this sometimes in CSS. CSS3 however also still allows for single colon pseudo-elements, for the sake of backwards compatibility, and we would advise that you stick with this syntax for the time being.

大概的意思就是：虽然 CSS3 标准要求伪元素使用双冒号的写法，但也依然支持单冒号的写法。为了向后兼容，我们建议你在目前还是使用单冒号的写法。





## 三、伪类

![伪类](/home/dlyw/D-lyw/Notes/img/Pseudo-element&Pseudo-classes/伪类.png)



## 四、伪元素

![伪元素](/home/dlyw/D-lyw/Notes/img/Pseudo-element&Pseudo-classes/伪元素.png)



## 相关链接

+ [http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)