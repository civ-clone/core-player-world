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
var _PlayerTile_additionalData, _PlayerTile_additionalDataRegistry, _PlayerTile_player, _PlayerTile_tile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTile = void 0;
const AdditionalDataRegistry_1 = require("@civ-clone/core-data-object/AdditionalDataRegistry");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const Tile_1 = require("@civ-clone/core-world/Tile");
class PlayerTile extends DataObject_1.DataObject {
    constructor(tile, player, additionalDataRegistry = AdditionalDataRegistry_1.instance) {
        super();
        _PlayerTile_additionalData.set(this, {});
        _PlayerTile_additionalDataRegistry.set(this, void 0);
        _PlayerTile_player.set(this, void 0);
        _PlayerTile_tile.set(this, void 0);
        __classPrivateFieldSet(this, _PlayerTile_additionalDataRegistry, additionalDataRegistry, "f");
        __classPrivateFieldSet(this, _PlayerTile_player, player, "f");
        __classPrivateFieldSet(this, _PlayerTile_tile, tile, "f");
        this.addKey('isCoast', 'isLand', 'isWater', 'terrain', 'x', 'y', 'yields');
        this.setAdditionalData();
    }
    addKey(...keys) {
        super.addKey(...keys);
    }
    isCoast() {
        return __classPrivateFieldGet(this, _PlayerTile_tile, "f").isCoast();
    }
    isLand() {
        return __classPrivateFieldGet(this, _PlayerTile_tile, "f").isLand();
    }
    isWater() {
        return __classPrivateFieldGet(this, _PlayerTile_tile, "f").isWater();
    }
    player() {
        return __classPrivateFieldGet(this, _PlayerTile_player, "f");
    }
    setAdditionalData() {
        __classPrivateFieldGet(this, _PlayerTile_additionalDataRegistry, "f")
            .getByType(Tile_1.default)
            .forEach((additionalData) => {
            __classPrivateFieldGet(this, _PlayerTile_additionalData, "f")[additionalData.key()] = additionalData.data(__classPrivateFieldGet(this, _PlayerTile_tile, "f"));
            Object.defineProperty(this, additionalData.key(), {
                configurable: true,
                value: () => additionalData.data(__classPrivateFieldGet(this, _PlayerTile_tile, "f")),
            });
            this.addKey(additionalData.key());
        });
    }
    terrain() {
        return __classPrivateFieldGet(this, _PlayerTile_tile, "f").terrain();
    }
    tile() {
        return __classPrivateFieldGet(this, _PlayerTile_tile, "f");
    }
    update() {
        __classPrivateFieldGet(this, _PlayerTile_tile, "f").clearYieldCache(__classPrivateFieldGet(this, _PlayerTile_player, "f"));
        this.setAdditionalData();
    }
    x() {
        return __classPrivateFieldGet(this, _PlayerTile_tile, "f").x();
    }
    y() {
        return __classPrivateFieldGet(this, _PlayerTile_tile, "f").y();
    }
    yields() {
        return __classPrivateFieldGet(this, _PlayerTile_tile, "f").yields(__classPrivateFieldGet(this, _PlayerTile_player, "f"));
    }
}
exports.PlayerTile = PlayerTile;
_PlayerTile_additionalData = new WeakMap(), _PlayerTile_additionalDataRegistry = new WeakMap(), _PlayerTile_player = new WeakMap(), _PlayerTile_tile = new WeakMap();
exports.default = PlayerTile;
//# sourceMappingURL=PlayerTile.js.map