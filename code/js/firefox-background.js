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

// sdk
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var mod = require("sdk/page-mod");
var cm = require("sdk/context-menu");
var array = require('sdk/util/array');

// custom
var diagnosis = require("./modules/diagnosis");

// list of active page workers
var pageWorkers = [];

// enhance pages on Twitch.tv
mod.PageMod({
  include: "http://www.twitch.tv/*",
  contentScriptFile: [
    self.data.url("js/firefox-chat.js"),
  ],
  contentStyleFile: self.data.url("css/content.css"),
  attachTo: 'top',
  onAttach: function(worker) {

    // keep track of page workers so that the UI can talk to them
    array.add(pageWorkers, worker);
    worker.on('pageshow', function() { array.add(pageWorkers, this); });
    worker.on('pagehide', function() { array.remove(pageWorkers, this); });
    worker.on('detach', function() { array.remove(pageWorkers, this); });

    // listen to diagnosis requests
    worker.port.on('worsettv.message.diagnose', function(msg) {

      //console.log('[firefox-background] diagnosis request for', msg);

      if (!diagnosis.cancer(msg)) {
        worker.port.emit('worsettv.message.sane', msg);
      }
      else {
        worker.port.emit('worsettv.message.ill', msg);
      }
    });
  }
});

// custom context menu item on Twitch's chatbox
cm.Item({
  // cancer is On by default
  label: "Toggle Cancer",
  image: self.data.url("images/kappa-pride.png"),
  accesskey: 'W',

  contentScriptFile: self.data.url("js/firefox-ui.js"),

  // react to clicks on the menu
  onMessage: function(start) {
    for (var index = 0; index < pageWorkers.length; index += 1) {
      if (pageWorkers[index].tab === tabs.activeTab) {
        if (start === true) {
          pageWorkers[index].port.emit('worsettv.chat.observer.start');
        }
        else {
          pageWorkers[index].port.emit('worsettv.chat.observer.stop');
        }
      }
    }
  },
});

//tabs.open("http://www.twitch.tv/gamesdonequick");
