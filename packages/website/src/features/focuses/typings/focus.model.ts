export type FocusTreeId = string;
export type ProductVersion = string;

export type Focus = {
  readonly id: FocusTreeId;
  readonly name: string;
  readonly icon: string;
  readonly prerequisiteFocusIds: string[];
  readonly relativePositionId: string;
  readonly mutuallyExclusive: { focus: string } | null;
};
