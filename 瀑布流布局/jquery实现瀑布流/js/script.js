/* 
 * @Author: Huge
 * @Date:   2015-09-08 21:07:58
 * @Last Modified by:   Huge
 * @Last Modified time: 2015-09-08 22:01:20
 */

'use strict';

$(window).on("load", function() {
    waterfall();
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
    $(window).on("scroll", function() {
        if (checkScrollSlide) {
            $.each(imgData.data, function(index, value) {
                // 动态添加元素
                var oBox = $("<div>").addClass("box").appendTo($("#main"));
                var oPic = $("<div>").addClass("pic").appendTo(oBox);
                $("<img>").attr("src", "images/" + $(value).attr("src")).appendTo(oPic);
            });
            waterfall();
        }
    });
});

// 最后一个盒子距离顶部高度与当前滚动条比较
function checkScrollSlide() {
    var $lastBox = $("#main>div").last();
    var lastTop = $lastBox.offset().top + Math.floor($lastBox.height() / 2);
    var scrollHeight = $(window).scrollTop() + $(window).height();
    return lastTop < scrollHeight ? true : false;
}

function waterfall() {
    var $main = $("#main");
    var $boxes = $("#main>div");
    // 每个盒子的宽度（包括padding）
    var boxWidth = $boxes.eq(0).outerWidth();
    var winWidth = $(window).width();
    // 列数
    var cols = Math.floor(winWidth / boxWidth);
    // 设置最外层盒子的宽度和居中
    $main.width(cols * boxWidth).css("margin", "0 auto");
    var hArr = [];
    $boxes.each(function(index, value) {
        var boxHeight = $boxes.eq(index).outerHeight();
        if (index < cols) {
            hArr[index] = boxHeight;
        } else {
            // 当前数组最小高度
            var minHeight = Math.min.apply(null, hArr);
            // 最小高度对应的索引
            var minIndex = $.inArray(minHeight, hArr);

            // 设置当前盒子的样式
            $(value).css({
                "position": "absolute",
                "top": minHeight + "px",
                "left": minIndex * boxWidth + "px"
            });

            // 更新数组
            hArr[minIndex] += boxHeight;
        }
    });
}