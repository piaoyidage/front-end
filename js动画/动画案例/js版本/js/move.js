function startMove(obj, json, fn) {
	var flag = true;
	if (obj.timer) {
		clearInterval(obj.timer);
		obj.timer = null;
	}
	obj.timer = setInterval(function() {
		for (var attr in json) {
			var cur;
			// 对于透明度特殊考虑
			if (attr == 'opacity') {
				cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				cur = parseInt(getStyle(obj, attr));
			}
			// 速度
			var speed = (json[attr] - cur) / 20;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if (cur != json[attr]) {
				flag = false;
			} else {
				flag = true;
			}

			if (attr == 'opacity') {
				obj.style['filter'] = "alpha(opacity:" + cur + speed + ")";
				obj.style[attr] = (cur + speed) / 100;
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
		}

		if (flag) {
			clearInterval(obj.timer);
			obj.timer = null;
			// 执行后续函数
			if (fn) {
				fn();
			}
		}

	}, 20);
}
// 获取属性
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}