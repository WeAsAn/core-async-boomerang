// Наш герой.

class Hero {
  constructor({ positionX }) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.positionX = positionX;
    this.positionY = 5;
    this.isAlive = true;
    this.bubble = false;
  }

  moveLeft() {
    // Идём влево.
    if (this.isAlive && this.positionX !== 0) {
      this.positionX -= 1;
    }
  }

  moveRight() {
    // Идём вправо.
    if (this.isAlive) this.positionX += 1;
  }

  die() {
    this.skin = '💀';
    this.isAlive = false;
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
