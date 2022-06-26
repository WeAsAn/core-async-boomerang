const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
    
class View {
  render(track = [], gold = 0) {
    const yourTeamName = 'Elbrus - Tigers 2022 SPb';

    // Тут всё рисуем.
    console.clear();
    console.log(track.map((el) => el.join(' ')).join('\n'));
    console.log('\n\n');
    console.log(`Ваше золото: ${gold}`);
    console.log(`Created by "${yourTeamName}" with love`);
    console.log(`Вы уже убили ${score} врагов.`);
    console.log(`Набрано ${points} очков`);
  }

  gameStart() {
    console.clear();
    console.log(
      '\x1B[32m', '\x1B[1m', '------------ Привет! Я хочу сыграть с тобой в одну игру! -------------\n--------------------- Как тебя зовут? -------------------------------',
    );
  }

  registrate() {
    return new Promise((resolve) => {
      console.clear();
      rl.question('Введите Ваше имя: ', (userName) => {
        resolve(userName);
      });
    });
  }
}

tutorial() {
  return new Promise((resolve) => {
    console.clear();
    console.log('управление на клавиатуре');
    console.log('1. Вправо - клавиша "d", влево - клавиша "a"');
    console.log('2. Вверх - клавиша "w", вниз - клавиша "s"');
    console.log('3. Метнуть бумеранг "f"');
    rl.question(
      'Нажмите любую кнопку для начала игры',
      (userChoise) => {
        resolve(userChoise);
      },
    );
  });
}

printStatsOfUser(stats) {
  if (!stats.length) {
    console.log('Данные не найдены');
    return;
  }
  console.log(`Имя: ${stats[0].name}
Сыграно игр: ${stats.length}
Набрано очков: ${stats.reduce((acc, game) => acc + game['Games.points'], 0)}
Убито злых пацанов: ${stats.reduce((acc, game) => acc + game['Games.killed_enemies'], 0)}
Среднее количество очков: ${stats.reduce((acc, game) => acc + game['Games.points'], 0) / stats.length}
Среднее количество убитых врагов за игру: ${stats.reduce((acc, game) => acc + game['Games.killed_enemies'], 0) / stats.length}`);
}

module.exports = View;
