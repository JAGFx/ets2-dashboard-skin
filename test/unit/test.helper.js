export const changeTelemetryData = (obj, path, value) =>
  deepChangeObjectValue(obj, 'telemetry.' + path, value);

export const deepChangeObjectValue = (obj, path, value) => {
  let i;

  path = path.split('.');
  for (i = 0; i < path.length - 1; i++) obj = obj[path[i]];

  obj[path[i]] = value;

  return obj;
};

export const applyChangesOnTelemetryFromDataProvider = (
  store,
  dataProvider
) => {
  for (const [key, value] of Object.entries(dataProvider)) {
    changeTelemetryData(store, key, value);
  }
};
