import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Collection} from '../../shared/service/models/collection.model';
import {SizeModel} from '../../shared/service/models/size.model';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/service/backend/category.service';
import {MatSnackBar} from '@angular/material';
import {SizeService} from '../../shared/service/backend/size.service';

@Component({
  selector: 'app-new-size',
  templateUrl: './new-size.component.html',
  styleUrls: ['./new-size.component.css']
})
export class NewSizeComponent implements OnInit {

  newSizeFormGroup: FormGroup;
  newSize: SizeModel = new SizeModel();

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              private _sizeService: SizeService,

              private _snackBar: MatSnackBar) { }
  save() {
    this.newSize.value = this.newSizeFormGroup.get('name').value;
    this._sizeService.create(this.newSize).subscribe(next => {
      this.info('Дані успішно додано.');
      this.router.navigateByUrl('/home/size');
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  cancel() {
    this.newSizeFormGroup.reset();
  }

  ngOnInit() {
    this.newSizeFormGroup = this._formBuilder.group({
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
