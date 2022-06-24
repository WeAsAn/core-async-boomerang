// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = ' ';
    this.position = 0;
    this.range = 0;
    this.maxRange = 7;
    this.thrown = false;
  }

  fly() {
    this.thrown = true;
    this.moveLeft();
  }

  moveLeft() {
    // Идём влево.
    if (this.position >= 0) {
      this.position -= 1;
      this.range += 1;
    }
  }

  moveRight() {
    // Идём вправо.
    this.thrown = true;
    this.position += 1;
    this.range += 1;
    this.thrown = true;
  }
}

module.exports = Boomerang;
