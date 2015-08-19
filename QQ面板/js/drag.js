/* 
 * @Author: Huge
 * @Date:   2015-08-19 09:01:44
 * @Last Modified by:   Huge
 * @Last Modified time: 2015-08-19 11:07:21
 */

'use strict';

// 封装根据class获取元素 getElementsByClassName在IE支持不太好
function getElementsByClassName(clsName, parentId) {
    var parent = parentId ? document.getElementById(parentId) : document;
    // 获取父元素下所有子元素
    var allElements = parent.getElementsByTagName("*");
    var elements = [];
    for (var i = 0; i < allElements.length; i++) {
        if (allElements[i].className === clsName) {
            elements.push(allElements[i]);
        }
    }
    return elements;
}

window.onload = drag;

function drag() {
    // 可拖拽区域
    var dragItem = document.getElementById("logoWebQQ");
    // 鼠标按下
    dragItem.onmousedown = panelMove;
    // 关闭
    var btnClose = document.getElementById("btnClose");
    var loginPanel = document.getElementById("loginPanel");
    btnClose.onclick = function() {
        loginPanel.style.display = "none";
    }

    var loginState = document.getElementById("loginState");
    var loginStateIcon = document.getElementById("loginStateIcon");
    var loginStateText = document.getElementById("loginStateText");
    var loginStatePanel = document.getElementById("loginStatePanel");
    var lists = loginStatePanel.getElementsByTagName("li");

    // 显示状态面板
    loginState.onclick = function(event) {
        var event = event || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
        loginStatePanel.style.display = "block";
    }

    // 每个状态项
    for (var i = 0, l = lists.length; i < l; i++) {
        lists[i].onmouseover = function() {
            this.style.background = "#567";
        };
        lists[i].onmouseout = function() {
            this.style.background = "#fff";
        };
        lists[i].onclick = function(event) {
            // 阻止事件冒泡
            var event = event || window.event;
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
            var id = this.id;
            var text = getElementsByClassName("stateSelectText", id)[0].innerHTML;
            loginStatePanel.style.display = "none";
            // 更改类名和文本内容
            loginStateIcon.className = "loginStateShow " + id;
            loginStateText.innerHTML = text;
        };
    }

    // 隐藏状态面板
    document.onclick = function() {
        loginStatePanel.style.display = "none";
    }
}

// 登录面板移动
function panelMove() {
    var loginPanel = document.getElementById("loginPanel");
    // 鼠标点距离面板左上角距离
    var disX = event.clientX - loginPanel.offsetLeft;
    var disY = event.clientY - loginPanel.offsetTop;
    // 窗口的高度和宽度
    var winH = document.documentElement.clientHeight || document.body.clientHeight;
    var winW = document.documentElement.clientWidth || document.body.clientWidth;
    // 面板可移动范围
    var maxX = winW - loginPanel.offsetWidth;
    var maxY = winH - loginPanel.offsetHeight;
    // 移动
    document.onmousemove = function(event) {
        var event = event || window.event;
        var l = event.clientX - disX;
        var t = event.clientY - disY;
        if (l < 0) {
            l = 0;
        } else if (l > maxX) {
            l = maxX - 10;
        }
        if (t < 0) {
            t = 10;
        } else if (t > maxY) {
            t = maxY;
        }
        loginPanel.style.left = l + "px";
        loginPanel.style.top = t + "px";
    };
    // 释放
    document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}