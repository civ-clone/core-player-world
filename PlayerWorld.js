"use strict";
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
        this._tiles = [];
        this._player = player;
        this._world = world;
        this._ruleRegistry = ruleRegistry;
        this.addKey('height', 'tiles', 'width');
    }
    entries() {
        return this._tiles;
    }
    filter(iterator) {
        return this.entries().filter(iterator);
    }
    forEach(iterator) {
        return this._tiles.forEach(iterator);
    }
    get(x, y) {
        const [tile] = this.entries().filter((tile) => tile.x() === x && tile.y() === y);
        if (tile) {
            return tile;
        }
        return new UndiscoveredTile_1.default(x, y, this._world);
    }
    getByTile(tile) {
        const [found] = this.filter((playerTile) => playerTile.tile() === tile);
        return found !== null && found !== void 0 ? found : null;
    }
    height() {
        return this._world.height();
    }
    includes(tile) {
        if (tile instanceof Tile_1.default) {
            return !!this.getByTile(tile);
        }
        return this._tiles.includes(tile);
    }
    map(iterator) {
        return this._tiles.map(iterator);
    }
    player() {
        return this._player;
    }
    register(...tiles) {
        tiles.forEach((tile) => {
            if (!this.includes(tile)) {
                this._tiles.push(new PlayerTile_1.default(tile, this._player));
                this._ruleRegistry.process(VisibilityChanged_1.default, tile, this.player());
            }
        });
    }
    tiles() {
        return this.entries();
    }
    width() {
        return this._world.width();
    }
}
exports.PlayerWorld = PlayerWorld;
exports.default = PlayerWorld;
//# sourceMappingURL=PlayerWorld.js.map