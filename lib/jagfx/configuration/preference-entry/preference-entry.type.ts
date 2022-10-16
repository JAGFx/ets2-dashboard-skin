export type PreferenceEntryValue = {
  label: string;
  value: string | boolean;
};

export interface PreferenceEntryInterface {
  id: string;
  categories: string[];
  label: string;
  description: string;
  values: PreferenceEntryValue[] | null;
}

export class PreferenceEntry implements PreferenceEntryInterface {
  constructor(
    public id: string = '',
    public categories: string[] = [],
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
