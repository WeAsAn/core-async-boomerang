const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

class View {
  render(track = [], gold = 0, score, time) {
    const yourTeamName = 'Elbrus - Tigers 2022 SPb';

    // Тут всё рисуем.
    console.clear();
    console.log(track.map((el) => el.join(' ')).join('\n'));
    console.log('\n\n');
    console.log(`Ваше золото: ${gold}`);
    console.log(`Created by "${yourTeamName}" with love`);
    console.log(`Вы уже убили ${score} врагов.`);
    console.log(`Вы играете уже ${time} секунд.`);
  }

  gameStart() {
    console.clear();
    console.log(
      '\x1B[32m',
      '\x1B[1m',
      '------------ Привет! Я хочу сыграть с тобой в одну игру! -------------\n--------------------- Как тебя зовут? -------------------------------',
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

  tutorial() {
    return new Promise((resolve) => {
      console.clear();
      console.log('управление на клавиатуре');
      console.log('1. Вправо - клавиша "d", влево - клавиша "a"');
      console.log('2. Вверх - клавиша "w", вниз - клавиша "s"');
      console.log('3. Метнуть бумеранг "пробел"');
      console.log('4. За 200 золота Вы можете купить неуязвимость на 5 секунд (клавиша "z")');
      rl.question('Нажмите Enter для начала игры \n', (userChoise) => {
        resolve(userChoise);
      });
    });
  }
}

module.exports = View;
