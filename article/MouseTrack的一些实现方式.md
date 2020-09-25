# 记MouseTrack的一些实现尝试

### 需求背景

为了统计分析用户页面行为，我们经常需要收集鼠标在页面上的各类操作，如页面中按钮和链接的点击和统计较精准的访客页面停留时间。而本文主要记录在解决`分别记录鼠标在页面各个区域的停留时间总和`这一问题的技术方案的尝试。

简化问题描述：将浏览器的可视窗口平均分为2 × 2的4份， 如图。分别记录鼠标在各个区域的停留时间总和，当然，不能影响页面的正常功能的使用。

![页面区域示意](https://p4.ssl.qhimg.com/t015e3f3cc7a907352e.png)

一看问题，就知道问题的重点在`判断鼠标的所在区域`， 获取了鼠标的所在区域，统计一下时间，问题就解决了。

自然，有一定基础的人， 很快就会想到mousemove这种方式。



###　Solution 1

监听鼠标的mousemove事件， 获取鼠标的坐标(x, y),  根据它来判断鼠标当前处在哪个区域，然后累加当前区域的记录时间。

Finish？No！当然要给mousemove事件的触发频率进行优化呀, 假装很专业的样子：)

```javascript
const mouseTrack = () => {
  // ...
  fromEvent(document, 'mousemove')
    .pipe(debounceTime(sampleTime))
    .subscribe((e: MouseEvent) => {
    	// 计算鼠标位于哪个区域
    	const { clientX, clientY } = e
        let currentPart : number = 
          Math.floor(clientX / unitWidth) + 
          n * Math.floor(clientY / unitHeight)

    	// 当前时刻
    	const now = new Date().getTime()
    	try {
        	  record[lastPart].duration += now - tick
    	} catch(err) {}
        tick = now
        lastPart = currentPart
        console.log(record.map(v => v.duration))
     })
}
````

问题似乎就这样愉快的被解决了！

但是经过一番测试之后， 发现了一些不足的地方。

+ 页面加载后， 若鼠标一直不动， 则无法触发事件，进而无法判断所在区域(疑无解)
+ 当用户以较快的速度移动时，会有时导致统计的时间和所在区域对应错误

对于mousemove这类触发频繁的事件， 在其他如拖拽， window对象的resize， scroll的场景下，可以使用函数节流、防抖等操作优化执行频率，且无明显副作用。而在此需求下，如果时间间隔过大，统计的准确性明显下降，如果时间间隔太小甚至不对触发频率进行限制， 而增加的性能开销也不是我们想要的。

难道，就秉持中庸之道， 取个中间值？

后期咨询大佬， 大佬说，通过分析搜集海量的这种统计数据， 清洗极端数据， 一通分析之后，也可以得到较准确的结果。因为单纯的收集鼠标在某个区域的时间意义不大， 主要还是通过海量的数据搜集分析， 进而了解用户在页面上行为、喜好、热点区域。

道理是都懂，但是作为一个优秀的程序员， 总是想在自己的一亩三分地写出更好的代码，就不能提供比较准确的数据，又不会增加较大的性能开销？



### Solution 2

思路也是很普通， 当时我就想上种方式需要频繁的触发事件， 主要是为了获知鼠标当前所在区域， 那我就在统计区域上加个透明DIV, 当DIV的`mouseenter`事件触发时，开始计时， 触发`mouseleave`时， 结束计时。加上后，发现由于DIV的遮盖， 页面中的各类按钮，链接都无法触发。这肯定不行， 又查了一下事件穿透， 发现了[pointer-events](https://www.w3.org/TR/SVG/interact.html#PointerEventsProperty)属性.

`pointer-events`可以禁用鼠标事件， 允许事件穿透，常用的属性值(auto | none), 其他属性值只适用于svg元素

愉快的加上该属性， 发现透明DIV的mouseenter/mouseleave事件也被禁止，无法触发了......

稳住心态，思索了一下

![pointer-evnets](https://p3.ssl.qhimg.com/t012d3f90a084507415.png)

鼠标当前所在的透明的DIV区域处于事件穿透状态， 其他区域被DIV正常覆盖，当鼠标移入其他区域时， 移入区域变成事件穿透状态(页面的链接、按钮等功能正常)， 原来区域还原。

通过这种方式，可以较好的解决上面的问题

+ 不用mousemove这种频繁触发的事件，节省了额外的开销

+ 只要鼠标的移动速度在浏览器的捕获范围内， 它在不同区域之间的切换都能很好的触发事件， 大大提供了统计数据的准确性

不足：

+ pointer-events的兼容性， 兼容到 IE11

再吹毛求疵一点，就是鼠标在不同区域移动时， 需要操作DIV的pointer-events属性在auto和none之间切换， 且在非鼠标所在区域，通明DIV是遮挡页面鼠标的各种事件的。能不能不让它遮挡呢？



### Solution 3

其实，是看中了pointer-events的`stroke`属性值， 利用它， 可以使得在元素**内部**事件穿透， 在元素**边框**触发事件，想了想， 感觉很完美,  由于该属性只在SVG下生效，于是将透明DIV换成了SVG元素。

![pointer-events-border](https://p0.ssl.qhimg.com/t01d62897a2fba37bbe.png)

实际测试一番后发现，要以较慢的速度移动鼠标，才会触发svg边框的事件，稍快移动鼠标， 边框就无法捕捉事件。由于边框的宽度有限， 移动太快， 就超出了浏览器的捕捉极限。之后又试着增大了边框的宽度， 但效果变化不是很明显。

感觉有点奇怪， 于是新建一个测试页面，监听一个边框为1px的Div，在我的手速极限内， `mouseenter`事件正常触发。但是在svg里面为什么触发比较艰难呢？也向大佬请教过， 也还是没解决。

是浏览器的极限就是这样，还是我写的svg有问题？由于一直没有解决这个问题， 希望大家能不吝赐教。

```java
function drawsvg(
        width : number, 
        height : number,
        pointX : number,
        pointY : number,
        index: number) : void {
    var svgns = "http://www.w3.org/2000/svg"; 
    var svg = document.createElementNS(svgns, 'svg'); 
    svg.setAttribute("style", `width: ${width}px; height: ${height}px; position: fixed; top: ${pointY * height}px; left: ${pointX * width}px; pointer-events: none; `);
    svg.setAttribute("viewBox", `${pointX} ${pointY} ${width} ${height}`);
    svg.setAttribute("class", "svgForCover");

    var polygon = document.createElementNS(svgns, 'polygon');
    polygon.setAttribute('points', `${pointX},${pointY} ${width},${pointY} ${width},${height} ${width},${pointY} ${pointX},${pointY}`)
    polygon.setAttribute('style', `pointer-events: stroke; fill: none; stroke: black; stroke-width: 10px; `);
    svg.appendChild(polygon);
    document.body.appendChild(svg);
}
```



### 后记

本篇文章主要记录在解决**记录鼠标在页面各个区域的停留时间总和**这一需求时的实现方式的尝试和解决相应问题的进一步尝试。现阶段，选择的是方案二和方案一组合使用，在满足pointer-events属性的兼容性情况下，使用方案二， 退之， 则使用第一种方案。

*小白新手， 如文章有任何bug，恳请指正，万分感谢*！