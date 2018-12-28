'use strict';

module.exports = (NODE) => {
  const Telegram = require('telegram-bot-api');
  let bot;

  const botOut = NODE.getOutputByName('bot');
  botOut.on('trigger', async (conn, state) => {
    if (!bot) {
      bot = new Telegram({
        token: NODE.data.token,
        updates: {
          enabled: true
        }
      });
    }
    return bot;
  });
};
