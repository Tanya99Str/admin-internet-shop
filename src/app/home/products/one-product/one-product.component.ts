import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/service/models/product.model';
import {ProductService} from '../../../shared/service/backend/product.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit {

  @Input() product: ProductModel;

  constructor(private _productService: ProductService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  delete() {
    this._productService.delete(this.product.id).subscribe(next => {
      this.info('Товар успішно видалено.');
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
