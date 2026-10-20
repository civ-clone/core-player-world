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
        this._byPosition = new Map();
        this._byTile = new Map();
        this._tiles = [];
        this._player = player;
        this._world = world;
        this._ruleRegistry = ruleRegistry;
        this.addKey('height', 'tiles', 'width');
    }
    entries() {
        // A copy, matching `World.entries()` — which delegates to
        // `EntityRegistry.entries()` and so has always returned `_entries.slice()`.
        // Handing out the array itself let a caller reorder or empty a player's
        // discovered tiles through what reads as a getter.
        return this._tiles.slice();
    }
    filter(iterator) {
        return this.entries().filter(iterator);
    }
    forEach(iterator) {
        return this._tiles.forEach(iterator);
    }
    /**
     * By position, not by scanning every tile the player has seen.
     *
     * This and `getByTile` are called for every tile a unit can see, on every
     * move — and `register` asks `includes`, which asks `getByTile`, for every
     * visible tile as well. Each was a filter over the whole discovered world,
     * so a player who had explored more paid more to move.
     */
    get(x, y) {
        var _a;
        return ((_a = this._byPosition.get(this.position(x, y))) !== null && _a !== void 0 ? _a : new UndiscoveredTile_1.default(x, y, this._world));
    }
    position(x, y) {
        return y * this._world.width() + x;
    }
    getByTile(tile) {
        var _a;
        return (_a = this._byTile.get(tile)) !== null && _a !== void 0 ? _a : null;
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
    /**
     * The world this is the player's view of. Not a key, so it isn't sent with the view: it's for the engine, which has
     * no other way back to the world from a running or loaded game, to add a player to it (civ-clone/web-renderer#168).
     */
    world() {
        return this._world;
    }
    register(...tiles) {
        tiles.forEach((tile) => {
            if (!this.includes(tile)) {
                const playerTile = new PlayerTile_1.default(tile, this._player);
                this._tiles.push(playerTile);
                this.remember(playerTile);
                this._ruleRegistry.process(VisibilityChanged_1.default, tile, this.player());
            }
        });
    }
    remember(playerTile) {
        this._byTile.set(playerTile.tile(), playerTile);
        this._byPosition.set(this.position(playerTile.x(), playerTile.y()), playerTile);
    }
    /** The lookups are derived, so a load rebuilds them from the restored tiles. */
    onHydrated() {
        this._byPosition = new Map();
        this._byTile = new Map();
        this._tiles.forEach((playerTile) => this.remember(playerTile));
    }
    tiles() {
        return this.entries();
    }
    width() {
        return this._world.width();
    }
}
exports.PlayerWorld = PlayerWorld;
// The two lookups are transient: they are derived from `_tiles`, which is
// the saved state, and a `Map` cannot be written to a file anyway. Rebuilt
// in `onHydrated`.
PlayerWorld.transient = ['_byPosition', '_byTile', '_ruleRegistry'];
exports.default = PlayerWorld;
//# sourceMappingURL=PlayerWorld.js.map