import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../shared/service/models/product.model';
import {ColourModel} from '../../shared/service/models/colour.model';
import {HttpResponse} from '@angular/common/http';
import {ColourService} from '../../shared/service/backend/colors.service';
import {Collection} from '../../shared/service/models/collection.model';
import {SubCategoryModel} from '../../shared/service/models/sub-category.model';
import {CategoryModel} from '../../shared/service/models/category.model';
import {SizeModel} from '../../shared/service/models/size.model';
import {CategoryService} from '../../shared/service/backend/category.service';
import {SubCategoryService} from '../../shared/service/backend/sub-category.service';
import {SizeService} from '../../shared/service/backend/size.service';
import {ProductService} from '../../shared/service/backend/product.service';
import {MatDialog, MatRadioChange, MatSelectionListChange, MatSnackBar} from '@angular/material';
import {CollectionService} from '../../shared/service/backend/collection.service';
import {ConfirmCreateComponent} from '../dialogs/confirm-create/confirm-create.component';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  newProductFormGroup: FormGroup;
  colours?: ColourModel[];
  sizes: SizeModel[] = [];
  categories: CategoryModel[] = [];
  subcategories: SubCategoryModel[] = [];
  collections: Collection[] = [];
  products: ProductModel[] = [];
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
              public dialog: MatDialog,
              private  activatedRoute: ActivatedRoute,
              protected elementRef: ElementRef) {
    this.newProduct.categories = [];
    this.newProduct.subCategories = [];
    this.newProduct.colours = [];
    this.newProduct.sizes = [];
    this.newProduct.suggestedProducts = [];
    this.loadAll();
  }

  confirmCreate() {
    const dialogRef = this.dialog.open(ConfirmCreateComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNewProduct();
      }
    });
  }

  ngOnInit() {
    this.newProductFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      material: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // collection: ['', [Validators.required]],
      madeOf: ['', [Validators.required]],
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
      // category: ['', [Validators.required]],
      // subCategories: ['', [Validators.required]],
    });
  }

  loadAll(): void {
      this._sizeService.query().subscribe((res: HttpResponse<SizeModel[]>) => (this.sizes = res.body || []));
      this._categoryService.query().subscribe((res: HttpResponse<CategoryModel[]>) => (this.categories = res.body || []));
      this._subCategoryService.query().subscribe((res: HttpResponse<SubCategoryModel[]>) => (this.subcategories = res.body || []));
      this._colourService.query().subscribe((res: HttpResponse<ColourModel[]>) => (this.colours = res.body || []));
      this._collectionService.query().subscribe((res: HttpResponse<Collection[]>) => (this.collections = res.body || []));
      this._productService.query().subscribe((res: HttpResponse<ProductModel[]>) => (this.products = res.body || []));
  }

  addNewProduct() {
    this.newProduct.name = this.newProductFormGroup.get('name').value;
    this.newProduct.description = this.newProductFormGroup.get('description').value;
    this.newProduct.price = this.newProductFormGroup.get('price').value;
    this.newProduct.madeOf = this.newProductFormGroup.get('madeOf').value;
    this.newProduct.material = this.newProductFormGroup.get('material').value;
    this.newProduct.image1 = this.newProductFormGroup.get('image1').value;
    this.newProduct.image1ContentType = this.newProductFormGroup.get('image1ContentType').value;
    this.newProduct.image2 = this.newProductFormGroup.get('image2').value;
    this.newProduct.image2ContentType = this.newProductFormGroup.get('image2ContentType').value;
    this.newProduct.image3 = this.newProductFormGroup.get('image3').value;
    this.newProduct.image3ContentType = this.newProductFormGroup.get('image3ContentType').value;
    this.newProduct.image4 = this.newProductFormGroup.get('image4').value;
    this.newProduct.image4ContentType = this.newProductFormGroup.get('image4ContentType').value;
    this.newProduct.image5 = this.newProductFormGroup.get('image5').value;
    this.newProduct.image5ContentType = this.newProductFormGroup.get('image5ContentType').value;
    this._productService.create(this.newProduct).subscribe(next => {
      this.info('Товар успішно додано.');
      this.router.navigateByUrl('/home/products');
    }, error => {
      console.error(error);
    })
  }

  changeSelectColors(e: MatSelectionListChange) {
    if (e.option.selected) {
      this.newProduct.colours.push(e.option.value);
      // this.newProduct.colours = e.option.value;
      console.log(this.newProduct.colours);
    }
  }

  selectCollection(event: MatRadioChange) {
    if (event.source.checked) {
      // this.newSubCategory.category.id = event.value.id;
      this.newProduct.collection = event.value;
    }
  }

  changeSelectSizes(e: MatSelectionListChange) {
    if (e.option.selected) {
      this.newProduct.sizes.push(e.option.value);
      // this.newProduct.colours = e.option.value;
      console.log(this.newProduct.sizes);
    }
  }

  changeSelectCategories(e: MatSelectionListChange) {
    if (e.option.selected) {
      this.newProduct.categories.push(e.option.value);
      // this.newProduct.colours = e.option.value;
      console.log(this.newProduct.categories);
    }
  }

  changeSelectSubCategories(e: MatSelectionListChange) {
    if (e.option.selected) {
      this.newProduct.subCategories.push(e.option.value);
      // this.newProduct.colours = e.option.value;
      console.log(this.newProduct.subCategories);
    }
  }

  changeProducts(e: MatSelectionListChange) {
    if (e.option.selected) {
      this.newProduct.suggestedProducts.push(e.option.value);
      // this.newProduct.colours = e.option.value;
      console.log(this.newProduct.suggestedProducts);
    }
  }



  changeImage(e, file: string) {
    // console.log(e);
    if (e && e.target && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      if(file=='image1') {
        this.newProduct = e.target.files[0];
        this.newProduct.name = e.target.files[0].name;
        this.newProduct.image1ContentType = e.target.files[0].type;
      } else  if(file=='image2') {
        this.newProduct.image2 = e.target.files[0].name;
        this.newProduct.image2ContentType = e.target.files[0].type;
      } else  if(file=='image3') {
        this.newProduct.image3 = e.files[0].target.name;
        this.newProduct.image3ContentType = e.files[0].target.type;
      }  else  if(file=='image4') {
        this.newProduct.image4 = e.files[0].target.name;
        this.newProduct.image4ContentType = e.files[0].target.type;
      }  else  if(file=='image5') {
        this.newProduct.image5 = e.files[0].target.name;
        this.newProduct.image5ContentType = e.files[0].target.type;
      }

    }
    // let i = e.target;
    // if (i.files && i.files.length > 0) {
    //   this._resourceService.createAndAddToCar(i.files[0], car.id).subscribe(next => {
    //     this.init();
    //   }, error => {
    //     console.error(error);
    //   });
    // }
  }

  openMore(id: string, idSvg: string) {
    document.getElementById(id).classList.toggle('display-block');
    document.getElementById(idSvg).classList.toggle('transform180deg');
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


  byteSize(base64String: string): string {
    return this.formatAsBytes(this.size(base64String));
  }

  private endsWith(suffix: string, str: string): boolean {
    return str.includes(suffix, str.length - suffix.length);
  }

  private paddingSize(value: string): number {
    if (this.endsWith('==', value)) {
      return 2;
    }
    if (this.endsWith('=', value)) {
      return 1;
    }
    return 0;
  }

  private size(value: string): number {
    return (value.length / 4) * 3 - this.paddingSize(value);
  }

  private formatAsBytes(size: number): string {
    return size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    console.log(this.newProductFormGroup.get('image1').value);
    console.log(this.newProductFormGroup.get('image1ContentType').value);
    this.newProductFormGroup.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }


  setFileData(event: Event, field: string, isImage: boolean): void {
    this.loadFileToForm(event, this.newProductFormGroup, field, isImage).subscribe(null, (err: Error) => {
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

}
