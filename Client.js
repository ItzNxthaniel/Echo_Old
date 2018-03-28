const { AkairoClient } = require("discord-akairo");
const MongoDB = require("./MongoDB.js");
const path = require("path");
const { token } = require("./Data/Tokens.js");

const client = new AkairoClient({
  ownerID: "147891648628654082",
  prefix: "e:",
  allowMention: true,
  emitters: { process },
  commandDirectory: path.join(__dirname, "Commands"),
  listenerDirectory: path.join(__dirname, "Listeners"),
  // Custom Options
  colors: {
    orange: "#FFA500",
    green: "#92EE8F",
    red: "#FF9494"
  }
}, { disableEveryone: true });

client.mongo = new MongoDB(client);
client.login(token);