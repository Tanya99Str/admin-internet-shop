import {IProduct} from './product.model';

export interface IColour {
  id?: number;
  name?: string;
  products?: IProduct[];
}

export class Colour implements IColour {
  constructor(public id?: number, public name?: string, public products?: IProduct[]) {}
}
