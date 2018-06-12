var frequencyAndTime=new Array(2);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

                                     var lastHost = localStorage.getItem("lastHost");
                                     //sendResponse({farewell: request.greeting});
                                     if(request.greeting == lastHost&&request.greeting != "none"){
                                            //localStorage.setItem("lastHost",request.greeting);
                                            sendResponse({farewell: lastHost});
                                     }
                                     else{
                                            if(request.greeting != "none"){
                                                localStorage.setItem("lastHost",request.greeting);
                                                if(localStorage.getItem(request.greeting) == null){
                                                frequencyAndTime[0] = 1;
                                                frequencyAndTime[1] = 0;
                            
                                                localStorage.setItem(request.greeting,JSON.stringify(frequencyAndTime));
                                     
                                                }
                                                else{
                                                var frequencyAndTime1 = JSON.parse(localStorage.getItem(request.greeting));
                                                frequencyAndTime1[0]++;
                                                localStorage.setItem(request.greeting,JSON.stringify(frequencyAndTime1));
                                                sendResponse({farewell: frequencyAndTime1[0]});
                                                }
                                            }
                                            else{
												if(localStorage.getItem(request.hostName) != null){
													var frequencyAndTime2 = JSON.parse(localStorage.getItem(request.hostName));
													frequencyAndTime2[1] = frequencyAndTime2[1] + request.time;
													localStorage.setItem(request.hostName,JSON.stringify(frequencyAndTime2));
													sendResponse({farewell: frequencyAndTime2[1]});
												}
												else{
													sendResponse({farewell: "getNULL"});
												}
                                            }
                                     }
                                     
                                   
                                     
                                     

      
  });
