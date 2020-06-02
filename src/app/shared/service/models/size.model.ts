import {IProduct} from './product.model';

export interface ISize {
  id?: number;
  value?: string;
  products?: IProduct[];
}

export class Size implements ISize {
  constructor(public id?: number, public value?: string, public products?: IProduct[]) {}
}
