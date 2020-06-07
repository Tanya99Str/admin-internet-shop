import {IProduct} from './product.model';
import {ISubCategory} from './sub-category.model';

export interface ICategory {
  id?: number;
  name?: string;
  subCategories?: ISubCategory[];
  products?: IProduct[];
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string, public subCategories?: ISubCategory[], public products?: IProduct[]) {}
}
