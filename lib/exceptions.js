export class ConfigurationException extends Error {
  constructor(message, metadata) {
    super(message);
    this.metadata = metadata;
  }
}
