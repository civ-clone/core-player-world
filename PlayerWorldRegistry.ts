import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Player from '@civ-clone/core-player/Player';
import PlayerWorld from './PlayerWorld';

export interface IPlayerWorldRegistry extends IEntityRegistry<PlayerWorld> {
  getByPlayer(player: Player): PlayerWorld;
}

export class PlayerWorldRegistry
  extends EntityRegistry<PlayerWorld>
  implements IPlayerWorldRegistry {
  constructor() {
    super(PlayerWorld);
  }

  getByPlayer(player: Player): PlayerWorld {
    const playerWorlds = this.getBy('player', player);

    if (playerWorlds.length !== 1) {
      throw new TypeError(
        `Wrong number of player worlds exist for player: ${player.id()}`
      );
    }

    return playerWorlds[0];
  }
}

export const instance: PlayerWorldRegistry = new PlayerWorldRegistry();

export default PlayerWorldRegistry;
