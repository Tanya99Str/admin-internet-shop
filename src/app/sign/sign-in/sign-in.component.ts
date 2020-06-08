import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Login} from '../../shared/service/models/login.model';
import {LoginService} from '../../shared/service/backend/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInFormGroup: FormGroup;
  hide = true;
  logUser: Login = new Login();

  constructor(private _formBuilder: FormBuilder, public router: Router, public loginService: LoginService) {
  }

  ngOnInit() {
    this.signInFormGroup = this._formBuilder.group({
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  open(u: string) {
    this.router.navigate(['sign', u]);
  }

  login(): void {
    this.logUser.username = this.signInFormGroup.get('username').value;
    this.logUser.password = this.signInFormGroup.get('password').value;
    this.logUser.rememberMe = false;
    console.log(this.logUser);
    this.loginService.login(this.logUser).subscribe(next => {
      console.log(next);
      this.router.navigate(['']);
    }, error => {
      console.error(error);
    });
  }

}
