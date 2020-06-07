import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ColourService} from '../../shared/service/backend/colors.service';
import {CategoryService} from '../../shared/service/backend/category.service';
import {SubCategoryService} from '../../shared/service/backend/sub-category.service';
import {SizeService} from '../../shared/service/backend/size.service';
import {ProductService} from '../../shared/service/backend/product.service';
import {MatSnackBar} from '@angular/material';
import {CollectionService} from '../../shared/service/backend/collection.service';
import {Collection} from '../../shared/service/models/collection.model';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.css']
})
export class NewCollectionComponent implements OnInit {

  newCollectionFormGroup: FormGroup;
  newCollection: Collection = new Collection();

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              private _collectionService: CollectionService,
              private _snackBar: MatSnackBar,
              private  activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.newCollectionFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  save() {
    this.newCollection.name = this.newCollectionFormGroup.get('name').value;
    this._collectionService.create(this.newCollection).subscribe(next => {
      this.info('Дані успішно додано.');
      this.router.navigateByUrl('/home/products');
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });

  }

  cancel() {
    this.newCollectionFormGroup.reset();
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
