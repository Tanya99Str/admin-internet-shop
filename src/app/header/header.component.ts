import { Component, OnInit } from '@angular/core';
import {ConfirmExitComponent} from '../home/dialogs/confirm-exit/confirm-exit.component';
import {LoginService} from '../shared/service/backend/login.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public router: Router,
              private _loginService: LoginService) { }

  confirmExit() {
    const dialogRef = this.dialog.open(ConfirmExitComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._loginService.logout();
        this.router.navigateByUrl('/sign/in');
      }
    });
  }

  ngOnInit() {
  }

}
