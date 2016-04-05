/**
  Twitch No Cancerino, a browser extension to filter cancer out of Twitch's chat.
  Copyright (C) 2015 Benjamin Maisonnas

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/gpl-3.0.en.html>.
*/

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
  // TODO: use chrome.webNavigation.*
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
      "documentUrlPatterns": ["https://www.twitch.tv/*"],
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
