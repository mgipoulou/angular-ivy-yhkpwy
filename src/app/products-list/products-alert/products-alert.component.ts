import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../assets/products';

@Component({
  selector: 'app-products-alert',
  templateUrl: './products-alert.component.html',
  styleUrls: ['./products-alert.component.css'],
})
export class ProductsAlertComponent implements OnInit {
  @Input() product!: Product;

  ngOnInit() {}

  notify() {
    window.alert('The product has been notified!');
  }
}
