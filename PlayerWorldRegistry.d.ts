import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Player from '@civ-clone/core-player/Player';
import PlayerWorld from './PlayerWorld';
export interface IPlayerWorldRegistry extends IEntityRegistry<PlayerWorld> {
  getByPlayer(player: Player): PlayerWorld;
}
export declare class PlayerWorldRegistry
  extends EntityRegistry<PlayerWorld>
  implements IPlayerWorldRegistry
{
  constructor();
  getByPlayer(player: Player): PlayerWorld;
}
export declare const instance: PlayerWorldRegistry;
export default PlayerWorldRegistry;
