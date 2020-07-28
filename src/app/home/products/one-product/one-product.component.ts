import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from '../../../shared/service/models/product.model';
import {ProductService} from '../../../shared/service/backend/product.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ColourModel} from '../../../shared/service/models/colour.model';
import {ConfirmDeleteComponent} from '../../dialogs/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit {

  @Input() product: ProductModel;
  @Output() productsChange = new EventEmitter();

  constructor(private _productService: ProductService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
    });
  }

  delete() {
    this._productService.delete(this.product.id).subscribe(next => {
      this.info('Товар успішно видалено.');
      this.productsChange.emit();
    }, error => {
      console.error(error);
    })
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
