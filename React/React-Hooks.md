# React Hooks



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

