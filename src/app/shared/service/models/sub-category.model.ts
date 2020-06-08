import {ProductModel} from './product.model';
import {ICategory} from './category.model';

export interface ISubCategory {
  id?: number;
  name?: string;
  category?: ICategory;
  products?: ProductModel[];
}

export class SubCategory implements ISubCategory {
  constructor(public id?: number, public name?: string, public category?: ICategory, public products?: ProductModel[]) {}
}
