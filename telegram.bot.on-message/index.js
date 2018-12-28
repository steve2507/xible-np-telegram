'use strict';

module.exports = (NODE) => {
  const botsIn = NODE.getInputByName('bots');

  const triggerOut = NODE.getOutputByName('trigger');
  const messageOut = NODE.getOutputByName('message');
  messageOut.on('trigger', async (conn, state) => {
    const thisState = state.get(NODE);
    if (!thisState || !thisState.message) {
      return;
    }

    return thisState.message;
  });

  const chatOut = NODE.getOutputByName('chat');
  chatOut.on('trigger', async (conn, state) => {
    const thisState = state.get(NODE);
    if (!thisState || !thisState.chat) {
      return;
    }

    return thisState.chat;
  });

  NODE.on('init', async (state) => {
    const bots = await botsIn.getValues(state);

    bots.forEach((bot) => {
      bot.on('message', (message) => {
        const newState = state.split();
        newState.set(NODE, {
          message,
          chat: message.chat
        })
        triggerOut.trigger(newState);
      });
    });
  });
};
