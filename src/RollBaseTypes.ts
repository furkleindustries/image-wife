export type RollBaseTypes =
  string |
  symbol |
  Array<string | symbol> |
  ((...any: any[]) => string | symbol | Array<string | symbol> | null) |
  null;
