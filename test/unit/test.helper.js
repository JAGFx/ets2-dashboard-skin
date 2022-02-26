export const changeTelemetryData = (obj, path, value) =>
  deepChangeObjectValue(obj, 'telemetry.' + path, value);

export const deepChangeObjectValue = (obj, path, value) => {
  let i;
  const splitPath = path.split('.');

  for (i = 0; i < splitPath.length - 1; i++) {
    if (!Object.hasOwnProperty.call(obj, splitPath[i]))
      throw new Error(
        `The path "${path}" was not found on the original object`
      );
    obj = obj[splitPath[i]];
  }

  obj[splitPath[i]] = value;

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
