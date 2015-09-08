/* 
 * @Author: Huge
 * @Date:   2015-09-06 22:40:10
 * @Last Modified by:   Huge
 * @Last Modified time: 2015-09-08 11:41:56
 */

'use strict';

window.onload = function() {
    waterfall('main', 'box');
    // 模拟数据
    var imgData = {
        "data": [{
            "src": "16.jpg"
        }, {
            "src": "17.jpg"
        }, {
            "src": "18.jpg"
        }, {
            "src": "19.jpg"
        }, {
            "src": "20.jpg"
        }, {
            "src": "21.jpg"
        }, {
            "src": "22.jpg"
        }, {
            "src": "23.jpg"
        }, {
            "src": "24.jpg"
        }, {
            "src": "25.jpg"
        }, {
            "src": "26.jpg"
        }, {
            "src": "27.jpg"
        }, {
            "src": "28.jpg"
        }, {
            "src": "29.jpg"
        }, {
            "src": "30.jpg"
        }, {
            "src": "31.jpg"
        }, {
            "src": "32.jpg"
        }, {
            "src": "33.jpg"
        }, {
            "src": "34.jpg"
        }, {
            "src": "35.jpg"
        }, {
            "src": "36.jpg"
        }]
    };
    // 滚动加载
    window.onscroll = function() {
        // 检测是否加载
        if (checkScrollSlide) {
            for (var i = 0; i < imgData.data.length; i++) {
                // 动态添加元素
                var oParent = document.getElementById("main");
                var oBox = document.createElement("div");
                oBox.className = "box";
                oParent.appendChild(oBox);

                var oPic = document.createElement("div");
                oPic.className = "pic";
                oBox.appendChild(oPic);

                var oImg = document.createElement("img");
                oImg.src = "./images/" + imgData.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main', 'box');
        }
    }
}

function checkScrollSlide() {
    var oParent = document.getElementById("main");
    var oBoxes = getByClass(oParent, "box");
    // 窗口滚动距离
    var sTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 窗口高度
    var winHeight = document.body.clientHeight || document.documentElement.clientHeight;
    // 当前box距离（父容器）顶部高度
    var boxTop = oBoxes[oBoxes.length - 1].offsetTop + Math.floor(oBoxes[oBoxes.length - 1] / 2);
    return boxTop < (sTop + winHeight) ? true : false;
}

// 根据父类的id和子类的class获取子类
function waterfall(parentId, clsName) {
    var oParent = document.getElementById(parentId);
    var boxes = getByClass(oParent, clsName);
    console.log(boxes.length);

    var boxWidth = boxes[0].offsetWidth;
    console.log(boxWidth);
    // 列数
    var cols = Math.floor(document.documentElement.clientWidth / boxWidth);
    console.log(cols);
    // 设置css样式
    oParent.style.cssText = "width:" + boxWidth * cols + "px; margin:0 auto;";

    var hArr = [];
    for (var i = 0; i < boxes.length; i++) {
        if (i < cols) {
            hArr.push(boxes[i].offsetHeight);
        } else {
            // TODO
            // min apply
            var minHeight = Math.min.apply(null, hArr);
            var minIndex = findMinIndex(hArr, minHeight);
            // 定位
            boxes[i].style.position = "absolute";
            boxes[i].style.top = minHeight + "px";
            boxes[i].style.left = boxes[minIndex].offsetLeft + "px";
            // 更新
            hArr[minIndex] += boxes[i].offsetHeight;
        }
    }

}

// 根据父类对象和子类的class获取子类
function getByClass(parent, clsName) {
    var boxes = [];
    var elements = parent.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].className === clsName) {
            boxes.push(elements[i]);
        }
    }
    return boxes;
}

// 找到数组值的索引
function findMinIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] === val) {
            return i;
        }
    }
}