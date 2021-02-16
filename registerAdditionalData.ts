import { instance as additionalDataRegistryInstance } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import world from './AdditionalData/world';

additionalDataRegistryInstance.register(...world());
