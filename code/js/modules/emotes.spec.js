var assert = require("assert");
var emotes = require("./emotes");

describe('emotes modules', function() {

  // emotes.count()
  describe('count()', function() {

    it('should return 0 when no emote is found in the message', function() {
      assert.equal(0, emotes.count("short"));
    });

    it('should return 0 when no valid emote is found in the message', function() {
      assert.equal(0, emotes.count("Kap"));
    });

    it('should return 1 when one emote is found in the message', function() {
      assert.equal(1, emotes.count("Kappa"));
    });

    it('should return 2 when two emotes are found in the message', function() {
      assert.equal(2, emotes.count("Kappa text Kappa text"));
    });

  });

  // emotes.any_in() (same as count but with early exit and boolean return value)
  describe('any_in()', function() {

    it('should return false when no emote is found in the message', function() {
      assert.equal(false, emotes.any_in("short"));
    });

    it('should return false when no valid emote is found in the message', function() {
      assert.equal(false, emotes.any_in("Kap"));
    });

    it('should return true when one emote is found in the message', function() {
      assert.equal(true, emotes.any_in("Kappa"));
    });

    it('should return true when two emotes are found in the message', function() {
      assert.equal(true, emotes.any_in("Kappa text Kappa text"));
    });

  });

  // emotes.strip()
  describe('strip()', function() {

    describe('default filter', function() {

      it('should return the message itself when no emote are found', function() {
        assert.equal("short", emotes.strip("short"));
        assert.equal("A L L C A P S A L L D A Y", emotes.strip("A L L C A P S A L L D A Y"));
      });

      it('should return an empty string when the message is just one emote', function() {
        assert.equal("", emotes.strip("Kappa"));
      });

      it('should return the message with emotes stripped when the message contains a mix of text and emotes', function() {
        assert.equal("text text", emotes.strip("Kappa text Kappa text"));
      });

    });

    describe('fuzzy filter', function() {

      it('should return an empty string when the message is just one emote', function() {
        assert.equal("", emotes.strip("Kappa", true));
      });

      it('should return an empty string when the message is just one emote-looking word', function() {
        assert.equal("", emotes.strip("NotLikeThis", true));
      });

      it('should return the message with emotes stripped when the message contains a mix of text and emote-looking words', function() {
        assert.equal("text text", emotes.strip("NotLikeThis text DankMemes text", true));
      });

      it('should return the message itself when no emotes or emote looking words are found', function() {
        assert.equal("K", emotes.strip("K", true));
        assert.equal("Ok Ok Car", emotes.strip("Ok Ok Car", true));
      });

    });

  });

  // emotes.quacks()
  describe('quacks()', function() {

    it('should return true when the word is an emote', function() {
      assert.equal(true, emotes.quacks("KappaPride"));
      assert.equal(true, emotes.quacks("ResidentSleeper"));
    });

    it('should return true when the word has several alternating caps looking like an emote', function() {
      assert.equal(true, emotes.quacks("DankMemes"));
      assert.equal(true, emotes.quacks("NotLikeThis"));
      assert.equal(true, emotes.quacks("ForsenW"));
    });

    it('should return false when the word is an emote but does not look like one', function() {
      assert.equal(false, emotes.quacks("trumpW"));
    });

    it('should return false when the word is not an emote at all', function() {
      assert.equal(false, emotes.quacks("car"));
      assert.equal(false, emotes.quacks("K"));
      assert.equal(false, emotes.quacks("Ok"));
      assert.equal(false, emotes.quacks("KK"));
      assert.equal(false, emotes.quacks("Wall-Mart"));
    });

  });

});
