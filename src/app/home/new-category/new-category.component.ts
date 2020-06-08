import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Collection} from '../../shared/service/models/collection.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionService} from '../../shared/service/backend/collection.service';
import {MatSnackBar} from '@angular/material';
import {CategoryService} from '../../shared/service/backend/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  newCategoryFormGroup: FormGroup;
  newCategory: Collection = new Collection();

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              private _categoryService: CategoryService,
              private _snackBar: MatSnackBar) { }

  save() {
    this.newCategory.name = this.newCategoryFormGroup.get('name').value;
    this._categoryService.create(this.newCategory).subscribe(next => {
      this.info('Дані успішно додано.');
      this.router.navigateByUrl('/home/categories');
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  cancel() {
    this.newCategoryFormGroup.reset();
  }


  ngOnInit() {
    this.newCategoryFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
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
