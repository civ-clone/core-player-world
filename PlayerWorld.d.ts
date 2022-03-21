import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { IRegistryFilter } from '@civ-clone/core-registry/Registry';
import Player from '@civ-clone/core-player/Player';
import PlayerTile from './PlayerTile';
import Tile from '@civ-clone/core-world/Tile';
import UndiscoveredTile from './UndiscoveredTile';
import World from '@civ-clone/core-world/World';
export interface IPlayerWorld extends IDataObject {
  filter(iterator: IRegistryFilter<PlayerTile>): PlayerTile[];
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
  #private;
  constructor(player: Player, world: World, ruleRegistry?: RuleRegistry);
  entries(): PlayerTile[];
  filter(iterator: IRegistryFilter<PlayerTile>): PlayerTile[];
  forEach(iterator: (item: PlayerTile, i: number) => void): void;
  get(x: number, y: number): PlayerTile | UndiscoveredTile;
  getByTile(tile: Tile): PlayerTile | null;
  height(): number;
  includes(tile: Tile | PlayerTile): boolean;
  map(iterator: (item: PlayerTile, i: number) => any): any[];
  player(): Player;
  register(...tiles: Tile[]): void;
  tiles(): PlayerTile[];
  width(): number;
}
export default PlayerWorld;
