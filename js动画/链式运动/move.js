function startMove(obj, attr, target, fn)
{
	if (obj.timer)
	{
		clearInterval(obj.timer);
		obj.timer = null;
	}
	obj.timer = setInterval(function()
	{
		var cur;
		// 对于透明度特殊考虑
		if (attr == 'opacity')
		{
			cur = Math.round(parseFloat(getStyle(obj, attr))*100);
		}
		else
		{
			cur = parseInt(getStyle(obj, attr));
		}
		var speed = (target-cur) / 20;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if (cur == target)
		{
			clearInterval(obj.timer);
			obj.timer = null;
			// 执行后续函数
			if (fn)
			{
				fn();
			}
		}
		else
		{
			if (attr == 'opacity')
			{
				obj.style['filter'] = "alpha(opacity:" + cur + speed + ")";
				obj.style[attr] = (cur+speed) / 100;
			}
			else
			{
				obj.style[attr] = cur + speed + 'px';
			}
		}
	}, 100);					
}
// 获取属性
function getStyle(obj, attr)
{
	if (obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}