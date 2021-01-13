"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.PlayerWorldRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const PlayerWorld_1 = require("./PlayerWorld");
class PlayerWorldRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(PlayerWorld_1.default);
    }
    getByPlayer(player) {
        const playerWorlds = this.getBy('player', player);
        if (playerWorlds.length !== 1) {
            throw new TypeError(`Wrong number of player worlds exist for player: ${String(player)}`);
        }
        return playerWorlds[0];
    }
}
exports.PlayerWorldRegistry = PlayerWorldRegistry;
exports.instance = new PlayerWorldRegistry();
exports.default = PlayerWorldRegistry;
//# sourceMappingURL=PlayerWorldRegistry.js.map