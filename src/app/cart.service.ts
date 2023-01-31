import { Injectable } from '@angular/core';
import { Product } from '../assets/products';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

export interface ShippingCosts {
  type: string;
  price: number;
}


@Injectable({
  providedIn: 'root',
})

export class CartService {
  
  items: Product[] = [];
  
  configUrl = 'assets/config.json';
  shippingUrl = 'assets/shipping.json';

  constructor(private http: HttpClient) {}

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrice(){
    return this.http.get<ShippingCosts[]>(this.shippingUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }


  getConfig() {
    return this.http.get<Config>(this.configUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

  }

  private handleError(error: HttpErrorResponse) {
 
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
