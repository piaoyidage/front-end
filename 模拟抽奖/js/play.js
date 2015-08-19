/* 
 * @Author: Huge
 * @Date:   2015-08-19 13:18:29
 * @Last Modified by:   Huge
 * @Last Modified time: 2015-08-19 14:04:52
 */

'use strict';

var data = ["IPhone6 Plus", "IPad", "50元充值卡", "Effective C++", "电风扇", "惠普打印机", "苹果笔记本", "一套别墅"];
var timer = null;
var flag = 0;

window.onload = function() {
    var start = document.getElementById("btnStart");
    var stop = document.getElementById("btnStop");

    start.onclick = play;

    stop.onclick = pause;

    // 回车键按下
    document.onkeyup = function(event) {
        // 键码
        if (event.keyCode === 13) {
            if (flag) {
                pause();
                flag = 0;
            } else {
                play();
                flag = 1;
            }

        }
    }

    function play() {
        var title = document.getElementById("title");
        // 如果有定时器 则清除
        if (timer) {
            clearInterval(timer);
        }
        // 定时器
        timer = setInterval(function() {
            var random = Math.floor(Math.random() * data.length);
            // console.log(random);
            title.innerHTML = data[random];
        }, 50);
        // 改变背景样式
        start.style.background = "#999";
    }

    function pause() {
        if (timer) {
            clearInterval(timer);
            start.style.background = "#00f";
        }
    }
};