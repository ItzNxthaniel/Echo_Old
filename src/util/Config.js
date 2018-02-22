/* eslint-disable max-len */
module.exports = {
  prefix: "e$",
  dPrefix: "e#",
  maintenance: true,
  buildVersion: {
    number: "v2",
    name: "`Woah`"
  },
  files: {
    commands: "./commands",
    events: "./events"
  },
  mdb: {
    blacklist: "blacklist",
    // donations: 'donations',
    guilds: "guilds",
    afk: "afk"
  },
  lang: {
    underMaintenance: "Oh no, my code's being updated, please check back later! (Sorry but Echo is under maintenance right now)",
    helpMsgs: [
      /* Goomig */
      "Help is flying through the sky, into your DMs!",
      "Help is sliding on ice, into your DMs!",
      /* Dwigoric */
      "Sending 911 under your doormat!",
      "Delivering the savory pizza in front of your door!",
      "Sending angels into your mailbox!",
      "Hooman, I have heeded your request for help.",
      "So help me God",
      "Helping you get out of your problems...",
      "Magic stones, ye say? Right here under the kilt.",
      "Helping you escape the shadow realm...",
      "Let me check that I have this right...",
      /* Goomig */
      "Whoops, Slip, SQUASH THAT REQUEST FOR HELP HERE I COME!",
      /* Dwigoric */
      "I am really sorry to hear that. Is there anything I can do to do for your request for help?",
      "That is a good question. Find it out yourself.",
      "I'm not sure, but don't ask me for help.",
      "I'm sorry, I don't have the information on that. May I put you on hold for a few minutes? I will clarify this with our manager.",
      "I'm sorry, this question would be out of my expertise, but Daniel from the tech support department will be able to help you. Would you like me to connect you with him?",
      "May I put your call on hold while I am checking your order?",
      "I'm sorry, Echo is not available right now. May I help you with something?",
      "I'm sorry, we don't have this feature at the moment. We do intend to add it to our service and we can notify you when it has been done. Would you like to receive an email update?",
      /* Wistful */
      "YA NEED HELP?",
      /* Fiery_Hacker */
      "Bringing in the reinforcements..."
    ],
    fixed: {
      false: "False",
      true: "True",
      online: "Online",
      dnd: "Do Not Disturb",
      idle: "Idle",
      offline: "Offline"
    }
  },
  colors: {
    orange: "#F4862C",
    red: "#F2524A",
    green: "#92EE8F"
  },
  owners: ["147891648628654082"]
};