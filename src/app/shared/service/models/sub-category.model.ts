import {ProductModel} from './product.model';
import {CategoryModel} from './category.model';

export class SubCategoryModel {
  id?: number;
  name?: string;
  category?: CategoryModel;
  products?: ProductModel[];
}

// export interface ISubCategory {
//   id?: number;
//   name?: string;
//   category?: CategoryModel;
//   products?: ProductModel[];
// }
//
// export class SubCategory implements ISubCategory {
//   constructor(public id?: number, public name?: string, public category?: CategoryModel, public products?: ProductModel[]) {}
// }
