const eris = require('eris');

// Create a Client instance with our bot token.
const bot = new eris.Client('owo');

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
   console.log('Connected and ready.');
});

// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
bot.on('messageCreate', async (msg) => {
   const botWasMentioned = msg.mentions.find(
       mentionedUser => mentionedUser.id === bot.user.id,
   );

   if (botWasMentioned) {
       try {
           await msg.channel.createMessage('nani?');
       } catch (err) {
           // There are various reasons why sending a message may fail.
           // The API might time out or choke and return a 5xx status,
           // or the bot may not have permission to send the
           // message (403 status).
           console.warn('Failed to respond to mention.');
           console.warn(err);
       }
   }
});

bot.on('error', err => {
   console.warn(err);
});

const PREFIX = 'mafu';

const commandHandlerForCommandName = {};
commandHandlerForCommandName['stuck'] = (msg, args) => {
  const mention = args[0];
  const amount = parseFloat(args[1]);

  // TODO: Handle invalid command arguments, such as:
  // 1. No mention or invalid mention.
  // 2. No amount or invalid amount.

  return msg.channel.createMessage(`${mention} paid $${amount.toFixed(2)}`);
};

bot.on('messageCreate', async (msg) => {
  const content = msg.content;

  // Ignore any messages sent as direct messages.
  // The bot will only accept commands issued in
  // a guild.
  if (!msg.channel.guild) {
    return;
  }

  // Ignore any message that doesn't start with the correct prefix.
  if (!content.startsWith(PREFIX)) {
      return;
  }

  // Extract the parts of the command and the command name
  const parts = content.split(' ').map(s => s.trim()).filter(s => s);
  const commandName = parts[0].substr(PREFIX.length);

  // Get the appropriate handler for the command, if there is one.
  const commandHandler = commandHandlerForCommandName[commandName];
  if (!commandHandler) {
      return;
  }

  // Separate the command arguments from the command prefix and command name.
  const args = parts.slice(1);

  try {
      // Execute the command.
      await commandHandler(msg, args);
  } catch (err) {
      console.warn('Error handling command');
      console.warn(err);
  }
});

bot.on('error', err => {
  console.warn(err);
});

bot.connect();