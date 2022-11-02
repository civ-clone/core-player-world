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
  #private;
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
  private setAdditionalData;
  terrain(): Terrain;
  tile(): Tile;
  update(): void;
  x(): number;
  y(): number;
  yields(): Yield[];
}
export default PlayerTile;
