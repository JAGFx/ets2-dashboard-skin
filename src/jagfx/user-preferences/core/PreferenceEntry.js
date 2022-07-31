export class PreferenceEntry {
  constructor(id = '', target = '', label = '', description = '', values = []) {
    this.id = id;
    this.target = target;
    this.label = label;
    this.description = description;
    this.values = values;
  }
}
