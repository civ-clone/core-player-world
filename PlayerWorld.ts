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
  // The two lookups are transient: they are derived from `_tiles`, which is
  // the saved state, and a `Map` cannot be written to a file anyway. Rebuilt
  // in `onHydrated`.
  static readonly transient = ['_byPosition', '_byTile', '_ruleRegistry'];
  private _byPosition: Map<number, PlayerTile> = new Map();
  private _byTile: Map<Tile, PlayerTile> = new Map();
  private _player: Player;
  private _ruleRegistry: RuleRegistry;
  private _tiles: PlayerTile[] = [];
  private _world: World;

  constructor(
    player: Player,
    world: World,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super();

    this._player = player;
    this._world = world;
    this._ruleRegistry = ruleRegistry;

    this.addKey('height', 'tiles', 'width');
  }

  entries(): PlayerTile[] {
    // A copy, matching `World.entries()` — which delegates to
    // `EntityRegistry.entries()` and so has always returned `_entries.slice()`.
    // Handing out the array itself let a caller reorder or empty a player's
    // discovered tiles through what reads as a getter.
    return this._tiles.slice();
  }

  filter(iterator: IRegistryIterator<PlayerTile>): PlayerTile[] {
    return this.entries().filter(iterator);
  }

  forEach(iterator: (item: PlayerTile, i: number) => void): void {
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
  get(x: number, y: number): PlayerTile | UndiscoveredTile {
    return (
      this._byPosition.get(this.position(x, y)) ??
      new UndiscoveredTile(x, y, this._world)
    );
  }

  private position(x: number, y: number): number {
    return y * this._world.width() + x;
  }

  getByTile(tile: Tile): PlayerTile | null {
    return this._byTile.get(tile) ?? null;
  }

  height(): number {
    return this._world.height();
  }

  includes(tile: Tile | PlayerTile): boolean {
    if (tile instanceof Tile) {
      return !!this.getByTile(tile);
    }

    return this._tiles.includes(tile);
  }

  map(iterator: (item: PlayerTile, i: number) => any): any[] {
    return this._tiles.map(iterator);
  }

  player(): Player {
    return this._player;
  }

  register(...tiles: Tile[]): void {
    tiles.forEach((tile: Tile) => {
      if (!this.includes(tile)) {
        const playerTile = new PlayerTile(tile, this._player);

        this._tiles.push(playerTile);
        this.remember(playerTile);

        this._ruleRegistry.process(VisibilityChanged, tile, this.player());
      }
    });
  }

  private remember(playerTile: PlayerTile): void {
    this._byTile.set(playerTile.tile(), playerTile);
    this._byPosition.set(
      this.position(playerTile.x(), playerTile.y()),
      playerTile
    );
  }

  /** The lookups are derived, so a load rebuilds them from the restored tiles. */
  onHydrated(): void {
    this._byPosition = new Map();
    this._byTile = new Map();

    this._tiles.forEach((playerTile: PlayerTile): void =>
      this.remember(playerTile)
    );
  }

  tiles(): PlayerTile[] {
    return this.entries();
  }

  width(): number {
    return this._world.width();
  }
}

export default PlayerWorld;
