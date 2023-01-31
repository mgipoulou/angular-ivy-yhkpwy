import { Component, OnInit } from '@angular/core';
import { CartService, Config, ShippingCosts } from '../cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
})
export class ShippingComponent implements OnInit {
  
  shippingCosts: ShippingCosts[] | undefined;
  config: Config | undefined;

  headers: string[] = [];
  error: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.showConfig_v1();
    this.showShippingCosts();
  }

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = [];
  }

  showConfig_v1() {
    this.cartService.getConfig().subscribe(
      (data: Config) =>
        (this.config = {
          heroesUrl: data.heroesUrl,
          textfile: data.textfile,
          date: data.date,
        })
    );
  }

  showShippingCosts() {
    this.cartService.getShippingPrice().subscribe(
      (data: ShippingCosts[]) =>
        (this.shippingCosts = data)
    );
  }
}
