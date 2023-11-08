export enum Method {
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

export type Path = {
  method: Method;
  path: string;
};
