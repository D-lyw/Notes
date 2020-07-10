# React Hooks



相关链接：

+ [Preact源码分析：react hook 最佳实践](https://github.com/Godiswill/blog/issues/18)









接收一个形如 `(state, action) => newState` 的 reducer和初始`state`，并返回当前的`state`以及与其配套的 `dispatch` 方法

`useReducer`简化内部实现

```JavaScript
function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState) 
    
    function dispatch(action) {
        const nextState = reducer(state, action)
        setState(nextState)
    }
    return [state, dispatch]
}
```



## useReducer Hooks实现与使用

### useReducer的使用

```javascript
useReducer<(state: any, action: any)=> any>(reducer: (state: any, action: any) =>any, initStore: any): [any, React.DispatchWithoutAction]

const [state, dispatch] = useReducer(reducer, initialState)
const reducer = (state, action) => {
    switch(action.type) {
        case 'arg1': return {...state, arg1: action.value};
        case 'arg1': return {...state, arg1: action.value};
        case 'arg1': return {...state, arg1: action.value};
        ......
        default: return state;
    }
} 

dispatch({type: 'args', value: 123})
```

### useReducer的实现

```JavaScript
const useMyReducer = (reducer, initialState) => {
    const [state, setState] = useState(initialState) 
    const dispatch = (action) => {
        const newState = reducer(state, action)
        setState(newState)
    }
    return [state, dispatch]
}
```



### combineReducers

```javascript
// 合并多个reducer函数

```



### 异步dispatch操作

```javascript
// 上述操作实现的dispatch操作是同步的， 借鉴redux-thunk的方法，让dispatch可以接受函数参数

const [state, initDispatch] = useReducer(reducer, initialState)
const dispatch = action => {
    if (typeof action === 'function') {
        return action(initDispatch)
    }
    return initDispathc(action)
}

const increaseCount = async dispatch => {
    await sleep(1000)
    dispatch({type: "increase"})
}

return (
	<button onClick={() => dispatch(increaseCount)} /> 
		increase
    </button>
)
```



### 中间件Middleware



















## 自定义Hooks

