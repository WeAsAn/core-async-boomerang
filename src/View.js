// Сделаем отдельный класс для отображения игры в консоли.
const Game = require('./Game');

class View {
  render(track = [], gold = 0) {
    const yourTeamName = 'Elbrus';

    // Тут всё рисуем.
    console.clear();
    console.log(track.map((el) => el.join(' ')).join('\n'));
    console.log('\n\n');
    console.log(`Ваше золото: ${gold}`);
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
