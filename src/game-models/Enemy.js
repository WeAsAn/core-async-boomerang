// Враг.

class Enemy {
  constructor({ positionX, positionY }) {
    this.generateSkin();
    this.speed = 1;
    this.positionX = positionX;
    this.positionY = positionY;
    this.isAlive = true;
  }

  generateSkin() {
    const skins = ['👾', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    if (this.isAlive) this.positionX -= this.speed;
  }

  die() {
    this.isAlive = false;
    this.skin = '💀';
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
