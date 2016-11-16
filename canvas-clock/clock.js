window.onload = function(){
    // 获取cancvas相关设置
    var dom = document.getElementById("clock"),
        ctx = dom.getContext("2d"),
        width = ctx.canvas.width,
        height = ctx.canvas.height,
        r = width / 2;
    

    
    
    setInterval(dynamicDraw, 1000);
    
    function dynamicDraw(){
        ctx.clearRect(0, 0, width, height);
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        
        // 调用画clock
        drawCircle();    
        // drawHours(4, 30);
        // drawMinutes(30, 30);
        // drawSeconds(45);
        drawDot();
        
        drawHours(hours, minutes);
        drawMinutes(minutes, seconds);
        drawSeconds(seconds);
        
        ctx.restore();
    }
    
    
    /**
     * [drawCircle 画圆]
     * @return {[type]} [description]
     */
    function drawCircle(){
        ctx.save();
        // 重新映射画布上的 (0,0) 位置
        ctx.translate(r, r);
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.arc(0, 0, r-5, 0, 2*Math.PI, false);
        // ctx.strokeStyle = "#f00";
        ctx.stroke();
        
        // 画时钟数字
        var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        // 设置字大小和字体，以及对齐方式
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // 根据坐标 画数字
        hourNumbers.forEach(function(number, index){
            var radius = 2 * Math.PI / 12 * index;
            var x = Math.cos(radius) * (r - 40);
            var y = Math.sin(radius) * (r - 40);
            ctx.fillText(number, x, y);
        });
        
        // 画时钟上的提示点
        for (var i=0; i<60; i++){
            var radius = 2 * Math.PI / 60 * i;
            var x = Math.cos(radius) * (r - 20);
            var y = Math.sin(radius) * (r - 20);
            ctx.beginPath();
            // 整点 颜色 为黑色 否则 为灰色
            if (i % 5 === 0){
                ctx.fillStyle = "#000";
            } else {
                ctx.fillStyle = "#aaa";
            }
            ctx.arc(x, y, 2, 0, 2*Math.PI, false);
            ctx.fill();
        }        
    }
    
    function drawHours(hour, minute){
        // TODO
        ctx.save();
        var hourRadius = 2 * Math.PI / 12 * hour;
        var minuteRadius = 2 * Math.PI / 12 / 60 * minute;
        var radius = hourRadius + minuteRadius;
        ctx.rotate(radius);
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -r+60);
        ctx.stroke();
        ctx.restore();
    }
    
    function drawMinutes(minute, second){
        // TODO
        ctx.save();
        var minuteRadius = 2 * Math.PI / 60 * minute;
        var secondRadius = 2 * Math.PI / 60 / 60 * second;
        var radius = minuteRadius + secondRadius;
        ctx.rotate(radius);
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -r+60);
        ctx.stroke();
        ctx.restore();
    }
    
    function drawSeconds(second){
        // TODO
        ctx.save();
        var radius = 2 * Math.PI / 60 * second;
        ctx.rotate(radius);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = "#f00";
        ctx.moveTo(-2, 20);
        ctx.lineTo(2, 20);
        ctx.lineTo(1, -r+60);
        ctx.lineTo(-1, -r+60);
        ctx.fill();
        ctx.restore();
    }
    
    function drawDot(){
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(0, 0, 2, 0, 2*Math.PI, false);
        ctx.fill();
    }
}


    
