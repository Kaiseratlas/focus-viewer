export type ReleaseVersion = string;

export interface Release {
  readonly name?: string;
  readonly version: ReleaseVersion;
  readonly date: Date;
  readonly tags?: string[];
}
