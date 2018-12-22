const { Command } = require("../../Modules/Index.js");
const Trello = require('trello');
const { tAPI } = require("../../Private/Tokens.js");
const t = new Trello(tAPI.key, tAPI.token);

const lIDS = {
  feedback: "5be3b1f30142773a3dfbb97b",
  suggest: "5baf0641e5b8bd3aea92767e",
  bug: "5baf0641e5b8bd3aea92767f"
};

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "trello",
      aliases: ["submit", "t"],
      desc: "Submit Feedback/Suggestions/Bug Reports to the Trello page.",
      subcommands: true,
      cooldown: 10,
      usage: "<suggest|bug|feedback> <r:string> [...]",
      usageDelim: ' '
    });

    this.customizeResponse('r', "<:blobshrug:494901740123193345> | It looks like you didn't supply anything with that option. Please try again.");
  }

  suggest(m, [...r]) {
    r = r.join(this.usageDelim);
    const tTitle = `${m.author.tag} (${m.author.id}) :: ${m.guild.name} (${m.guild.id})`;

    t.addCard(tTitle, r, lIDS.suggest, error => {
      if (error) {
        return m.channel.send(m.sendLocale('COMMAND_INFO', error));
      } else {
        return m.channel.send(`<:blobthumbsup:398843278235009024> | Your suggestion, has been submitted!`);
      }
    });
  }

  bug(m, r) {
    r = r.join(this.usageDelim);
    const tTitle = `${m.author.tag} (${m.author.id}) :: ${m.guild.name} (${m.guild.id})`;

    t.addCard(tTitle, r, lIDS.bug, error => {
      if (error) {
        return m.channel.send(m.sendLocale('COMMAND_INFO', error));
      } else {
        return m.channel.send(`<:blobthumbsup:398843278235009024> | Your bug, has been submitted!`);
      }
    });
  }

  feedback(m, r) {
    r = r.join(this.usageDelim);
    const tTitle = `${m.author.tag} (${m.author.id}) :: ${m.guild.name} (${m.guild.id})`;

    t.addCard(tTitle, r, lIDS.feedback, error => {
      if (error) {
        return m.channel.send(m.sendLocale('COMMAND_INFO', error));
      } else {
        return m.channel.send(`<:blobthumbsup:398843278235009024> | Your feedback, has been submitted!`);
      }
    });
  }

};
