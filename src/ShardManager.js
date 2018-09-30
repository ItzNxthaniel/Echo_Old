/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { ShardingManager, token } = require('./Modules/Packages.js');
const sm = new ShardingManager('./Client.js', { token });
sm.spawn();