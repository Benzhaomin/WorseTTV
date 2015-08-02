(function(chrome) {

  // keep track of the on/off toggle for each tab
  var states = {};

  var is_started = function(tab) {
    if (typeof states[tab] === 'undefined') {
      states[tab] = false;
    }
    return states[tab];
  };

  var toggle_state = function(tab) {
    if (typeof states[tab] === 'undefined') {
      states[tab] = false;
    }
    states[tab] = !states[tab];
  };

  var contextMenu;

  var onContextMenuClicked = function(info, tab) {

    if (!is_started(tab.id)) {
      //console.log("[chrome-ui] started curing");

      chrome.tabs.sendMessage(tab.id, {"message": "worsettv.chat.observer.start"});
    }
    else {
      //console.log("[chrome-ui] stopped curing");

      chrome.tabs.sendMessage(tab.id, {"message": "worsettv.chat.observer.stop"});
    }

    toggle_state(tab.id);

  };

  contextMenu = chrome.contextMenus.create({
    "title": "Toggle Cancer",
    "contexts":["page"],
    "onclick": onContextMenuClicked
  });

})(chrome);
