const { Command /* , Trello, tAPI */} = require("../../Modules/Index.js");
/*
const t = new Trello(tAPI.key, tAPI.token);

const lIDS = {
  feedback: "5be3b1f30142773a3dfbb97b",
  suggest: "5baf0641e5b8bd3aea92767e",
  bug: "5baf0641e5b8bd3aea92767f"
};
*/

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "trello",
      aliases: ["submit", "t"],
      desc: "Submit Feedback/Suggestions/Bug Reports to the Trello page.",
      subcommands: true,
      cooldown: 10,
      usage: "<suggest|bug|feedback> <r:string>",
      usageDelim: ' '
    });

    this.customizeResponse('r', "<:blobshrug:494901740123193345> | It does not look like you supplied anything with that option. Please try again.");
  }

  suggest(m, r) {
    return console.log(m.author.id, r);
  }

  bug(m, r) {
    return console.log(m.author.id, r);
  }

  feedback(m, r) {
    return console.log(m.author.id, r);
  }

};
