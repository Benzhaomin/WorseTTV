/**
  Twitch No Cancerino, a browser extension to filter cancer out of Twitch's chat.
  Copyright (C) 2015-2017 Benjamin Maisonnas

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

    it('should return true when the word looks like ThisThat', function() {
      assert.equal(true, emotes.quacks("DankMemes"));
      assert.equal(true, emotes.quacks("NotLikeThis"));
      assert.equal(true, emotes.quacks("ForsenW"));
    });

    it('should return true when the word looks like thisThat', function() {
      assert.equal(true, emotes.quacks("trumpW"));
      assert.equal(true, emotes.quacks("mollyThump"));
      assert.equal(true, emotes.quacks("ForsenW"));
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
