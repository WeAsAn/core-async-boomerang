// Враг.

class Enemy {
  constructor(position) {
    this.generateSkin();
    this.position = position;
    this.isAlive = true;
  }

  generateSkin() {
    const skins = ['👾', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    if (this.isAlive) this.position -= 1;
  }

  die() {
    this.isAlive = false;
    this.skin = '💀';
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
