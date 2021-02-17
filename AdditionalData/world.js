"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const PlayerWorldRegistry_1 = require("../PlayerWorldRegistry");
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const Player_1 = require("@civ-clone/core-player/Player");
const getAdditionalData = (playerWorldRegistry = PlayerWorldRegistry_1.instance) => [
    new AdditionalData_1.default(Player_1.default, 'world', (player) => playerWorldRegistry.getByPlayer(player)),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=world.js.map