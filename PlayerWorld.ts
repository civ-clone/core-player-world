import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import { IRegistryIterator } from '@civ-clone/core-registry/Registry';
import Player from '@civ-clone/core-player/Player';
import PlayerTile from './PlayerTile';
import Tile from '@civ-clone/core-world/Tile';
import UndiscoveredTile from './UndiscoveredTile';
import VisibilityChanged from './Rules/Player/VisibilityChanged';
import World from '@civ-clone/core-world/World';

export interface IPlayerWorld extends IDataObject {
  filter(iterator: IRegistryIterator<PlayerTile>): PlayerTile[];
  forEach(iterator: (item: PlayerTile, i: number) => void): void;
  get(x: number, y: number): PlayerTile | UndiscoveredTile;
  getByTile(tile: Tile): PlayerTile | null;
  height(): number;
  map(iterator: (item: PlayerTile, i: number) => any): any[];
  player(): Player;
  register(...tiles: Tile[]): void;
  tiles(): PlayerTile[];
  width(): number;
}

export class PlayerWorld extends DataObject implements IPlayerWorld {
  #player: Player;
  #ruleRegistry: RuleRegistry;
  #tiles: PlayerTile[] = [];
  #world: World;

  constructor(
    player: Player,
    world: World,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super();

    this.#player = player;
    this.#world = world;
    this.#ruleRegistry = ruleRegistry;

    this.addKey('height', 'tiles', 'width');
  }

  entries(): PlayerTile[] {
    return this.#tiles;
  }

  filter(iterator: IRegistryIterator<PlayerTile>): PlayerTile[] {
    return this.entries().filter(iterator);
  }

  forEach(iterator: (item: PlayerTile, i: number) => void): void {
    return this.#tiles.forEach(iterator);
  }

  get(x: number, y: number): PlayerTile | UndiscoveredTile {
    const [tile] = this.entries().filter(
      (tile: PlayerTile): boolean => tile.x() === x && tile.y() === y
    );

    if (tile) {
      return tile;
    }

    return new UndiscoveredTile(x, y, this.#world);
  }

  getByTile(tile: Tile): PlayerTile | null {
    const [found] = this.filter(
      (playerTile: PlayerTile) => playerTile.tile() === tile
    );

    return found ?? null;
  }

  height(): number {
    return this.#world.height();
  }

  includes(tile: Tile | PlayerTile): boolean {
    if (tile instanceof Tile) {
      return !!this.getByTile(tile);
    }

    return this.#tiles.includes(tile);
  }

  map(iterator: (item: PlayerTile, i: number) => any): any[] {
    return this.#tiles.map(iterator);
  }

  player(): Player {
    return this.#player;
  }

  register(...tiles: Tile[]): void {
    tiles.forEach((tile: Tile) => {
      if (!this.includes(tile)) {
        this.#tiles.push(new PlayerTile(tile, this.#player));

        this.#ruleRegistry.process(VisibilityChanged, tile, this.player());
      }
    });
  }

  tiles(): PlayerTile[] {
    return this.entries();
  }

  width(): number {
    return this.#world.width();
  }
}

export default PlayerWorld;
