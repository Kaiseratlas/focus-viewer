import type { FocusFilterId } from '../../focus-filters';

export type FocusTreeId = string;
export type ProductVersion = string;

export type Focus = {
  readonly id: FocusTreeId;
  readonly name: string;
  readonly icon: string;
  readonly cost: number;
  readonly prerequisiteFocusIds: string[];
  readonly relativePositionId: string;
  readonly mutuallyExclusive: { focus: string } | null;
  readonly availableIfCapitulated: boolean;
  readonly searchFilters: FocusFilterId[];
};
