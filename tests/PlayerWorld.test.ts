import Generator from '@civ-clone/core-world-generator/Generator';
import HexOddRTopology from '@civ-clone/core-world/HexOddRTopology';
import Player from '@civ-clone/core-player/Player';
import PlayerWorld from '../PlayerWorld';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import StaggeredIsoTopology from '@civ-clone/core-world/StaggeredIsoTopology';
import World from '@civ-clone/core-world/World';
import { expect } from 'chai';

// What the client is sent: `toPlainObject()` gives a map of every object by id,
// beside a reference to the one asked for.
const sent = (playerWorld: PlayerWorld): { [key: string]: unknown } => {
  const { hierarchy, objects } = playerWorld.toPlainObject() as unknown as {
    hierarchy: { '#ref': string };
    objects: { [id: string]: { [key: string]: unknown } };
  };

  return objects[hierarchy['#ref']];
};

const playerWorldOn = (generator: Generator): PlayerWorld => {
  const ruleRegistry = new RuleRegistry();

  return new PlayerWorld(
    new Player(ruleRegistry),
    new World(generator, ruleRegistry),
    ruleRegistry
  );
};

describe('PlayerWorld', (): void => {
  it("should send the id of the world's topology to the client, square by default", (): void => {
    const playerWorld = playerWorldOn(new Generator(4, 6)),
      plainObject = sent(playerWorld);

    expect(playerWorld.keys()).to.include('topologyId');
    expect(playerWorld.topologyId()).to.equal('square');
    expect(plainObject.topologyId).to.equal('square');
    expect(plainObject.height).to.equal(4);
    expect(plainObject.width).to.equal(6);
  });

  (
    [
      ['hex-odd-r', HexOddRTopology],
      ['staggered-iso', StaggeredIsoTopology],
    ] as const
  ).forEach(([id, Topology]): void => {
    it(`should send '${id}' for a world on a ${Topology.name}`, (): void => {
      const playerWorld = playerWorldOn(
          new Generator(4, 6, { topology: new Topology(6, 4) })
        ),
        plainObject = sent(playerWorld);

      expect(playerWorld.topologyId()).to.equal(id);
      expect(plainObject.topologyId).to.equal(id);
    });
  });

  it('should send the key after loading a save made before it was added', (): void => {
    const playerWorld = playerWorldOn(new Generator(4, 6));

    // What a save written before this key restores: the keys are saved beside
    // the state, and `onHydrated` runs after them.
    (playerWorld as unknown as { _keys: string[] })._keys = [
      'id',
      'height',
      'tiles',
      'width',
    ];
    expect(sent(playerWorld)).not.to.have.property('topologyId');

    playerWorld.onHydrated();

    expect(sent(playerWorld).topologyId).to.equal('square');

    playerWorld.onHydrated();

    expect(
      playerWorld.keys().filter((key) => key === 'topologyId')
    ).to.have.length(1);
  });
});
