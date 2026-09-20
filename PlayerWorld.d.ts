import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { IRegistryIterator } from '@civ-clone/core-registry/Registry';
import Player from '@civ-clone/core-player/Player';
import PlayerTile from './PlayerTile';
import Tile from '@civ-clone/core-world/Tile';
import UndiscoveredTile from './UndiscoveredTile';
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
export declare class PlayerWorld extends DataObject implements IPlayerWorld {
  static readonly transient: string[];
  private _byPosition;
  private _byTile;
  private _player;
  private _ruleRegistry;
  private _tiles;
  private _world;
  constructor(player: Player, world: World, ruleRegistry?: RuleRegistry);
  entries(): PlayerTile[];
  filter(iterator: IRegistryIterator<PlayerTile>): PlayerTile[];
  forEach(iterator: (item: PlayerTile, i: number) => void): void;
  /**
   * By position, not by scanning every tile the player has seen.
   *
   * This and `getByTile` are called for every tile a unit can see, on every
   * move — and `register` asks `includes`, which asks `getByTile`, for every
   * visible tile as well. Each was a filter over the whole discovered world,
   * so a player who had explored more paid more to move.
   */
  get(x: number, y: number): PlayerTile | UndiscoveredTile;
  private position;
  getByTile(tile: Tile): PlayerTile | null;
  height(): number;
  includes(tile: Tile | PlayerTile): boolean;
  map(iterator: (item: PlayerTile, i: number) => any): any[];
  player(): Player;
  register(...tiles: Tile[]): void;
  private remember;
  /** The lookups are derived, so a load rebuilds them from the restored tiles. */
  onHydrated(): void;
  tiles(): PlayerTile[];
  width(): number;
}
export default PlayerWorld;
