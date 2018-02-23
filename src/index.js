const { ShardingManager } = require("discord.js");
const { token, devToken } = require("./util/Tokens.js");
const { maintenance } = require("./util/Config.js");
const tokenToUse = maintenance ? devToken : token;
const sm = new ShardingManager("./client/Echo.js", { tokenToUse });
sm.spawn();