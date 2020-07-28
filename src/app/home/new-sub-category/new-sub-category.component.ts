import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Collection} from '../../shared/service/models/collection.model';
import {SubCategoryModel} from '../../shared/service/models/sub-category.model';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/service/backend/category.service';
import {MatDialog, MatRadioChange, MatSnackBar} from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import {CategoryModel} from '../../shared/service/models/category.model';
import {SubCategoryService} from '../../shared/service/backend/sub-category.service';
import {ConfirmCreateComponent} from '../dialogs/confirm-create/confirm-create.component';

@Component({
  selector: 'app-new-sub-category',
  templateUrl: './new-sub-category.component.html',
  styleUrls: ['./new-sub-category.component.css']
})
export class NewSubCategoryComponent implements OnInit {

  newSubCategoryFormGroup: FormGroup;
  newSubCategory: SubCategoryModel = new SubCategoryModel();
  categories: CategoryModel[] = [];

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              private _categoryService: CategoryService,
              private _subCategoryService: SubCategoryService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
    this.init();
  }

  confirmCreate() {
    const dialogRef = this.dialog.open(ConfirmCreateComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save();
      }
    });
  }

  selectCategory(event: MatRadioChange) {
    if (event.source.checked) {
      // this.newSubCategory.category.id = event.value.id;
      this.newSubCategory.category = event.value;
    }
  }

  init() {
    this._categoryService.query().subscribe((res: HttpResponse<Collection[]>) => (this.categories = res.body || []));
  }

  save() {
    this.newSubCategory.name = this.newSubCategoryFormGroup.get('name').value;
    this._subCategoryService.create(this.newSubCategory).subscribe(next => {
      this.info('Дані успішно додано.');
      this.router.navigateByUrl('/home/sub-categories');
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }


  cancel() {
    this.newSubCategoryFormGroup.reset();
  }

  ngOnInit() {
    this.newSubCategoryFormGroup = this._formBuilder.group({
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
