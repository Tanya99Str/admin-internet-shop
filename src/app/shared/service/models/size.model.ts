import {ProductModel} from './product.model';

export class SizeModel {
  id?: number;
  value?: string;
  products?: ProductModel[];
}

// export interface ISize {
//   id?: number;
//   value?: string;
//   products?: ProductModel[];
// }
//
// export class Size implements ISize {
//   constructor(public id?: number, public value?: string, public products?: ProductModel[]) {}
// }
