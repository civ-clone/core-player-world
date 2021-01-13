import Tile from '@civ-clone/core-world/Tile';
import World from '@civ-clone/core-world/World';
import Unknown from './Terrains/Unknown';

export class UndiscoveredTile extends Tile {
  constructor(x: number, y: number, map: World) {
    super(x, y, new Unknown(), map);
  }
}

export default UndiscoveredTile;
