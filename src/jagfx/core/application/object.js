export const objectKeyExist = (key, object) => {
  return Reflect.ownKeys(object).indexOf(key) !== -1;
};

export const objectKeyValueOrNull = (key, object) => {
  return objectKeyExist(key, object) ? object[key] : null;
};
