import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatRadioChange, MatSelectionListChange, MatSnackBar} from '@angular/material';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {ProductModel} from '../../shared/service/models/product.model';
import {ProductService} from '../../shared/service/backend/product.service';
import {HttpResponse} from '@angular/common/http';
import {SizeModel} from '../../shared/service/models/size.model';
import {CategoryModel} from '../../shared/service/models/category.model';
import {SubCategoryModel} from '../../shared/service/models/sub-category.model';
import {ColourModel} from '../../shared/service/models/colour.model';
import {Collection} from '../../shared/service/models/collection.model';
import {ColourService} from '../../shared/service/backend/colors.service';
import {CollectionService} from '../../shared/service/backend/collection.service';
import {CategoryService} from '../../shared/service/backend/category.service';
import {SubCategoryService} from '../../shared/service/backend/sub-category.service';
import {SizeService} from '../../shared/service/backend/size.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {ConfirmUpdateComponent} from '../dialogs/confirm-update/confirm-update.component';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: ProductModel;
  productId: number;

  colours: ColourModel[];
  sizes: SizeModel[] = [];
  categories: CategoryModel[] = [];
  subcategories: SubCategoryModel[] = [];
  collections: Collection[] = [];
  products: ProductModel[] = [];
  selectedColor: boolean = false;
  editColor: boolean;
  editSize: boolean;
  editCollection: boolean;
  editCategory: boolean;
  editSubCategory: boolean;
  editSuggestedProducts: boolean;
  productPhotoFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              public dialog: MatDialog,
              public router: Router,
              private _snackBar: MatSnackBar,
              private _productService: ProductService,
              private _colourService: ColourService,
              private _collectionService: CollectionService,
              private _categoryService: CategoryService,
              private _subCategoryService: SubCategoryService,
              private _sizeService: SizeService,
              protected elementRef: ElementRef,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.queryParams.subscribe(value => {
      if (isNotNullOrUndefined(value['product_id'])) {
        this.productId = parseInt(value['product_id']);
        console.log(this.productId);
        this.init();
      }
    });
  }

  init() {
    console.log(this.product);
    this._productService.findProductById(this.productId).subscribe(next => {
      this.product = next;
    }, error => {
      console.error(error);
    });
    this._sizeService.query().subscribe((res: HttpResponse<SizeModel[]>) => (this.sizes = res.body || []));
    this._categoryService.query().subscribe((res: HttpResponse<CategoryModel[]>) => (this.categories = res.body || []));
    this._subCategoryService.query().subscribe((res: HttpResponse<SubCategoryModel[]>) => (this.subcategories = res.body || []));
    this._colourService.query().subscribe((res: HttpResponse<ColourModel[]>) => (this.colours = res.body || []));
    this._collectionService.query().subscribe((res: HttpResponse<Collection[]>) => (this.collections = res.body || []));
    this._productService.query().subscribe((res: HttpResponse<ProductModel[]>) => (this.products = res.body || []));
  }

  save() {
    this.product.image1 = this.productPhotoFormGroup.get('image1').value ?  this.productPhotoFormGroup.get('image1').value : this.product.image1;
    this.product.image1ContentType = this.productPhotoFormGroup.get('image1ContentType').value ? this.productPhotoFormGroup.get('image1ContentType').value : this.product.image1ContentType;
    this.product.image2 = this.productPhotoFormGroup.get('image2').value ?  this.productPhotoFormGroup.get('image2').value : this.product.image2;
    this.product.image2ContentType = this.productPhotoFormGroup.get('image2ContentType').value ? this.productPhotoFormGroup.get('image2ContentType').value : this.product.image2ContentType;
    this.product.image3 = this.productPhotoFormGroup.get('image3').value ?  this.productPhotoFormGroup.get('image3').value : this.product.image3;
    this.product.image3ContentType = this.productPhotoFormGroup.get('image3ContentType').value ? this.productPhotoFormGroup.get('image3ContentType').value : this.product.image3ContentType;
    this.product.image4 = this.productPhotoFormGroup.get('image4').value ?  this.productPhotoFormGroup.get('image4').value : this.product.image4;
    this.product.image4ContentType = this.productPhotoFormGroup.get('image4ContentType').value ? this.productPhotoFormGroup.get('image4ContentType').value : this.product.image4ContentType;
    this.product.image5 = this.productPhotoFormGroup.get('image5').value ?  this.productPhotoFormGroup.get('image5').value : this.product.image5;
    this.product.image5ContentType = this.productPhotoFormGroup.get('image5ContentType').value ? this.productPhotoFormGroup.get('image5ContentType').value : this.product.image5ContentType;
    this._productService.update(this.product).subscribe(next => {
      this.info('Дані успішно оновлено.');
      this.router.navigateByUrl('/home/products');
      // this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });

  }

  confirmChange() {
    const dialogRef = this.dialog.open(ConfirmUpdateComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save();
      }
    });
  }

  changeColor() {
    this.editColor = !this.editColor;
    this.product.colours = [];
  }

  changeCollection() {
    this.editCollection = !this.editCollection;
    this.product.collection = null;
  }

  changeCategory() {
    this.editCategory = !this.editCategory;
    this.product.categories = [];
  }

  changeSubCategory() {
    this.editSubCategory = !this.editSubCategory;
    this.product.subCategories = [];
  }

  changeSizes() {
    this.editSize = !this.editSize;
    this.product.sizes = [];
  }

  changeSuggestedProduct() {
    this.editSuggestedProducts = !this.editSuggestedProducts;
    this.product.suggestedProducts = [];
  }

  changeSelectColors(e: MatSelectionListChange) {
      this.product.colours.push(e.option.value);
      console.log(this.product.colours);
  }

  changeSelectSizes(e: MatSelectionListChange) {
    if (e.option.selected) {
      this.product.sizes.push(e.option.value);
      console.log(this.product.sizes);
    }
  }

  selectCollection(event: MatRadioChange) {
    if (event.source.checked) {
      this.product.collection = event.value;
    }
  }

  changeSelectCategories(e: MatSelectionListChange) {
    if (e.option.selected) {
      this.product.categories.push(e.option.value);
      console.log(this.product.categories);
    }
  }

  changeSelectSubCategories(e: MatSelectionListChange) {
    if (e.option.selected) {
      this.product.subCategories.push(e.option.value);
      console.log(this.product.subCategories);
    }
  }

  changeSuggestedProducts(e: MatSelectionListChange) {
    if (e.option.selected) {
      this.product.suggestedProducts.push(e.option.value);
      console.log(this.product.suggestedProducts);
    }
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.loadFileToForm(event, this.productPhotoFormGroup, field, isImage).subscribe(null, (err: Error) => {
      console.log(err);
    });
  }

  loadFileToForm(event: Event, editForm: FormGroup, field: string, isImage: boolean): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
      if (eventTarget.files && eventTarget.files[0]) {
        const file: File = eventTarget.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          observer.error(Error("file is not loaded"));
        } else {
          const fieldContentType: string = field + 'ContentType';
          this.toBase64(file, (base64Data: string) => {
            console.log(base64Data);
            console.log(editForm);
            console.log(file.type);
            editForm.patchValue({
              [field]: base64Data,
              [fieldContentType]: file.type
            });
            observer.next();
            observer.complete();
          });
        }
      } else {
        observer.error(Error("file is not loaded"));
      }
    });
  }

  toBase64(file: File, cb: Function): void {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = function(e: any) {
      const base64Data: string = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
      cb(base64Data);
    };
    fileReader.readAsDataURL(file);
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    console.log(this.productPhotoFormGroup.get('image1').value);
    console.log(this.productPhotoFormGroup.get('image1ContentType').value);
    this.productPhotoFormGroup.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  delete1Image() {
    this.product.image1 = '';
    this.product.image1ContentType = '';
  }

  delete2Image() {
    this.product.image2 = '';
    this.product.image2ContentType = '';
  }

  delete3Image() {
    this.product.image3 = '';
    this.product.image3ContentType = '';
  }

  delete4Image() {
    this.product.image4 = '';
    this.product.image4ContentType = '';
  }

  delete5Image() {
    this.product.image5 = '';
    this.product.image5ContentType = '';
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

  ngOnInit() {
    this.productPhotoFormGroup = this._formBuilder.group({
      image1ContentType: [''],
      image1: [''],
      image2ContentType: [''],
      image2: [''],
      image3ContentType: [''],
      image3: [''],
      image4ContentType: [''],
      image4: [''],
      image5ContentType: [''],
      image5: ['']
    });
  }

}
