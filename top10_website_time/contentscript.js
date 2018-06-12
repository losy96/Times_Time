var test = window.location.host;//获取主机名

var isHidden = 0;//用于判断是否隐藏
var hiddenProperty = 'hidden' in document ? 'hidden' :
'webkitHidden' in document ? 'webkitHidden' :
'mozHidden' in document ? 'mozHidden' :
null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function(){
    if (!document[hiddenProperty]) {
        isHidden = 0;//正常被查看
    }else{
        isHidden = 1;//被隐藏
    }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);


var second = 0;//记录被查看的秒数
window.setInterval(function () {
                   if(isHidden == 0){
                        second ++;
                   }
                   console.log(second);
                   }, 1000);


//打开页面向background发送当前打开网页的主机名
chrome.runtime.sendMessage({greeting: test}, function(response) {
                           console.log(response.farewell);
                           });



//关闭或刷新网页向background发送访问时间
window.onbeforeunload = function(){
    chrome.runtime.sendMessage({greeting:"none",hostName:test,time:second}, function(response) {
                               console.log(response.farewell);
                               });
//    console.log(second);
};
 
