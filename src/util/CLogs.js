/* eslint-disable quote-props */
/* eslint-disable max-len */
const ce = require("embed-creator");
const { colors } = require("./Config.js");

module.exports = {
  "v2": ce(
    colors.blue, null, "Changelog for version: ",
    "v2 `Woah`",
    [
      { "name": "Welcome to a new beginning", "value": "Hello everybody, I'm GoomigJS! Founder and Developer of 'Echo'! I want just to say how proud I am of this bot and it's community It has shown so much growth in the past months that showed me how much you guys use this bot! With EchoV2 we now track all errors and will be going over them everday! This should help keep back on errors that users like you get! I just wanted to say 'Thank you' and 'Welcome to EchoV2'" },
      { "name": "New Framework", "value": "The bot has been upgraded with a whole new framework system! Thanks to @FireController1847#3577!" },
      { "name": "New Design", "value": "Upgrade to the design of messages!" },
      { "name": "More Commands", "value": "Along with the v1.x commands there is a bunch of new commands on v2!" }
    ]
  )
};