export type PreferenceEntryId = string;

export enum PreferenceEntryCategories {
  General = 'general',
  Event = 'event',
  Game = 'game',
  Job = 'job',
  Navigation = 'navigation',
  Trailer = 'trailer',
  Truck = 'truck',
  Dashboard = 'dashboard',
  Jagfx = 'jagfx',
  Map = 'map',
  Elements = 'elements',
  Tiles = 'tiles',
  Scania = 'scania',
  Unit = 'unit'
}

export type PreferenceEntryValue = {
  label: string;
  value: string | boolean | null;
};

export interface PreferenceEntryInterface {
  id: PreferenceEntryId;
  categories: PreferenceEntryCategories[] | string[];
  label: string;
  description: string;
  values: PreferenceEntryValue[] | null;
}

export class PreferenceEntry implements PreferenceEntryInterface {
  constructor(
    public id: PreferenceEntryId = '',
    public categories: PreferenceEntryCategories[] | string[] = [],
    public label: string = '',
    public description: string = '',
    public values: PreferenceEntryValue[] | null = null
  ) {
    this.id = id;
    this.categories = categories;
    this.label = label;
    this.description = description;
    this.values = values;
  }
}

export class PreferenceEntryCollection extends Map<
  PreferenceEntryId,
  PreferenceEntry
> {}
