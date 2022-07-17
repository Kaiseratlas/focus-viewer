import type { FocusFilterId } from '../../focus-filters';

export type FocusId = string;
export type ProductVersion = string;

export type Focus = {
  readonly id: FocusId;
  readonly x: number;
  readonly y: number;
  readonly name: string;
  readonly icon: string;
  readonly cost: number;
  readonly prerequisiteFocusIds: string[];
  readonly relativePositionId: string;
  readonly mutuallyExclusive: { focus: string } | null;
  readonly availableIfCapitulated: boolean;
  readonly searchFilters: FocusFilterId[];
  readonly isHidden: boolean;
};
