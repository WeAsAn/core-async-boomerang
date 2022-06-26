// Враг.

class Enemy {
  constructor(positionX) {
    this.generateSkin();
    this.positionX = positionX;
    this.positionY = 5;
    this.isAlive = true;
  }

  generateSkin() {
    const skins = ['👾', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    if (this.isAlive) this.positionX -= 1;
  }

  die() {
    this.isAlive = false;
    this.skin = '💀';
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
