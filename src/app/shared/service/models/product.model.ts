import {SizeModel} from './size.model';
import {CategoryModel} from './category.model';
import {ISubCategory} from './sub-category.model';
import {ColourModel} from './colour.model';
import {Collection} from './collection.model';

export class ProductModel {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  madeOf?: string;
  material?: string;
  image1ContentType?: string;
  image1?: any;
  image2ContentType?: string;
  image2?: any;
  image3ContentType?: string;
  image3?: any;
  image4ContentType?: string;
  image4?: any;
  image5ContentType?: string;
  image5?: any;
  sizes?: SizeModel[];
  categories?: CategoryModel[];
  subCategories?: ISubCategory[];
  colours?: ColourModel[];
  suggestedProducts?: ProductModel[];
  collection?: Collection;
  suggestedFors?: ProductModel[];
}

// export interface IProduct {
//   id?: number;
//   name?: string;
//   description?: string;
//   price?: number;
//   madeOf?: string;
//   material?: string;
//   image1ContentType?: string;
//   image1?: any;
//   image2ContentType?: string;
//   image2?: any;
//   image3ContentType?: string;
//   image3?: any;
//   image4ContentType?: string;
//   image4?: any;
//   image5ContentType?: string;
//   image5?: any;
//   sizes?: ISize[];
//   categories?: ICategory[];
//   subCategories?: ISubCategory[];
//   colours?: IColour[];
//   suggestedProducts?: IProduct[];
//   collection?: ICollection;
//   suggestedFors?: IProduct[];
// }

// export class Product implements IProduct {
//   constructor(
//     public id?: number,
//     public name?: string,
//     public description?: string,
//     public price?: number,
//     public madeOf?: string,
//     public material?: string,
//     public image1ContentType?: string,
//     public image1?: any,
//     public image2ContentType?: string,
//     public image2?: any,
//     public image3ContentType?: string,
//     public image3?: any,
//     public image4ContentType?: string,
//     public image4?: any,
//     public image5ContentType?: string,
//     public image5?: any,
//     public sizes?: ISize[],
//     public categories?: ICategory[],
//     public subCategories?: ISubCategory[],
//     public colours?: IColour[],
//     public suggestedProducts?: IProduct[],
//     public collection?: ICollection,
//     public suggestedFors?: IProduct[]
//   ) {}
// }
