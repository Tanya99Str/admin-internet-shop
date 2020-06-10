import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionService} from '../../shared/service/backend/collection.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ColourService} from '../../shared/service/backend/colors.service';
import {ColourModel} from '../../shared/service/models/colour.model';
import {ConfirmCreateComponent} from '../dialogs/confirm-create/confirm-create.component';

@Component({
  selector: 'app-new-color',
  templateUrl: './new-color.component.html',
  styleUrls: ['./new-color.component.css']
})
export class NewColorComponent implements OnInit {

  newColorFormGroup: FormGroup;
  color: ColourModel = new ColourModel();

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              private _colourService: ColourService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              private  activatedRoute: ActivatedRoute) {
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

  save() {
    this.color.name = this.newColorFormGroup.get('name').value;
    this._colourService.create(this.color).subscribe(next => {
      this.info('Дані успішно додано.');
      this.router.navigateByUrl('/home/colors');
    }, error => {
      console.error(error);
      this.info('Виникла проблема. Спробуйте, будь ласка, пізніше.');
    });
  }

  cancel() {
    this.newColorFormGroup.reset();
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
    this.newColorFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

}
