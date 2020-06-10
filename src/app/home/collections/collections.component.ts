import {Component, OnInit} from '@angular/core';
import {ColourService} from '../../shared/service/backend/colors.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Collection} from '../../shared/service/models/collection.model';
import {HttpResponse} from '@angular/common/http';
import {CollectionService} from '../../shared/service/backend/collection.service';
import {CategoryModel} from '../../shared/service/models/category.model';
import {ConfirmDeleteComponent} from '../dialogs/confirm-delete/confirm-delete.component';
import {ConfirmUpdateComponent} from '../dialogs/confirm-update/confirm-update.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  canEdit: boolean = false;
  collections: Collection[] = [];

  constructor(private _collectionService: CollectionService,
              private _snackBar: MatSnackBar,
              private  activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              public dialog: MatDialog,
              public router: Router) {
    this.init();
  }

  ngOnInit() {
  }

  update(one: Collection) {
    this._collectionService.update(one).subscribe(next => {
      this.info('Дані успішно оновлено.');
      this.canEdit = !this.canEdit;
      this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  confirmChange(one: Collection) {
    const dialogRef = this.dialog.open(ConfirmUpdateComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update(one);
      }
    });
  }

  confirmDelete(one: Collection) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(one);
      }
    });
  }

  delete(one: Collection) {
    this._collectionService.delete(one.id).subscribe(next => {
      this.info('Дані успішно видалено.');
      this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  init() {
    this._collectionService.query().subscribe((res: HttpResponse<Collection[]>) => (this.collections = res.body || []));
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
