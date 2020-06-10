import {ProductModel} from './product.model';
import {SubCategoryModel} from './sub-category.model';

export class CategoryModel {
  id?: number;
  name?: string;
  subCategories?: SubCategoryModel[];
  products?: ProductModel[];
}


// export interface ICategory {
//   id?: number;
//   name?: string;
//   subCategories?: ISubCategory[];
//   products?: ProductModel[];
// }
//
// export class Category implements ICategory {
//   constructor(public id?: number, public name?: string, public subCategories?: ISubCategory[], public products?: ProductModel[]) {}
// }
