# Twitch No Cancerino

[Firefox](https://addons.mozilla.org/en-US/firefox/addon/twitch-no-cancerino/?src=github) and
[Chrome](https://chrome.google.com/webstore/detail/twitch-no-cancerino/keojkpedpfobepecfbdimdcaibpacdfi) extension
that adds a right-click menu option to toggle cancer on/off in Twitch's chat.

See it in action on [robots](https://gyazo.com/bd5a118c2ff7e207e01ef1a43a4b8d7b) and on [spam](https://gyazo.com/1baf918ad4eb32762189b09cea6b1e06).

To learn more about cancer on Twitch, check out [Twitch Cancer Monitor](http://cancer.wainei.net).

## Building

### Requirements

- install ```node.js``` and ```grunt```
- clone the repo
- ```npm install``` to get all dependencies

### Extensions

```grunt chrome``` to build the Chrome extension. You need a key to sign the .crx but you can also just test it unpacked in Chrome.

```grunt firefox``` to build the Firefox extension.

## Cancer detection

See [diagnosis.js](code/js/modules/diagnosis.js) and [symptoms.js](code/js/modules/symptoms.js), basically cancer is message with any of:

- 1 word only
- more than 50% caps
- more than 1 global emote
- more than 50% emotes (fuzzy detection of unknown emotes)
- inner copy-pasta (
- chat copy-pasta (including slight variations)

Turning those on/off and altering values could be easily done and exposed in the settings.

Cancer detection is off for subscribers, moderators, etc. We only cure plebs for now. This could become an option in the settings.

## Settings

There's no settings page/popup for now but the code is ready to support it.
