import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-exit',
  templateUrl: './confirm-exit.component.html',
  styleUrls: ['./confirm-exit.component.css']
})
export class ConfirmExitComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmExitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

}
