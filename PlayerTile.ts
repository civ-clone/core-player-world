import {
  AdditionalDataRegistry,
  instance as additionalDataRegistryInstance,
} from '@civ-clone/core-data-object/AdditionalDataRegistry';
import {
  DataObject,
  IDataObject,
  PlainObject,
} from '@civ-clone/core-data-object/DataObject';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import Player from '@civ-clone/core-player/Player';
import Terrain from '@civ-clone/core-terrain/Terrain';
import Tile from '@civ-clone/core-world/Tile';
import Yield from '@civ-clone/core-yield/Yield';

export interface IPlayerTile extends IDataObject {
  isCoast(): boolean;
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
  private _additionalData: PlainObject = {};
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

  private setAdditionalData(): void {
    this._additionalDataRegistry
      .getByType(Tile)
      .forEach((additionalData: AdditionalData): void => {
        this._additionalData[additionalData.key()] = additionalData.data(
          this._tile
        );

        Object.defineProperty(this, additionalData.key(), {
          configurable: true,
          value: () => additionalData.data(this._tile),
        });

        this.addKey(additionalData.key());
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
