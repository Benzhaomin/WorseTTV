
var contextMenu;
var started = false;

var onContextMenuClicked = function(info, tab) {

  started = !started;

  if (started === true) {
    console.log("[chrome-ui] started curing");
    chrome.tabs.sendMessage(tab.id, {"message": "worsettv.chat.observer.start"});

    // curing is now On
    chrome.contextMenus.update(contextMenu, {"title": "Restore Cancer"});
  }
  else {
    console.log("[chrome-ui] stopped curing");
    chrome.tabs.sendMessage(tab.id, {"message": "worsettv.chat.observer.stop"});

    // curing is now Off
    chrome.contextMenus.update(contextMenu, {"title": "Cure Cancer"});
  }


};

contextMenu = chrome.contextMenus.create({
  "title": "Cure Cancer",
  "contexts":["page"],
  "onclick": onContextMenuClicked
});
