var stringPrint;//插入网页的内容
var temp;
function topHost(){
    var host = new Array();
    stringPrint = "";
    var sdic;
    var localStorageLeghth = localStorage.length;

    var j = 0;
    for(var i = localStorageLeghth - 1; i>=0;i--){

        if(localStorage.key(i) != "lastHost"&&localStorage.key(i) != ""){
            if(j<10){
                temp = JSON.parse(localStorage.getItem(localStorage.key(i)));
                host[localStorage.key(i)] = temp[0];
                j++;
            }
            else{
                sdic=Object.keys(host).sort(function(a,b){return host[b]-host[a]});
                temp = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if(host[sdic[9]] < temp[0]){
                    delete host[sdic[9]];
                    host[localStorage.key(i)] =  temp[0];
                }
            }
        }
        
        
    }
    sdic=Object.keys(host).sort(function(a,b){return host[b]-host[a]});
    
    
    
	var height = 0;
	var heightAdd5 = 3;
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
            stringTime = "";
        }
        
		frequencyWidth = temp[0]/biggestFrequencyWidth*225;
        timeWidth = temp[1]/biggestTimeWidth*225;
		stringPrint = stringPrint +"<div style = \"background:#dae9a4;width:"+frequencyWidth+"px;position:absolute;top:"+height+"px;height:12px\"></div>";
        stringPrint = stringPrint +"<div style = \"position:absolute;opacity:0.6;right:5px;top:"+height+"px;height:12px\">&nbsp;&nbsp;" + temp[0]+"</div>";
        height = height+12;
        stringPrint = stringPrint +"<div style = \"background:#a1e6e4;width:"+timeWidth+"px;position:absolute;top:"+height+"px;height:12px\"></div>";
        stringPrint = stringPrint +"<div style = \"position:absolute;opacity:0.3;right:5px;top:"+height+"px;height:12px\">&nbsp;&nbsp;" +stringTime +"</div>";
        height = height+13;
        stringPrint = stringPrint +"<div style = \"position:absolute;top:"+heightAdd5+"px;height:25px\">&nbsp;&nbsp;" + sdic[ki]+"</div>";
		heightAdd5 = heightAdd5+25;
        
    }
};



function isHidden(){
    topHost();
	if(stringPrint == ""){
		document.getElementById("top").innerHTML = "<br><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂无数据";
	}
	else{
		document.getElementById("top").innerHTML = stringPrint;
	}
    var vDiv = document.getElementById('top');
    var dot_line_hidden = document.getElementById('dot_line_hidden1');
    if(vDiv.style.display == 'none'){
        document.getElementById("top_button").src = 'image/min.png';
        vDiv.style.display = 'block';
        dot_line_hidden.style.display = 'block';
    }
    else{
        document.getElementById("top_button").src = 'image/plus.png';
        vDiv.style.display = 'none';
        dot_line_hidden.style.display = 'none';
    }

};
document.getElementById('display').onclick = isHidden;

function isDeletHidden(){
    var vDiv = document.getElementById('hidden_button');
    var dot_line_hidden = document.getElementById('dot_line_hidden2');
    if(vDiv.style.display == 'none'){
        vDiv.style.display = 'block';
        dot_line_hidden.style.display = 'block';
    }
    else{
        vDiv.style.display = 'none';
        dot_line_hidden.style.display = 'none';
    }

};

function localStorageClear(){
	localStorage.clear();
	document.getElementById("delete_prompt").innerHTML = "删除成功";
	
}

document.getElementById('delete_button').onclick = isDeletHidden;
document.getElementById('no_delete').onclick = isDeletHidden;
document.getElementById('yes_delete').onclick = localStorageClear;
