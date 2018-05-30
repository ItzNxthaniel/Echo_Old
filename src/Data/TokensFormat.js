/**
 * This file is used as an example on how to set up the tokens.
 * Create a file in this folder called "Tokens.js" and fill each field
 * with their respective values.
 */

/**
 * The main bot token
 * @type {string}
 */
exports.token = "";

/**
 * Google Options
 * @type {object}
 */
exports.gOpts = {
  maxResults: 1,
  key: ""
};

/**
 * MongoDB Login Information
 * @type {object}
 */
exports.mongo = {
  username: "",
  password: "",
  host: "",
  port: "",
  database: "",
  collections: {
    guilds: "guilds",
    donations: "donations",
    afk: "afk",
    blacklist: "blacklist",
    mutes: "mutes",
    partners: "partners"
  }
};