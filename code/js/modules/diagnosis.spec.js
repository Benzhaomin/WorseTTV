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
var diagnosis = require("./diagnosis");

describe('diagnosis module', function() {

  describe('is_sane()', function() {

    it('should return false when any symptom is exhibited by the message', function () {
      assert.equal(false, diagnosis.is_sane("short"));
    });

    it('should return true when no symptom is exhibited by the message', function () {
      assert.equal(true, diagnosis.is_sane("two words"));
    });

  });

  describe('full()', function() {

    it('should return an array with one element when a single symptom is exhibited by the message', function () {
      assert.equal(1, diagnosis.full("short").length);
    });

    it('should return an array with no element when no symptom is exhibited by the message', function () {
      assert.equal(0, diagnosis.full("two words").length);
    });

  });

  describe('is_immune()', function() {

    it('pleb should not be immune, the other badges are', function () {
      assert.equal(false, diagnosis.is_immune("pleb"));
      assert.equal(true, diagnosis.is_immune("subscriber"));
      assert.equal(true, diagnosis.is_immune("admin"));
      assert.equal(true, diagnosis.is_immune("broadcaster"));
      assert.equal(true, diagnosis.is_immune("moderator"));
    });

  });

  describe('cancer()', function() {

    // TODO: use sinon
    it('should call is_immune with the badge and is_sane with the message', function () {
      assert.equal(false, diagnosis.cancer({'badge': 'subscriber', 'text': 'this is some text'}));
      assert.equal(true, diagnosis.cancer({'badge': 'pleb', 'text': 'Kappa Kappa'}));
    });

    // TODO: use sinon
    it('should call is_immune and stop there because it is immune to cancer', function () {
      assert.equal(false, diagnosis.cancer({'badge': 'moderator', 'text': undefined }));
      assert.equal(false, diagnosis.cancer({'badge': 'moderator', 'text': 'Kappa' }));
      assert.equal(false, diagnosis.cancer({'badge': 'broadcaster', 'text': 'LOL' }));
    });

  });

});
