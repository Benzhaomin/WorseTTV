
var contextMenu;
var started = false;

var onContextMenuClicked = function(info, tab) {

  started = !started;

  if (started === true) {
    console.log("[chrome-ui] started curing");
    chrome.tabs.sendMessage(tab.id, {"message": "worsettv.chat.observer.start"});
  }
  else {
    console.log("[chrome-ui] stopped curing");
    chrome.tabs.sendMessage(tab.id, {"message": "worsettv.chat.observer.stop"});
  }


};

contextMenu = chrome.contextMenus.create({
  "title": "Toggle Cancer",
  "contexts":["page"],
  "onclick": onContextMenuClicked
});
