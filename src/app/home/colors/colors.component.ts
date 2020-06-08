import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ColourModel} from '../../shared/service/models/colour.model';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ColourService} from '../../shared/service/backend/colors.service';
import {Collection} from '../../shared/service/models/collection.model';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

  canEdit: boolean = false;

  newColorFormGroup: FormGroup;
  colors: ColourModel[] = [];

  constructor(private _colourService: ColourService,
              private _snackBar: MatSnackBar,
              private  activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              public router: Router) {
    this.init();
  }

  update(one: Collection) {
    this._colourService.update(one).subscribe(next => {
      this.info('Дані успішно оновлено.');
      this.canEdit = !this.canEdit;
      this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  ngOnInit() {
  }

  delete(one: ColourModel) {
    this._colourService.delete(one.id).subscribe(next => {
      this.info('Дані успішно видалено.');
      this.init();
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  init() {
    this._colourService.query().subscribe((res: HttpResponse<Collection[]>) => (this.colors = res.body || []));
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
