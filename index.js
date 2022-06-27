const { QueryTypes } = require('sequelize');
const { sequelize } = require('./db/models');
const { User, game } = require('./db/models');

// проверка
// const run = async () => {
//   await sequelize.authenticate();
//   // .then((data) => console.log(data));
// };
// run();

// sequelize.authenticate()
//   .then(() => {
//     console.log('connected to DB');
//   });

// const createUsers = (usersNames) => {
//   User.create({ name: usersNames });
// };
class DataBase {
  // создает игрока

  async addUsers(usersNames) {
    const createUsers = await User.findOrCreate({ where: { name: usersNames } });
  }

  // добавляет счет игроку
  async addUserScore(usersNames, userScore) {
    const userFind = await User.findOne({
      where: { name: usersNames },
    });
    //   console.log(userFind.id, userFind.name);
    const newUserScore = await game.create({
      game_result: userScore,
      user_id: userFind.id,
    });
  }

  sleep(ms) {
    return new Promise((accept) => {
      setTimeout(() => {
        accept();
      }, ms);
    });
  }

  // добавляет сразу игрока и добавляет результат игры
  async addUsersAndScore(usersNames, userScore) {
    const createUsers = await User.create({ name: usersNames });
    await sleep(1000);
    const userFind = await User.findOne({
      where: { name: usersNames },
    });
    //   console.log(userFind.id, userFind.name);
    const newUserScore = await game.create({
      game_result: userScore,
      user_id: userFind.id,
    });
  }
  // addUsers('Test');
  // addUserScore('Test');
  // addUsersAndScore('SOPHY', 5000);

  // получаем список игроков (я пыталась написать через findAll попробую еще )
  async topListUsers() {
    const topUser = await sequelize.query(
      'SELECT name, game_result FROM games JOIN "Users" ON "Users".id = games.user_id ORDER BY game_result DESC LIMIT(3)',
      {
        type: QueryTypes.SELECT,
      },
    );
    //   const topThree = await game.findAll({
    //     // attributes: ['game_result'],
    //     // order: ['game_result', 'DESC'],
    //     // limit: 3,
    //   });

    // return topUser
    //   console.log(topUser);
    const rsult = topUser
      .map(
        (el) =>
          `\x1B[33m${Object.values(el)[0]}\x1B[0m - \x1B[31m${Object.values(el)[1]}\x1B[0m врагов`,
      )
      .join('\n');
    return rsult;
  }

  // topListUsers();

  // удаление из БД

  async drop() {
    // const usern = await User.findByPk(3);
    // await User.destroy
    const dest = await game.destroy({
      where: {
        id: 7,
      },
      force: true,
    });
  }
  // drop();
}

// const newCl = new DataBase();
// const paris = newCl.topListUsers();

module.exports = DataBase;
