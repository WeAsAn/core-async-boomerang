// Основной файл.
// Запускает игру.
const Game = require('./src/Game');

// Инициализация игры с настройками.
const game = new Game({ trackLength: 32, trackHeight: 20 });

// Запуск игры.
game.play();
