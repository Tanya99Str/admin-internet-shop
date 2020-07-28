import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-update',
  templateUrl: './confirm-update.component.html',
  styleUrls: ['./confirm-update.component.css']
})
export class ConfirmUpdateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

}
