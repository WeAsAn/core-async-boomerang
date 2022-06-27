// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().
const DataBase = require('../index');
const keypress = require('keypress');
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const player = require('play-sound')((opts = {}));

class Game {
  constructor({ trackLength, trackHeight }) {
    this.name = 'безымянный герой';
    this.trackLength = trackLength;
    this.trackHeight = trackHeight;
    this.db = new DataBase();
    this.hero = new Hero({ positionX: 1, positionY: Math.floor(this.trackHeight / 2) });
    this.boomerang = new Boomerang();
    this.enemy = new Enemy({
      positionX: this.trackLength,
      positionY: Math.floor(this.trackHeight / 2),
    });
    this.view = new View();
    this.track = [];
    this.gold = 0;
    this.score = 0;
    this.time = 0;

    this.regenerateTrack();
    this.keyboard = {
      a: () => this.hero.moveLeft(),
      d: () => this.hero.moveRight(),
      s: () => this.hero.moveDown(),
      w: () => this.hero.moveUp(),
      z: () => {
        if (this.gold >= 200) {
          this.gold -= 200;
          this.hero.bubble = true;
          this.hero.skin = '😎';
          player.play('src/sounds/bubble.wav');
          setTimeout(() => {
            this.hero.bubble = false;
            this.hero.skin = '🤠';
          }, 5000);
        }
      },
      space: () => {
        if (this.boomerang.thrown === false) {
          this.boomerang.moveRight();
          this.boomerang.positionX = this.hero.positionX + 1;
          this.boomerang.positionY = this.hero.positionY;
          this.boomerang.range = 0;
        }
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
    this.track = [];
    for (let i = 0; i < this.trackHeight; i += 1) {
      this.track.push(new Array(this.trackLength).fill(' '));
    }
    this.track[this.hero.positionY][this.hero.positionX] = this.hero.skin;
    this.track[this.enemy.positionY][this.enemy.positionX] = this.enemy.skin;
    this.track[this.boomerang.positionY][this.boomerang.positionX] = this.boomerang.skin;
  }

  async check() {
    if (
      // убийство героя
      (this.hero.positionX === this.enemy.positionX &&
        this.enemy.isAlive === true &&
        this.hero.bubble === false &&
        this.hero.positionY === this.enemy.positionY) ||
      (this.hero.positionX === this.enemy.positionX + 1 &&
        this.enemy.isAlive === true &&
        this.hero.bubble === false &&
        this.hero.positionY === this.enemy.positionY) ||
      (this.hero.positionX === this.enemy.positionX - 1 &&
        this.enemy.isAlive === true &&
        this.hero.bubble === false &&
        this.hero.positionY === this.enemy.positionY)
    ) {
      await this.db.addUserScore(this.name, this.score);
      await player.play('src/sounds/hero-death.wav');
      this.hero.die();
      music.kill();
    }
    if (
      // убийство врага
      (this.enemy.positionX === this.boomerang.positionX &&
        this.boomerang.thrown === true &&
        this.enemy.positionY === this.boomerang.positionY) ||
      (this.enemy.positionX === this.boomerang.positionX + 1 &&
        this.boomerang.thrown === true &&
        this.enemy.positionY === this.boomerang.positionY) ||
      (this.enemy.positionX === this.boomerang.positionX - 1 &&
        this.boomerang.thrown === true &&
        this.enemy.positionY === this.boomerang.positionY)
    ) {
      this.score += 1;
      this.gold += Math.floor(Math.random() * 20);
      this.enemy.die();
      player.play('src/sounds/death.wav');
    }
    // пускание бумеранга
    if (this.boomerang.range < this.boomerang.maxRange && this.boomerang.thrown === true) {
      this.boomerang.skin = '🌀';
      this.boomerang.moveRight();
    } else if (
      // возвращение бумеранга
      this.boomerang.range >= this.boomerang.maxRange &&
      this.boomerang.range <= this.boomerang.maxRange * 2 - 1
    ) {
      this.boomerang.moveLeft();
    } else {
      // убираение бумеранга
      this.boomerang.thrown = false;
    }
    // удаление скина бумеранга
    if (this.boomerang.thrown === false) {
      this.boomerang.skin = ' ';
      this.boomerang.positionX = 0;
    }

    // добавление нового врага после смерти предыдущего
    if (!this.enemy.isAlive || this.enemy.position === 0) {
      this.enemy = new Enemy({
        positionX: this.trackLength,
        positionY: Math.floor(this.trackHeight / 2),
      });
    }
    if (this.enemy.positionX < 0) {
      this.enemy.positionX = this.trackLength;
      this.enemy.speed += 1;
    }
  }

  async play() {
    let name = this.name;
    let time = 0;
    let registrationIsFinished = false;
    this.view.gameStart();
    do {
      name = await this.view.registrate();
      await this.db.addUsers(name);
      this.name = name;
      registrationIsFinished = true;
    } while (!registrationIsFinished);
    await this.view.tutorial();
    const music = player.play('src/sounds/wow.wav');
    this.runInteractiveConsole();
    setInterval(() => {
      this.time += 1;
    }, 1000);
    setInterval(() => {
      // Let's play!
      this.check();
      this.enemy.moveLeft();
      this.regenerateTrack();
      this.view.render(this.track, this.gold, this.score, this.time);
    }, 200);
  }
}

const game = new Game({ trackLength: 32, trackHeight: 20 });
game.play();

module.exports = Game;
