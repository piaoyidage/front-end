// 根据id获取元素
function $(id)
{
	return typeof id == "string" ? document.getElementById(id) : id;
}

// 页面加载 滑过切换 点击切换
// window.onload = function()
// {
// 	var titles = $("notice_title").getElementsByTagName("li");
// 	var divs = $("notice_content").getElementsByTagName("div");

// 	for (var i = 0; i < titles.length; i++) {
// 		// id备用
// 		titles[i].id = i;
// 		titles[i].onmouseover = function()
// 		{
// 			for (var j = 0; j < titles.length; j++) {
// 				titles[j].className = '';
// 				divs[j].className = 'hide';
// 			};
// 			this.className = 'select';
// 			divs[this.id].className = 'show';
// 		}
// 	};

// };

// 延迟切换
// window.onload = function ()
// {
// 	// 定时器
// 	var timer = null;

// 	var titles = document.getElementById("notice_title").getElementsByTagName("li");
// 	var divs = document.getElementById("notice_content").getElementsByTagName("div");

// 	for (var i = 0; i < titles.length; i++) {
// 		titles[i].index = i;
// 		titles[i].onmouseover = function()
// 		{
// 			var that = this;
// 			// 清除当前的定时器，当定时器时间超过0.5s时进行切换
// 			if (timer)
// 			{
// 				clearTimeout(timer);
// 				timer = null;
// 			}

// 			timer = setTimeout(function()
// 			{
// 				for (var j = 0; j < titles.length; j++) {
// 					titles[j].className = "";
// 					divs[j].className = "hide";
// 				};
// 				titles[that.index].className = "select";
// 				divs[that.index].className = "show";
// 			}, 500);
// 		}
// 	};
// }

// 定时切换
window.onload = function()
{
	var timer = null;
	var index = 0;

	var titles = $("notice_title").getElementsByTagName("li");
	var divs = $("notice_content").getElementsByTagName("div");

	function autoPlay()
	{
		index++;
		if (index == titles.length)
		{
			index = 0;
		}
		changeOption(index);
	}

	function changeOption(curIndex)
	{
		for (var j = 0; j < titles.length; j++) {
			titles[j].className = "";
			divs[j].className = "hide";
		}
		titles[curIndex].className = "select";
		divs[curIndex].className = "show";
	}

	// 1s切换到下一个
	timer = setInterval(autoPlay, 1000);

	for (var i = 0; i < titles.length; i++) {
		titles[i].id = i;
		// 手动点击
		titles[i].onclick = function()
		{
			// 如果存在定时器
			if (timer)
			{
				clearInterval(timer);
				timer = null;
			}
			changeOption(this.id);			
		}
		// 鼠标离开
		titles[i].onmouseout = function()
		{
			// 如果存在定时器
			if (timer)
			{
				clearInterval(timer);
				timer = null;
			}
			index = this.id;
			timer = setInterval(autoPlay, 1000);
		}	
	}
};