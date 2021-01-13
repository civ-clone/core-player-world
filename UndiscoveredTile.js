"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndiscoveredTile = void 0;
const Tile_1 = require("@civ-clone/core-world/Tile");
const Unknown_1 = require("./Terrains/Unknown");
class UndiscoveredTile extends Tile_1.default {
    constructor(x, y, map) {
        super(x, y, new Unknown_1.default(), map);
    }
}
exports.UndiscoveredTile = UndiscoveredTile;
exports.default = UndiscoveredTile;
//# sourceMappingURL=UndiscoveredTile.js.map