import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  aboutFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.aboutFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      material: ['', [Validators.required]],
      description: ['', [Validators.required]],
      collection: ['', [Validators.required]],
      composition: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

}
