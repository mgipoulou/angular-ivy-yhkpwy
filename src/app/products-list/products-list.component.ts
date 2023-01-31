import { Component, OnInit } from '@angular/core';
import { products } from '../../assets/products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products = products;

  ngOnInit() {}

  share() {
    window.alert('The product has been shared!');
  }
}
