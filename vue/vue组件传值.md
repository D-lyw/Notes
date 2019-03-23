### 父组件向子组件传值

父组件在子组件中用v-bind绑定某一属性, 子组件在props数组中获取父组件传递的属性值(传递的值可读不可写)

```html
 <!-- 父组件给子组件传值 -->
    <div id="app">
        <child :passvalue="sendMsg"></child>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                sendMsg: 'hello child!'
            }, 
            methods: {

            },
            components: {
                child: {
                    template: "<div> child something {{passvalue}}</div>",
                    data(){
                        return {

                        }
                    },
                    props: ['passvalue']
                }
            }
        })
    </script>
```


### 子组件向父组件传值

子组件通过this.$emit函数触发父组件监听的属性, 让父组件对应的函数进行处理

```javascript
<!-- 子组件给父组件传值 -->
    <div id="app">
        <child @func="recvMsg"></child>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data:{

            },
            components: {
                child: {
                    template: "<div> I'm a child component! <button @click='send'>send msg to parent</button></div>",
                    methods: {
                        send(){
                            this.$emit('func', 123);
                        }
                    },
                }
            },
            methods: {
                recvMsg(data){
                    console.log(`receive msg --> ${data} from child`);
                }
            },
        })
    </script>

```

### 兄弟组件之间传值

