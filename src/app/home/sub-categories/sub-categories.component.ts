import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../shared/service/models/category.model';
import {CategoryService} from '../../shared/service/backend/category.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {SubCategoryService} from '../../shared/service/backend/sub-category.service';
import {HttpResponse} from '@angular/common/http';
import {Collection} from '../../shared/service/models/collection.model';
import {SubCategoryModel} from '../../shared/service/models/sub-category.model';
import {MatRadioChange} from '@angular/material';
import {SizeModel} from '../../shared/service/models/size.model';
import {ConfirmDeleteComponent} from '../dialogs/confirm-delete/confirm-delete.component';
import {ConfirmUpdateComponent} from '../dialogs/confirm-update/confirm-update.component';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {

  canEdit: boolean = false;
  categories: CategoryModel[] = [];
  subCategory: SubCategoryModel[] = [];

  constructor(private _subCategoryService: SubCategoryService,
              private _categoryService: CategoryService,
              private _snackBar: MatSnackBar,
              private  activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              public router: Router,
              public dialog: MatDialog) {
    this.init();
  }

  init() {
    this._subCategoryService.query().subscribe((res: HttpResponse<Collection[]>) => (this.subCategory = res.body || []));
    this._categoryService.query().subscribe((res: HttpResponse<Collection[]>) => (this.categories = res.body || []));
  }

  confirmDelete(one: SubCategoryModel) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(one);
      }
    });
  }

  confirmChange(one: SubCategoryModel) {
    const dialogRef = this.dialog.open(ConfirmUpdateComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update(one);
      }
    });
  }

  update(one: SubCategoryModel) {
    this._subCategoryService.update(one).subscribe(next => {
      this.info('Дані успішно оновлено.');
      this.canEdit = !this.canEdit;
      this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  selectCategory(event: MatRadioChange, subCategory: SubCategoryModel) {
    if (event.source.checked) {
      subCategory.category.id = event.value.id;
      subCategory.category.name = event.value.name;
    }
  }

  delete(one: SubCategoryModel) {
    this._subCategoryService.delete(one.id).subscribe(next => {
      this.info('Дані успішно видалено.');
      this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
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

  ngOnInit() {
  }

}
