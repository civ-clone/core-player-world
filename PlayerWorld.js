"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _player, _ruleRegistry, _world;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerWorld = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const VisibilityChanged_1 = require("./Rules/Player/VisibilityChanged");
const World_1 = require("@civ-clone/core-world/World");
const Generator_1 = require("@civ-clone/core-world-generator/Generator");
const UndiscoveredTile_1 = require("./UndiscoveredTile");
class PlayerWorld extends World_1.World {
    constructor(player, world, ruleRegistry = RuleRegistry_1.instance) {
        super(new Generator_1.default(world.height(), world.width()));
        _player.set(this, void 0);
        _ruleRegistry.set(this, void 0);
        _world.set(this, void 0);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _world, world);
        __classPrivateFieldSet(this, _ruleRegistry, ruleRegistry);
    }
    get(x, y) {
        const [tile] = this.entries().filter((tile) => tile.x() === x && tile.y() === y);
        if (tile) {
            return tile;
        }
        return new UndiscoveredTile_1.default(x, y, this);
    }
    player() {
        return __classPrivateFieldGet(this, _player);
    }
    register(...tiles) {
        tiles.forEach((tile) => {
            if (!this.includes(tile)) {
                super.register(tile);
                __classPrivateFieldGet(this, _ruleRegistry).process(VisibilityChanged_1.VisibilityChanged, tile, this.player());
            }
        });
    }
}
exports.PlayerWorld = PlayerWorld;
_player = new WeakMap(), _ruleRegistry = new WeakMap(), _world = new WeakMap();
exports.default = PlayerWorld;
//# sourceMappingURL=PlayerWorld.js.map