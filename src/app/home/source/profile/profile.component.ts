import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hideOldPass = true;
  hideNewPass = true;
  hideRepNewPass = true;

  changePass: FormGroup;
  baseInfoFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) { }

  checkPasswords(group: FormGroup) {
    let pass = group.get('newPass').value;
    let repeatPassword = group.get('repeatNewPass').value;
    if (!repeatPassword) {
      group.get('repeatNewPass').setErrors({required: true});
      return;
    } else {
      group.get('repeatNewPass').setErrors(null);
    }
    if (pass !== repeatPassword) {
      group.get('repeatNewPass').setErrors({notSame: true});
    } else {
      group.get('repeatNewPass').setErrors(null);
    }
  }

  ngOnInit() {
    this.changePass = this._formBuilder.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      repeatNewPass: ['']
    }, {validators: this.checkPasswords});
    this.baseInfoFormGroup = this._formBuilder.group({
      name: new FormControl(),
      lastName: new FormControl(),
      middleName: new FormControl(),
      city: new FormControl(),
      birthday: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      postOffice: new FormControl()
    });
  }

}
