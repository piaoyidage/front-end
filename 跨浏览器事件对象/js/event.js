/* 
 * @Author: Huge
 * @Date:   2015-08-17 23:31:41
 * @Last Modified by:   Huge
 * @Last Modified time: 2015-08-17 23:41:44
 */

'use strict';

var eventUtil = {
    // 添加事件句柄
    addHandler: function(element, type, handler) {
        // DOM 2级事件
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        // IE 事件处理
        else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }
        // DOM 0级事件处理
        else {
            element['on' + type] = handler;
        }
    },
    // 删除事件句柄
    removeHandler: function(element, type, handler) {
        // DOM 2级事件
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        // IE 事件处理
        else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        }
        // DOM 0级事件处理
        else {
            element['on' + type] = null;
        }
    },
    // 获取事件 window.event是IE
    getEvent: function(event) {
        return event ? event : window.event;
    },
    // 获取事件的类型
    getEventType: function(event) {
        return event.type;
    },
    // 事件的目标元素
    getEventTarget: function(event) {
        return event.target ? event.target : event.srcElement;
    },
    // 阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    // 阻止默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
};