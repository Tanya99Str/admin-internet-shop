import {ProductModel} from './product.model';


export class Collection {
  id?: number;
  name?: string;
  products?: ProductModel[];
}

// export interface ICollection {
//   id?: number;
//   name?: string;
//   products?: ProductModel[];
// }
//
// export class Collection implements ICollection {
//   constructor(public id?: number, public name?: string, public products?: ProductModel[]) {}
// }
