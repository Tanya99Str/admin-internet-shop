import {ProductModel} from './product.model';

export interface IColour {
  id?: number;
  name?: string;
  products?: ProductModel[];
}

export class Colour implements IColour {
  constructor(public id?: number, public name?: string, public products?: ProductModel[]) {}
}
