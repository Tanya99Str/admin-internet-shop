import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInFormGroup: FormGroup;
  hide = true;

  constructor(private _formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.signInFormGroup = this._formBuilder.group({
      password: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });
  }

  open(u: string) {
    this.router.navigate(['sign', u]);
  }

}
