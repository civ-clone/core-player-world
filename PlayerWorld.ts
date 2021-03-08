import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  VisibilityChanged,
  IVisibilityChangedRegistry,
} from './Rules/Player/VisibilityChanged';
import { World, IWorld } from '@civ-clone/core-world/World';
import Generator from '@civ-clone/core-world-generator/Generator';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import UndiscoveredTile from './UndiscoveredTile';

export interface IPlayerWorld extends IWorld {
  get(x: number, y: number): Tile;
  player(): Player;
}

export class PlayerWorld extends World implements IPlayerWorld {
  #player: Player;
  #ruleRegistry: RuleRegistry;
  #world: World;

  constructor(
    player: Player,
    world: World,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(new Generator(world.height(), world.width()));

    this.#player = player;
    this.#world = world;
    this.#ruleRegistry = ruleRegistry;
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

  register(...tiles: Tile[]): void {
    tiles.forEach((tile: Tile) => {
      if (!this.includes(tile)) {
        super.register(tile);

        (this.#ruleRegistry as IVisibilityChangedRegistry).process(
          VisibilityChanged,
          tile,
          this.player()
        );
      }
    });
  }
}

export default PlayerWorld;
