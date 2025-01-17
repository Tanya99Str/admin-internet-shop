import { Component, OnInit } from '@angular/core';
import {Collection} from '../../shared/service/models/collection.model';
import {CategoryModel} from '../../shared/service/models/category.model';
import {CollectionService} from '../../shared/service/backend/collection.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CategoryService} from '../../shared/service/backend/category.service';
import {HttpResponse} from '@angular/common/http';
import {ConfirmDeleteComponent} from '../dialogs/confirm-delete/confirm-delete.component';
import {ConfirmUpdateComponent} from '../dialogs/confirm-update/confirm-update.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  canEdit: boolean = false;
  category: CategoryModel[] = [];

  constructor(private _categoryService: CategoryService,
              private _snackBar: MatSnackBar,
              private  activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              public dialog: MatDialog,
              public router: Router) {
    this.init();
  }

  update(one: CategoryModel) {
    this._categoryService.update(one).subscribe(next => {
      this.info('Дані успішно оновлено.');
      this.canEdit = !this.canEdit;
      this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  confirmDelete(one: CategoryModel) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(one);
      }
    });
  }

  confirmChange(one: CategoryModel) {
    const dialogRef = this.dialog.open(ConfirmUpdateComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update(one);
      }
    });
  }
  
  delete(one: CategoryModel) {
    this._categoryService.delete(one.id).subscribe(next => {
      this.info('Дані успішно видалено.');
      this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  init() {
    this._categoryService.query().subscribe((res: HttpResponse<Collection[]>) => (this.category = res.body || []));
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
