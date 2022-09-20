export class PreferenceEntry {
  public id: string;
  public target: string;
  public label: string;
  public description: string;
  public values: string[];

  constructor(id = '', target = '', label = '', description = '', values = []) {
    this.id = id;
    this.target = target;
    this.label = label;
    this.description = description;
    this.values = values;
  }
}
