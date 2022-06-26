const Enemy = require('./Enemy');

class Enemies {
  constructor({ trackLength, trackHeight }) {
    this.trackHeight = trackHeight;
    this.trackLength = trackLength;
    this.enemies = [];
  }
  static skins = ['👾', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
  
}

module.exports = Enemies;
