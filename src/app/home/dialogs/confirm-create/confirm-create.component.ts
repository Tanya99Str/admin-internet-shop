import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-create',
  templateUrl: './confirm-create.component.html',
  styleUrls: ['./confirm-create.component.css']
})
export class ConfirmCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

}
