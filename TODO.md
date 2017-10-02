# High
  - [ff][chrome] use the promise-based WebExt API + mozilla/webextension-polyfill for Chrome
  - [ff][chrome] make sure we work well with BetterTTV

# Normal
  - [chat] support Twitch Go

# Low
  - [test] use Sinon to mock deep calls
  - [chrome] turn the background into an event page: use the storage API for tab state, filter events to avoid being woken up (https://developer.chrome.com/extensions/event_pages)

# Bugs
 - fix message with emotes parsing, emotes are enclosed in div/span balloon-wrapper these days
 - don't hide emotes in the emotes popup selector
