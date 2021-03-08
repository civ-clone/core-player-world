import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { World, IWorld } from '@civ-clone/core-world/World';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
export interface IPlayerWorld extends IWorld {
  get(x: number, y: number): Tile;
  player(): Player;
}
export declare class PlayerWorld extends World implements IPlayerWorld {
  #private;
  constructor(player: Player, world: World, ruleRegistry?: RuleRegistry);
  get(x: number, y: number): Tile;
  player(): Player;
  register(...tiles: Tile[]): void;
}
export default PlayerWorld;
