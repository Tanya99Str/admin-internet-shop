import { Component, OnInit } from '@angular/core';
import {ColourService} from '../../shared/service/backend/colors.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Collection} from '../../shared/service/models/collection.model';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  canEdit: boolean = false;

  newProductFormGroup: FormGroup;
  collections: Collection[] = [];

  constructor( private _collectionService: ColourService,
               private _snackBar: MatSnackBar,
               private  activatedRoute: ActivatedRoute,
               private _formBuilder: FormBuilder,
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
    })
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
