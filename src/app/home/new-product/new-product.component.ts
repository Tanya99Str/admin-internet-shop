import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../shared/service/models/product.model';
import {IColour} from '../../shared/service/models/colour.model';
import {HttpResponse} from '@angular/common/http';
import {ColourService} from '../../shared/service/backend/colors.service';
import {Collection} from '../../shared/service/models/collection.model';
import {ISubCategory} from '../../shared/service/models/sub-category.model';
import {ICategory} from '../../shared/service/models/category.model';
import {ISize} from '../../shared/service/models/size.model';
import {CategoryService} from '../../shared/service/backend/category.service';
import {SubCategoryService} from '../../shared/service/backend/sub-category.service';
import {SizeService} from '../../shared/service/backend/size.service';
import {ProductService} from '../../shared/service/backend/product.service';
import {MatSnackBar} from '@angular/material';
import {CollectionService} from '../../shared/service/backend/collection.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  newProductFormGroup: FormGroup;
  colours?: IColour[];
  sizes: ISize[] = [];
  categories: ICategory[] = [];
  subcategories: ISubCategory[] = [];
  collections: Collection[] = [];
  newProduct: ProductModel = new ProductModel();

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              private _colourService: ColourService,
              private _collectionService: CollectionService,
              private _categoryService: CategoryService,
              private _subCategoryService: SubCategoryService,
              private _sizeService: SizeService,
              private _productService: ProductService,
              private _snackBar: MatSnackBar,
              private  activatedRoute: ActivatedRoute) {
    this.loadAll();
  }

  ngOnInit() {
    this.newProductFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      material: ['', [Validators.required]],
      description: ['', [Validators.required]],
      collection: ['', [Validators.required]],
      madeOf: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subCategories: ['', [Validators.required]],
    });
  }

  loadAll(): void {
      this._sizeService.query().subscribe((res: HttpResponse<ISize[]>) => (this.sizes = res.body || []));
      this._categoryService.query().subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body || []));
      this._subCategoryService.query().subscribe((res: HttpResponse<ISubCategory[]>) => (this.subcategories = res.body || []));
      this._colourService.query().subscribe((res: HttpResponse<IColour[]>) => (this.colours = res.body || []));
      this._collectionService.query().subscribe((res: HttpResponse<Collection[]>) => (this.collections = res.body || []));
  }

  addNewProduct() {
    this.newProduct.name = this.newProductFormGroup.get('name').value;
    this.newProduct.description = this.newProductFormGroup.get('description').value;
    this.newProduct.price = this.newProductFormGroup.get('price').value;
    this.newProduct.madeOf = this.newProductFormGroup.get('madeOf').value;
    this.newProduct.material = this.newProductFormGroup.get('material').value;
    this._productService.create(this.newProduct).subscribe(next => {
      this.info('Товар успішно додано.');
      this.router.navigateByUrl('/home/products');
    }, error => {
      console.error(error);
    })
  }

  info(message: string) {
    this._snackBar.open(message, 'ок', {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      announcementMessage: message,
      politeness: 'polite',
      direction: 'ltr'
    });
  }

}
