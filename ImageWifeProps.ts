type Types =
  string |
  symbol |
  Array<string | symbol> |
  ((...any: any[]) => string | symbol | Array<string | symbol>);

export interface ImageWifeProps {
  readonly rolls: Types[];
  readonly src: string; 
}
