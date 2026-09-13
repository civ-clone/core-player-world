import { AdditionalDataRegistry } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import Player from '@civ-clone/core-player/Player';
import Terrain from '@civ-clone/core-terrain/Terrain';
import Tile from '@civ-clone/core-world/Tile';
import Yield from '@civ-clone/core-yield/Yield';
export interface IPlayerTile extends IDataObject {
  isCoast(): boolean;
  onHydrated(): void;
  isLand(): boolean;
  isWater(): boolean;
  terrain(): Terrain;
  tile(): Tile;
  update(): void;
  x(): number;
  y(): number;
  yields(): Yield[];
}
export declare class PlayerTile extends DataObject implements IPlayerTile {
  static readonly transient: string[];
  private _additionalDataRegistry;
  private _player;
  private _tile;
  constructor(
    tile: Tile,
    player: Player,
    additionalDataRegistry?: AdditionalDataRegistry
  );
  addKey(...keys: (string | number | Symbol)[]): void;
  isCoast(): boolean;
  isLand(): boolean;
  isWater(): boolean;
  player(): Player;
  /**
   * Reinstall the additional-data accessors after generic hydration.
   *
   * `Game.inject` calls this if a class defines it, and `PlayerTile` is the
   * only class in the engine that does — because it is the only one that builds
   * per-instance structure in its constructor.
   *
   * The accessors are installed with `Object.defineProperty` and so are
   * non-enumerable: `stateKeys()` never sees them, the save never carries them,
   * and a hydrated `PlayerTile` would have `_keys` naming methods that do not
   * exist. `toPlainObject()` walks `keys()` and calls each one, so the first
   * thing to break would be the payload sent to the renderer.
   *
   * `false` because the keys come back with the save; re-adding them would
   * duplicate every one.
   */
  onHydrated(): void;
  private setAdditionalData;
  terrain(): Terrain;
  tile(): Tile;
  update(): void;
  x(): number;
  y(): number;
  yields(): Yield[];
}
export default PlayerTile;
