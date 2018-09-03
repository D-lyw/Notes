
### 区分　解构默认值　和　参数默认值

	function f6({ x = 10 } = {}, { y } = { y: 10 }) {
    	console.log( x, y );
    }
    
    f6();							// 10 10
    f6( undefined, undefined );	　// 10 10
    f6( {}, undefined ); 			// 10 10
    
    f6( {}, {} );					// 10 undefined
    f6( undefined, {} ); 			// 10 undefined
   
    f6( { x: 2 }, { y: 3 } ); 　　　　// 2 3
    
    
