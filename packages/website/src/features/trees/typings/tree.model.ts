import type { FocusId } from '../../focuses';

export type TreeId = string;

export type Tree = {
  readonly id: TreeId;
  readonly name: string;
  readonly focusCount: number;
  readonly sharedFocusIds: FocusId[];
};
