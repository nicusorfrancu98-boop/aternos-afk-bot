const mineflayer = require('mineflayer');
const http = require('http');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'StoneXHeartSMP.aternos.me',
    port: 54226,
    username: 'BotStoneX'
  });

  bot.on('spawn', () => {
    console.log('Botul a intrat pe server și e activ.');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 5000);
  });

  bot.on('kicked', (reason) => {
    console.log('Am fost dat afară:', reason, ', reconectez...');
    reconnect(bot);
  });

  bot.on('end', () => {
    console.log('Conexiunea s-a încheiat, reconectez...');
    reconnect(bot);
  });

  bot.on('error', (err) => {
    console.log('Eroare:', err, ', încerc reconectare...');
    reconnect(bot);
  });

  function reconnect(oldBot) {
    setTimeout(() => {
      console.log('Reconectare...');
      createBot();
      try { oldBot.quit(); } catch {}
    }, 5000);
  }

  const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot AFK este online\n');
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server HTTP pornit pe portul ${PORT}`);
  });

  return bot;
}

createBot();