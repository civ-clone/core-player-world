import {
  PlayerWorldRegistry,
  instance as playerWorldRegistryInstance,
} from '../PlayerWorldRegistry';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import Player from '@civ-clone/core-player/Player';

export const getAdditionalData = (
  playerWorldRegistry: PlayerWorldRegistry = playerWorldRegistryInstance
) => [
  new AdditionalData(Player, 'world', (player: Player) =>
    playerWorldRegistry.getByPlayer(player)
  ),
];

export default getAdditionalData;
