
var diagnosis = require('./modules/diagnosis');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    //console.log('[chrome-background] ' + request.message);

    if (request.message === "worsettv.chat.message.diagnose") {

      //console.log('[chrome-background] diagnosis request for text ' + request.text + ' on node ' + request.node);
      var sane = diagnosis.is_sane(request.text);

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        var activeTab = tabs[0];

        if (sane) {
          //console.log('[chrome-background] sane message here');

          chrome.tabs.sendMessage(activeTab.id, {
            "message": "worsettv.chat.message.sane",
            "node": request.node,
            "text": request.text
          });
        }
        else {
          //console.log('[chrome-background] ill message here');

          chrome.tabs.sendMessage(activeTab.id, {
            "message": "worsettv.chat.message.ill",
            "node": request.node,
            "text": request.text
          });
        }
      });
    }
  }
);
