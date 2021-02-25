import Generator from '@civ-clone/core-world-generator/Generator';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import UndiscoveredTile from './UndiscoveredTile';
import { IWorld, World } from '@civ-clone/core-world/World';

export interface IPlayerWorld extends IWorld {
  get(x: number, y: number): Tile;
  player(): Player;
}

export class PlayerWorld extends World implements IPlayerWorld {
  #player: Player;
  #world: World;

  constructor(player: Player, world: World) {
    super(new Generator(world.height(), world.width()));

    this.#player = player;
    this.#world = world;
  }

  get(x: number, y: number): Tile {
    const [tile] = this.entries().filter(
      (tile: Tile): boolean => tile.x() === x && tile.y() === y
    );

    if (tile) {
      return tile;
    }

    return new UndiscoveredTile(x, y, this as World);
  }

  player(): Player {
    return this.#player;
  }
}

export default PlayerWorld;
