var self = require("sdk/self");
var tabs = require("sdk/tabs");
var mod = require("sdk/page-mod");

var pageMod = mod.PageMod({
  include: "http://www.twitch.tv/*",
  contentScriptFile: [
    "./chat.js",
    "./diagnosis.js",
    "./emotes.js",
    "./main.js"]
})

tabs.open("http://www.twitch.tv/gamesdonequick")
