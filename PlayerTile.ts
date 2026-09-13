import {
  AdditionalDataRegistry,
  instance as additionalDataRegistryInstance,
} from '@civ-clone/core-data-object/AdditionalDataRegistry';
import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
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

export class PlayerTile extends DataObject implements IPlayerTile {
  static readonly transient = ['_additionalDataRegistry'];
  private _additionalDataRegistry: AdditionalDataRegistry;
  private _player: Player;
  private _tile: Tile;

  constructor(
    tile: Tile,
    player: Player,
    additionalDataRegistry: AdditionalDataRegistry = additionalDataRegistryInstance
  ) {
    super();

    this._additionalDataRegistry = additionalDataRegistry;
    this._player = player;
    this._tile = tile;

    this.addKey('isCoast', 'isLand', 'isWater', 'terrain', 'x', 'y', 'yields');

    this.setAdditionalData();
  }

  addKey(...keys: (string | number | Symbol)[]) {
    super.addKey(...(keys as (keyof this)[]));
  }

  isCoast(): boolean {
    return this._tile.isCoast();
  }

  isLand(): boolean {
    return this._tile.isLand();
  }

  isWater(): boolean {
    return this._tile.isWater();
  }

  player(): Player {
    return this._player;
  }

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
  onHydrated(): void {
    this.setAdditionalData(false);
  }

  private setAdditionalData(addKeys: boolean = true): void {
    this._additionalDataRegistry
      .getByType(Tile)
      .forEach((additionalData: AdditionalData): void => {
        Object.defineProperty(this, additionalData.key(), {
          configurable: true,
          value: () => additionalData.data(this._tile),
        });

        if (addKeys) {
          this.addKey(additionalData.key());
        }
      });
  }

  terrain(): Terrain {
    return this._tile.terrain();
  }

  tile(): Tile {
    return this._tile;
  }

  update(): void {
    this._tile.clearYieldCache(this._player);

    this.setAdditionalData();
  }

  x(): number {
    return this._tile.x();
  }

  y(): number {
    return this._tile.y();
  }

  yields(): Yield[] {
    return this._tile.yields(this._player);
  }
}

export default PlayerTile;
