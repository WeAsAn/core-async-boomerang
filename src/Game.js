// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const keypress = require('keypress');
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

// Управление.
// Настроим соответствия нажатий на клавиши и действий в игре.

// const keyboard = {
//   a: () => this.hero.moveLeft(),
//   d: () => this.hero.moveRight(),
//   z: () => console.log('e'),
// };

// Какая-то функция.
// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 1 }); // Герою можно аргументом передать бумеранг.
    this.boomerang = new Boomerang();
    this.enemy = new Enemy(this.trackLength);
    this.view = new View();
    this.track = [];
    this.gold = 0;
    this.regenerateTrack();
    this.keyboard = {
      a: () => this.hero.moveLeft(),
      d: () => this.hero.moveRight(),
      z: () => {
        if (this.gold >= 200) {
          this.gold -= 200;
          this.hero.bubble = true;
          this.hero.skin = '😎';
          setTimeout(() => {
            this.hero.bubble = false;
            this.hero.skin = '🤠';
          }, 5000);
        }
      },
      space: () => {
        this.boomerang.moveRight();
        this.boomerang.position = this.hero.position + 1;
        this.boomerang.range = 0;
      },
    };
  }

  runInteractiveConsole() {
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        // Вызывает команду, соответствующую нажатой кнопке.
        if (key.name in this.keyboard) {
          this.check();
          this.keyboard[key.name]();
        }
        // Прерывание программы.
        if (key.ctrl && key.name === 'c') {
          process.exit();
        }
      }
    });
    process.stdin.setRawMode(true);
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;
  }

  check() {
    if (
      (this.hero.position === this.enemy.position &&
        this.enemy.isAlive === true &&
        this.hero.bubble === false) ||
      (this.hero.position === this.enemy.position + 1 &&
        this.enemy.isAlive === true &&
        this.hero.bubble === false) ||
      (this.hero.position === this.enemy.position - 1 &&
        this.enemy.isAlive === true &&
        this.hero.bubble === false)
    ) {
      this.hero.die();
    }
    if (
      (this.enemy.position === this.boomerang.position && this.boomerang.thrown === true) ||
      (this.enemy.position === this.boomerang.position + 1 && this.boomerang.thrown === true) ||
      (this.enemy.position === this.boomerang.position - 1 && this.boomerang.thrown === true)
    ) {
      this.gold += Math.floor(Math.random() * 20);
      this.enemy.die();
    }
    if (this.boomerang.range < this.boomerang.maxRange && this.boomerang.thrown === true) {
      this.boomerang.skin = '🌀';
      this.boomerang.moveRight();
    } else if (
      this.boomerang.range >= this.boomerang.maxRange &&
      this.boomerang.range <= this.boomerang.maxRange * 2 - 1
    ) {
      this.boomerang.moveLeft();
    } else {
      this.boomerang.thrown = false;
    }
    if (this.boomerang.thrown === false) {
      this.boomerang.skin = ' ';
      this.boomerang.position = 0;
    }
    if (!this.enemy.isAlive || this.enemy.position === 0) {
      this.enemy = new Enemy(this.trackLength);
    }
  }

  play() {
    this.runInteractiveConsole();
    setInterval(() => {
      // Let's play!
      this.check();
      this.enemy.moveLeft();
      this.regenerateTrack();
      this.view.render(this.track, this.gold);
    }, 200);
  }
}

const game = new Game({ trackLength: 32 });
game.play();

module.exports = Game;
