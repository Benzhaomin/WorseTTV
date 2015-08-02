
var diagnosis = require('./modules/diagnosis');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    //console.log('[chrome-background] ' + request.message);

    if (request.message === "worsettv.message.diagnose") {
      //console.log('[chrome-background] diagnosis request for text ' + request.msg.text + ' on node ' + request.msg.id);

      var sane = diagnosis.is_sane(request.msg.text);

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        var activeTab = tabs[0];

        if (sane) {
          //console.log('[chrome-background] sane message here');

          chrome.tabs.sendMessage(activeTab.id, {
            "message": "worsettv.message.sane",
            "msg": request.msg
          });
        }
        else {
          //console.log('[chrome-background] ill message here');

          chrome.tabs.sendMessage(activeTab.id, {
            "message": "worsettv.message.ill",
            "msg": request.msg
          });
        }
      });
    }
  }
);
