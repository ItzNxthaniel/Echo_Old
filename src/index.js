const { ShardingManager } = require("discord.js");
const { token } = require("./util/Tokens.js");
const sm = new ShardingManager("./client/Echo.js", { token });
sm.spawn();