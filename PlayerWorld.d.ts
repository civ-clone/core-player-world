import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import { IWorld, World } from '@civ-clone/core-world/World';
export interface IPlayerWorld extends IWorld {
  get(x: number, y: number): Tile;
  player(): Player;
}
export declare class PlayerWorld extends World implements IPlayerWorld {
  #private;
  constructor(player: Player, world: World);
  get(x: number, y: number): Tile;
  player(): Player;
}
export default PlayerWorld;
