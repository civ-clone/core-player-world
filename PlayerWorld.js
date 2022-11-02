"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PlayerWorld_player, _PlayerWorld_ruleRegistry, _PlayerWorld_tiles, _PlayerWorld_world;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerWorld = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const PlayerTile_1 = require("./PlayerTile");
const Tile_1 = require("@civ-clone/core-world/Tile");
const UndiscoveredTile_1 = require("./UndiscoveredTile");
const VisibilityChanged_1 = require("./Rules/Player/VisibilityChanged");
class PlayerWorld extends DataObject_1.DataObject {
    constructor(player, world, ruleRegistry = RuleRegistry_1.instance) {
        super();
        _PlayerWorld_player.set(this, void 0);
        _PlayerWorld_ruleRegistry.set(this, void 0);
        _PlayerWorld_tiles.set(this, []);
        _PlayerWorld_world.set(this, void 0);
        __classPrivateFieldSet(this, _PlayerWorld_player, player, "f");
        __classPrivateFieldSet(this, _PlayerWorld_world, world, "f");
        __classPrivateFieldSet(this, _PlayerWorld_ruleRegistry, ruleRegistry, "f");
        this.addKey('height', 'tiles', 'width');
    }
    entries() {
        return __classPrivateFieldGet(this, _PlayerWorld_tiles, "f");
    }
    filter(iterator) {
        return this.entries().filter(iterator);
    }
    forEach(iterator) {
        return __classPrivateFieldGet(this, _PlayerWorld_tiles, "f").forEach(iterator);
    }
    get(x, y) {
        const [tile] = this.entries().filter((tile) => tile.x() === x && tile.y() === y);
        if (tile) {
            return tile;
        }
        return new UndiscoveredTile_1.default(x, y, __classPrivateFieldGet(this, _PlayerWorld_world, "f"));
    }
    getByTile(tile) {
        const [found] = this.filter((playerTile) => playerTile.tile() === tile);
        return found !== null && found !== void 0 ? found : null;
    }
    height() {
        return __classPrivateFieldGet(this, _PlayerWorld_world, "f").height();
    }
    includes(tile) {
        if (tile instanceof Tile_1.default) {
            return !!this.getByTile(tile);
        }
        return __classPrivateFieldGet(this, _PlayerWorld_tiles, "f").includes(tile);
    }
    map(iterator) {
        return __classPrivateFieldGet(this, _PlayerWorld_tiles, "f").map(iterator);
    }
    player() {
        return __classPrivateFieldGet(this, _PlayerWorld_player, "f");
    }
    register(...tiles) {
        tiles.forEach((tile) => {
            if (!this.includes(tile)) {
                __classPrivateFieldGet(this, _PlayerWorld_tiles, "f").push(new PlayerTile_1.default(tile, __classPrivateFieldGet(this, _PlayerWorld_player, "f")));
                __classPrivateFieldGet(this, _PlayerWorld_ruleRegistry, "f").process(VisibilityChanged_1.default, tile, this.player());
            }
        });
    }
    tiles() {
        return this.entries();
    }
    width() {
        return __classPrivateFieldGet(this, _PlayerWorld_world, "f").width();
    }
}
exports.PlayerWorld = PlayerWorld;
_PlayerWorld_player = new WeakMap(), _PlayerWorld_ruleRegistry = new WeakMap(), _PlayerWorld_tiles = new WeakMap(), _PlayerWorld_world = new WeakMap();
exports.default = PlayerWorld;
//# sourceMappingURL=PlayerWorld.js.map