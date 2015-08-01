var assert = require("assert");
var symptoms = require("./symptoms");

var symptom;

describe('symptoms modules', function() {

  // MinimumWordCount.exhibited_by()
  describe('MinimumWordCount().exhibited_by()', function() {

    beforeEach(function() {
      symptom = symptoms.MinimumWordCount(2);
    });

    it('should be exhibited by a message with too few words', function() {
      assert.equal(true, symptom.exhibited_by("short"));
    });

    it('should not be exhibited by a message with enough words', function() {
      assert.equal(false, symptom.exhibited_by("two words"));
    });

  });

  // MaximumCapsRatio.exhibited_by()
  describe('MaximumCapsRatio().exhibited_by()', function() {

    beforeEach(function() {
      symptom = symptoms.MaximumCapsRatio(0.5);
    });

    it('should be exhibited by a message in all caps', function() {
      assert.equal(true, symptom.exhibited_by("ALL"));
      assert.equal(true, symptom.exhibited_by("ALL CAPS ALL DAY"));
    });

    it('should be exhibited by a message in all caps with spaces', function() {
      assert.equal(true, symptom.exhibited_by("A L L C A P S A L L D A Y"));
    });

    it('should be exhibited by a message in all caps and known/global emotes', function() {
      assert.equal(true, symptom.exhibited_by("CAPS ResidentSleeper"));
    });

    it('should be exhibited by a message in all caps and unknown/sub-only emotes', function() {
      //assert.equal(true, symptom.exhibited_by("ForsenW ForsenW ForsenW DAD ForsenW ForsenW"));
      //assert.equal(true, symptom.exhibited_by("NotLikeThis AWKWARD NotLikeThis"));
      //assert.equal(true, symptom.exhibited_by("1 HOUR LEFT? DansGamer"));
      assert.equal(true, symptom.exhibited_by("SÊX HER SHAMPOO NotLikeThis NotLikeThis NotLikeThis NotLikeThis"));
    });

    it('should not be exhibited by a message with proper casing', function() {
      assert.equal(false, symptom.exhibited_by("Proper casing"));
      assert.equal(false, symptom.exhibited_by("Ok"));
      assert.equal(false, symptom.exhibited_by("Yes"));
    });

  });

  // MaximumEmoteCount.exhibited_by()
  describe('MaximumEmoteCount().exhibited_by()', function() {

    beforeEach(function() {
      symptom = symptoms.MaximumEmoteCount(1);
    });

    it('should be exhibited by a message with zwei kappa', function() {
      assert.equal(true, symptom.exhibited_by("Kappa Kappa"));
    });

    it('should not be exhibited by a message with ein kappa', function() {
      assert.equal(false, symptom.exhibited_by("Kappa"));
    });

  });

  // MaximumEmoteRatio.exhibited_by()
  describe('MaximumEmoteRatio().exhibited_by()', function() {

    beforeEach(function() {
      symptom = symptoms.MaximumEmoteRatio(0.49);
    });

    it('should be exhibited by a message with one emote and one word', function() {
      assert.equal(true, symptom.exhibited_by("Kappa //"));
    });

    it('should not be exhibited by a message with two words one emote', function() {
      assert.equal(false, symptom.exhibited_by("Kappa with text"));
    });

  });

  // MaximumEmoteRatio.exhibited_by()
  describe('MaximumEmoteRatio().exhibited_by()', function() {

    beforeEach(function() {
      symptom = symptoms.MaximumEmoteRatio(0.49);
    });

    it('should be exhibited by a message with one emote and one word', function() {
      assert.equal(true, symptom.exhibited_by("Kappa //"));
    });

    it('should not be exhibited by a message with two words one emote', function() {
      assert.equal(false, symptom.exhibited_by("Kappa with text"));
    });

  });

  // MaximumEchoRatio.exhibited_by()
  describe('MaximumEchoRatio().exhibited_by()', function() {

    // high tolerance
    describe('high tolerance setting', function() {

      beforeEach(function() {
        symptom = symptoms.MaximumEchoRatio(0.8);
      });

      it('should be exhibited by a message with two copies', function() {
        assert.equal(true, symptom.exhibited_by("lol lol"));
      });

      it('should be exhibited by a message with four copies', function() {
        assert.equal(true, symptom.exhibited_by("lol lol lol lol"));
      });

      it('should be exhibited by a message with a ton of copies and another word', function() {
        assert.equal(true, symptom.exhibited_by("foo foo foo foo foo foo foo foo foo foo bar"));
      });

      it('should be exhibited by a message with two times two copies', function() {
        assert.equal(true, symptom.exhibited_by("foo foo bar bar"));
      });

      it('should not be exhibited by a message with some copying but not that much', function() {
        assert.equal(false, symptom.exhibited_by("he did he said he do"));
      });

    });

    // low tolerance
    describe('low tolerance setting', function() {

      beforeEach(function() {
        symptom = symptoms.MaximumEchoRatio(0.1);
      });

      it('should be exhibited by a message with two copies', function() {
        assert.equal(true, symptom.exhibited_by("lol lol"));
      });

      it('should be exhibited by a message with four copies', function() {
        assert.equal(true, symptom.exhibited_by("lol lol lol lol"));
      });

      it('should be exhibited by a message with a ton of copies and another word', function() {
        assert.equal(true, symptom.exhibited_by("foo foo foo foo foo foo foo foo foo foo bar"));
      });

      it('should be exhibited by a message with two times two copies', function() {
        assert.equal(true, symptom.exhibited_by("foo foo bar bar"));
      });

      it('should not be exhibited by a message with some copying but not that much', function() {
        assert.equal(true, symptom.exhibited_by("he did he said he do"));
      });

    });

  });

});
