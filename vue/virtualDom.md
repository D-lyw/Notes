# 虚拟DOM

基本过程介绍:

1. 用JS对象模拟DOM(虚拟DOM)
2. 把此虚拟DOM转为真实DOM并插入页面中(render)
3. 如果有事件发生修改了虚拟DOM, 比较两颗虚拟DOM树差异, 得到差异对象(diff)
4. 把差异对象应用到真正的DOM树上(patch)




[博客文章地址](https://juejin.im/post/5c8e5e4951882545c109ae9c?utm_source=gold_browser_extension#heading-0)


相关问题:

+ [虚拟DOM操作 与 实际DOM操作 谁快睡慢?](https://www.zhihu.com/question/31809713/answer/53544875)

