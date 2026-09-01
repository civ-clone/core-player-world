"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTile = void 0;
const AdditionalDataRegistry_1 = require("@civ-clone/core-data-object/AdditionalDataRegistry");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const Tile_1 = require("@civ-clone/core-world/Tile");
class PlayerTile extends DataObject_1.DataObject {
    constructor(tile, player, additionalDataRegistry = AdditionalDataRegistry_1.instance) {
        super();
        this._additionalData = {};
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
    setAdditionalData() {
        this._additionalDataRegistry
            .getByType(Tile_1.default)
            .forEach((additionalData) => {
            this._additionalData[additionalData.key()] = additionalData.data(this._tile);
            Object.defineProperty(this, additionalData.key(), {
                configurable: true,
                value: () => additionalData.data(this._tile),
            });
            this.addKey(additionalData.key());
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
exports.default = PlayerTile;
//# sourceMappingURL=PlayerTile.js.map