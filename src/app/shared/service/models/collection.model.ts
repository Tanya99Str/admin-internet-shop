import {IProduct} from './product.model';

export interface ICollection {
  id?: number;
  name?: string;
  products?: IProduct[];
}

export class Collection implements ICollection {
  constructor(public id?: number, public name?: string, public products?: IProduct[]) {}
}
