# 左侧固定, 右侧自适应

```html

<div id="out">
        <div id="left">左侧固定</div>
        <div id="right">右侧自适应</div>
    </div>



    <style >
        /* way 1 将 左侧容器设置float， 浮动与左侧， 右侧则自动放缩 */
        /* #out{
            width: 100%;
            height: 400px;
            margin-top: 50px;
            background-color: beige;
        }
        #left{
            float: left;
            background-color: blueviolet;
            width: 200px;
            height: 100%;
        }
        #right{
            background-color: antiquewhite;
            height: 100%;
            text-align: center;
        } */

         /* way 2
            左侧绝对定位， 脱离文档流；
            右侧则自动占容器宽度的100%；设计margin-left 为左侧容器宽度
          */
         /* #out{
            width: 100%;
            height: 400px;
            margin-top: 50px;
            background-color: beige;
            position: relative;
        }
        #left{
            position: absolute;
            left: 0;
            background-color: blueviolet;
            width: 200px;
            height: 100%;
        }
        #right{
            background-color: antiquewhite;
            height: 100%;
            margin-left: 200px;
            text-align: center;
        } */

        /* way 3 
            将右侧容器设置为 position： absolute；right设置为0；
            将左侧容器设置定宽；
            右侧绝对定位的容器具有自动伸缩功能， 即实现宽度自适应
        */
        #out{
            width: 100%;
            height: 400px;
            margin-top: 50px;
            background-color: beige;
            position: relative;
        }
        #left{
            background-color: blueviolet;
            width: 200px;
            height: 100%;
        }
        #right{
            background-color: antiquewhite;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            left: 200px;
            text-align: center;
        }
    </style>
```