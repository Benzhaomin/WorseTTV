var main = require("../");

var emotes = require("../lib/emotes");

exports["test count"] = function(assert) {
  
  assert.equal(emotes.count("short"), 0, "no emote");
  assert.equal(emotes.count("Kap"), 0, "no real emote");
  assert.equal(emotes.count("Kappa"), 1, "one emote");
  assert.equal(emotes.count("Kappa text Kappa text"), 2, "two emotes");
};

exports["test strip"] = function(assert) {
  
  assert.equal(emotes.strip("short"), "short", "no emote");
  assert.equal(emotes.strip("A L L C A P S A L L D A Y"), "A L L C A P S A L L D A Y", "no emotes + spaces");
  assert.equal(emotes.strip("Kappa"), "", "one emote");
  assert.equal(emotes.strip("Kappa text Kappa text"), "text text","two emotes");
};

exports["test any_in"] = function(assert) {
  
  assert.equal(emotes.any_in("short"), false, "no emote");
  assert.equal(emotes.any_in("Kappa"), true, "one emote");
  assert.equal(emotes.any_in("Kappa text Kappa text"), true, "two emotes");
};


require("sdk/test").run(exports);
