import {
  FunctionalPseudoRollType,
} from './FunctionalPseudoRollType';
import {
  MetaRollType,
} from './MetaRollType';
import {
  MutationRollType,
} from './MutationRollType';

export type RollBaseTypes =
  MutationRollType |
    MetaRollType |
    FunctionalPseudoRollType |
    null;
