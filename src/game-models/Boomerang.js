// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = ' ';
    this.positionX = 0;
    this.positionY = 5;
    this.range = 0;
    this.maxRange = 7;
    this.thrown = false;
  }

  moveLeft() {
    // Идём влево.
    if (this.positionX >= 0) {
      this.thrown = true;
      this.positionX -= 1;
      this.range += 1;
    }
  }

  moveRight() {
    // Идём вправо.
    this.thrown = true;
    this.positionX += 1;
    this.range += 1;
  }
}

module.exports = Boomerang;
