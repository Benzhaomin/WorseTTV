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

  // clear the state on url change/reload
  chrome.tabs.onUpdated.addListener(function(tab , info) {
    if (info.status === "loading") {
      delete states[tab];
    }
  });

  // context menu unique id
  var _context_menu_id = "worsettv.toggle_cancer";

  // register our context menu when the extension is installed or updated
  chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": _context_menu_id,
      "title": "Toggle Cancer",
      "contexts":["page"],
      "documentUrlPatterns": ["http://www.twitch.tv/*"],
    });
  });

  // react to clicks in the context menu
  chrome.contextMenus.onClicked.addListener(function(info, tab) {

    // ignore other menus
    if (info.menuItemId !== _context_menu_id) {
      return;
    }

    if (!is_started(tab.id)) {
      //console.log("[chrome-ui] start curing plz");
      chrome.tabs.sendMessage(tab.id, {"message": "worsettv.chat.observer.start"});
    }
    else {
      //console.log("[chrome-ui] stop curing plz");
      chrome.tabs.sendMessage(tab.id, {"message": "worsettv.chat.observer.stop"});
    }

    toggle_state(tab.id);
  });

})(chrome);
