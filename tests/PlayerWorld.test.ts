import Player from '@civ-clone/core-player/Player';
import PlayerWorld from '../PlayerWorld';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import World from '@civ-clone/core-world/World';
import { expect } from 'chai';

describe('PlayerWorld', (): void => {
  it('gives back the world it is a view of, without sending it as a key', (): void => {
    const rules = new RuleRegistry(),
      // Only kept, never read, so a stand-in will do.
      world = Object.create(World.prototype) as World,
      playerWorld = new PlayerWorld(new Player(rules), world, rules);

    expect(playerWorld.world()).to.equal(world);
    expect(playerWorld.keys()).to.not.include('world');
  });
});
