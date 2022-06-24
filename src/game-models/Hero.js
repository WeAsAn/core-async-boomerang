// Наш герой.

class Hero {
  constructor({ position }) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
    this.isAlive = true;
  }

  moveLeft() {
    // Идём влево.
    if (this.isAlive && this.position !== 0) {
      this.position -= 1;
    }
  }

  moveRight() {
    // Идём вправо.
    if (this.isAlive) this.position += 1;
  }

  attack() {
    // Атакуем.
    this.boomerang.fly();
  }

  die() {
    this.skin = '💀';
    this.isAlive = false;
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
