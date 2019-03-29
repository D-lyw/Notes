// webpack 打包入口 main.js

// console.log("main.js")
import $ from 'jquery'

import './css/index.css'

$(document).ready(function () {
    $('li:odd').css('color', 'orange');
    $('li:even').css('color', 'red');    
});