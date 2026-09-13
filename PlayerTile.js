"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTile = void 0;
const AdditionalDataRegistry_1 = require("@civ-clone/core-data-object/AdditionalDataRegistry");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const Tile_1 = require("@civ-clone/core-world/Tile");
class PlayerTile extends DataObject_1.DataObject {
    constructor(tile, player, additionalDataRegistry = AdditionalDataRegistry_1.instance) {
        super();
        this._additionalDataRegistry = additionalDataRegistry;
        this._player = player;
        this._tile = tile;
        this.addKey('isCoast', 'isLand', 'isWater', 'terrain', 'x', 'y', 'yields');
        this.setAdditionalData();
    }
    addKey(...keys) {
        super.addKey(...keys);
    }
    isCoast() {
        return this._tile.isCoast();
    }
    isLand() {
        return this._tile.isLand();
    }
    isWater() {
        return this._tile.isWater();
    }
    player() {
        return this._player;
    }
    /**
     * Reinstall the additional-data accessors after generic hydration.
     *
     * `Game.inject` calls this if a class defines it, and `PlayerTile` is the
     * only class in the engine that does — because it is the only one that builds
     * per-instance structure in its constructor.
     *
     * The accessors are installed with `Object.defineProperty` and so are
     * non-enumerable: `stateKeys()` never sees them, the save never carries them,
     * and a hydrated `PlayerTile` would have `_keys` naming methods that do not
     * exist. `toPlainObject()` walks `keys()` and calls each one, so the first
     * thing to break would be the payload sent to the renderer.
     *
     * `false` because the keys come back with the save; re-adding them would
     * duplicate every one.
     */
    onHydrated() {
        this.setAdditionalData(false);
    }
    setAdditionalData(addKeys = true) {
        this._additionalDataRegistry
            .getByType(Tile_1.default)
            .forEach((additionalData) => {
            Object.defineProperty(this, additionalData.key(), {
                configurable: true,
                value: () => additionalData.data(this._tile),
            });
            if (addKeys) {
                this.addKey(additionalData.key());
            }
        });
    }
    terrain() {
        return this._tile.terrain();
    }
    tile() {
        return this._tile;
    }
    update() {
        this._tile.clearYieldCache(this._player);
        this.setAdditionalData();
    }
    x() {
        return this._tile.x();
    }
    y() {
        return this._tile.y();
    }
    yields() {
        return this._tile.yields(this._player);
    }
}
exports.PlayerTile = PlayerTile;
PlayerTile.transient = ['_additionalDataRegistry'];
exports.default = PlayerTile;
//# sourceMappingURL=PlayerTile.js.map