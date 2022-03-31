import {
  AdditionalDataRegistry,
  instance as additionalDataRegistryInstance,
} from '@civ-clone/core-data-object/AdditionalDataRegistry';
import {
  DataObject,
  IDataObject,
  PlainObject,
} from '@civ-clone/core-data-object/DataObject';
import {
  YieldRegistry,
  instance as yieldRegistryInstance,
} from '@civ-clone/core-yield/YieldRegistry';
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
  yields(yields: typeof Yield[], yieldRegistry: YieldRegistry): Yield[];
}

export class PlayerTile extends DataObject implements IPlayerTile {
  #additionalData: PlainObject = {};
  #additionalDataRegistry: AdditionalDataRegistry;
  #player: Player;
  #tile: Tile;

  constructor(
    tile: Tile,
    player: Player,
    additionalDataRegistry: AdditionalDataRegistry = additionalDataRegistryInstance
  ) {
    super();

    this.#additionalDataRegistry = additionalDataRegistry;
    this.#player = player;
    this.#tile = tile;

    this.addKey('isCoast', 'isLand', 'isWater', 'terrain', 'x', 'y', 'yields');

    this.setAdditionalData();
  }

  addKey(...keys: (string | number | Symbol)[]) {
    super.addKey(...(keys as (keyof this)[]));
  }

  isCoast(): boolean {
    return this.#tile.isCoast();
  }

  isLand(): boolean {
    return this.#tile.isLand();
  }

  isWater(): boolean {
    return this.#tile.isWater();
  }

  player(): Player {
    return this.#player;
  }

  private setAdditionalData(): void {
    this.#additionalDataRegistry
      .getByType(Tile)
      .forEach((additionalData: AdditionalData): void => {
        this.#additionalData[additionalData.key()] = additionalData.data(
          this.#tile
        );

        Object.defineProperty(this, additionalData.key(), {
          value: () => additionalData.data(this.#tile), //this.#additionalData[additionalData.key()],
        });

        this.addKey(additionalData.key());
      });
  }

  terrain(): Terrain {
    return this.#tile.terrain();
  }

  tile(): Tile {
    return this.#tile;
  }

  update(): void {
    this.#additionalDataRegistry
      .getByType(Tile)
      .forEach((additionalData: AdditionalData): void => {
        this.#additionalData[additionalData.key()] = additionalData.data(
          this.#tile
        );
      });
  }

  x(): number {
    return this.#tile.x();
  }

  y(): number {
    return this.#tile.y();
  }

  yields(): Yield[] {
    return this.#tile.yields(this.#player);
  }
}

export default PlayerTile;
