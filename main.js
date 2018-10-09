const Discord = require('discord.js');
const ClientBot = new Discord.Client();

ClientBot.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === '<Avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
});

ClientBot.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('<Kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Cette expulsion restera dans les fichiers .logs du serveurs').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`${user.tag} à été expulsé du serveur !`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('Je ne peux malheureusement pas expulsé personne car elle est hiérarchiquement plus haute que vous.');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('Ce membre n\'est pas ici.');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('Vous devez mentionnez un joueur !');
    }
  }
});

ClientBot.login('NDk5MTUxMDg2MjcyMzgwOTI4.Dp4HzA.gbTs2witc_UUL9fRHVp1h9Ci8kw');
