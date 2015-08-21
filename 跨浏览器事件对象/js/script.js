/* 
 * @Author: Huge
 * @Date:   2015-08-17 23:42:27
 * @Last Modified by:   Huge
 * @Last Modified time: 2015-08-17 23:56:22
 */

'use strict';

window.onload = function() {
    var box = document.getElementById("box"),
        go = document.getElementById("go");

    eventUtil.addHandler(box, 'click', boxMessage);
    eventUtil.addHandler(go, 'click', goMessage);

    function boxMessage() {
        alert("这是父类box!");
    }

    function goMessage(event) {
        event = event || window.event;
        eventUtil.stopPropagation(event);
        eventUtil.preventDefault(event);
    }
};