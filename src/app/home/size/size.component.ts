import { Component, OnInit } from '@angular/core';
import {SizeModel} from '../../shared/service/models/size.model';
import {HttpResponse} from '@angular/common/http';
import {Collection} from '../../shared/service/models/collection.model';
import {CategoryService} from '../../shared/service/backend/category.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {SizeService} from '../../shared/service/backend/size.service';
import {ConfirmDeleteComponent} from '../dialogs/confirm-delete/confirm-delete.component';
import {ColourModel} from '../../shared/service/models/colour.model';
import {ConfirmUpdateComponent} from '../dialogs/confirm-update/confirm-update.component';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {

  canEdit: boolean = false;
  size: SizeModel[] = [];

  constructor(private _sizeService: SizeService,
              private _snackBar: MatSnackBar,
              private  activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              public dialog: MatDialog,
              public router: Router) {
    this.init();
  }

  update(one: SizeModel) {
    this._sizeService.update(one).subscribe(next => {
      this.info('Дані успішно оновлено.');
      this.canEdit = !this.canEdit;
      this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  confirmDelete(one: SizeModel) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(one);
      }
    });
  }

  confirmChange(one: SizeModel) {
    const dialogRef = this.dialog.open(ConfirmUpdateComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update(one);
      }
    });
  }

  delete(one: SizeModel) {
    this._sizeService.delete(one.id).subscribe(next => {
      this.info('Дані успішно видалено.');
      this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  init() {
    this._sizeService.query().subscribe((res: HttpResponse<Collection[]>) => (this.size = res.body || []));
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
