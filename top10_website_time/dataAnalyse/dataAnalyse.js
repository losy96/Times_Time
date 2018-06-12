
var stringPrint;//插入网页的内容
var temp;
var host = new Array();
stringPrint = "";
var sdic;

var localStorageLeghth = localStorage.length;

for(var i = localStorageLeghth - 1; i>=0;i--){
    
    if(localStorage.key(i) != "lastHost"&&localStorage.key(i) != ""){
            temp = JSON.parse(localStorage.getItem(localStorage.key(i)));
            host[localStorage.key(i)] = temp[0];
        
    }
    
}
sdic=Object.keys(host).sort(function(a,b){return host[b]-host[a]});

var height = 0;
var heightAdd5 = 4;
var biggestFrequencyWidth = parseInt(host[sdic[0]])+20;
var biggestTimeWidth = 0;
var frequencyWidth = 0;
var timeWidth = 0;
for(ki in sdic){
    temp = JSON.parse(localStorage.getItem(sdic[ki]));
    if(temp[1]>biggestTimeWidth){
        biggestTimeWidth = temp[1];
    }
}
var isGrey = 0;
biggestTimeWidth = biggestTimeWidth+600;
for(ki in sdic){
    temp = JSON.parse(localStorage.getItem(sdic[ki]));
    var temTime = temp[1];
    var stringTime = "";
    for(var i = 0;i<3;i++){
        if(i == 0){
            stringTime = "\'\'"+stringTime;
        }
        if(i == 1){
            stringTime = "\'"+stringTime;
        }
        if(i == 2){
            stringTime ="h"+stringTime;
        }
        stringTime = String(temTime%60)+stringTime;
        temTime = parseInt(temTime/60);
        if(temTime == 0){
            break;
        }
    }
    frequencyWidth = temp[0]/biggestFrequencyWidth*800;
    timeWidth = temp[1]/biggestTimeWidth*800;
	
    if(isGrey == 0){
        stringPrint = stringPrint+"<div style = \"width:100%;background:#c8c8c8;position:absolute;left:30px;top:"+(heightAdd5-4)+"px;height:25px\"></div>"
        isGrey = 1;
    }
    else{
        isGrey = 0;
    }
    stringPrint = stringPrint +"<div style = \"background:#dae9a4;width:"+frequencyWidth+"px;position:absolute;left:30px;top:"+height+"px;height:12px\"></div>";
    stringPrint = stringPrint +"<div style = \"position:absolute;opacity:0.6;right:5px;top:"+height+"px;height:12px\">&nbsp;&nbsp;" + temp[0]+"</div>";
    height = height+12;
    stringPrint = stringPrint +"<div style = \"background:#a1e6e4;width:"+timeWidth+"px;position:absolute;left:30px;top:"+height+"px;height:12px\"></div>";
    stringPrint = stringPrint +"<div style = \"position:absolute;opacity:0.3;right:5px;top:"+height+"px;height:12px\">&nbsp;&nbsp;" +stringTime +"</div>";
    height = height+12;
    stringPrint = stringPrint+"<div  style=\"width:100%;border-bottom:1px dashed #8b7979;position:absolute;left:30px;top:"+height+"px;\"></div>"
    height = height+1;
    stringPrint = stringPrint +"<div style = \"position:absolute;left:30px;top:"+heightAdd5+"px;height:25px\">&nbsp;&nbsp;" + sdic[ki]+"</div>";
	stringPrint = stringPrint + "<div style = \"position:absolute;top:"+heightAdd5+"px;height:25px\"><input type=\"checkbox\" name=\"deleteName\" value="+ki+"></div>";
    heightAdd5 = heightAdd5+25;
}






if(stringPrint == ""){
    window.document.getElementById("d").innerHTML = "暂无数据";
}
else{
    stringPrint = stringPrint + "<div id = \"deleteData\" style = \"position:absolute;top:"+heightAdd5+"px;height:25px\"><input type=\"button\"  value=\"删除\" /></div>"
    window.document.getElementById("d").innerHTML = stringPrint;
    //alert("localStorageLeghth");
}

 function deleteData() {
	 
            //获取所有name为chk的多选框,返回一个多选框数组
            var chks = document.form.deleteName;
 
            //把选中的多选框的值拼接成字符串
            var str = "";
 
            //循环多选框数组
			var chksLength = parseInt(chks.length);
			if (isNaN(chksLength)){
				str += sdic[0] + ",";
				localStorage.removeItem(sdic[0]);
			}
			
            for (var i = 0; i < chksLength; i++) {
                //如果多选框被选中，则把值累计到str中
				
                if (chks[i].checked == true) {
                    str += sdic[i] + ",";
					localStorage.removeItem(sdic[i]);
                }
            }
 
            //弹出多选框选中的结果
            alert("已删除："+str);
			location.reload();
			
			
}
document.getElementById('deleteData').onclick = deleteData;