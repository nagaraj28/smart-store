import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { URL } from 'src/config/config';
import { Products } from '../../../products/productcard/products';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartlistService {
  userid = '61a90be83a201bfb11a743db';
  cartProducts: any[] = [];
  cartProductsWithDetails:any=[]; 
  addressToDeliver!:any;
  constructor(private http: HttpClient) {}
  
  /* 
  get cart items
  */

  getCart(): Observable<Products[]> {
    return this.http
      .get<Products[]>(URL + 'ecommerceuser/getcart/' + this.userid)
      .pipe(
        tap((data: any) => {
          // console.log(data);
          if(data.data && data.data.length<=0)
          this.cartProducts =[];
          else
          this.cartProducts = data.data[0].cartproducts;
        }),
        catchError(this.handleError)
      );
  }

  /*
  get cart products
  */
  getCartlistProducts(productids: any[]): Observable<Products[]> {
    productids = productids.map((product) => product.productid);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http
      .post<Products[]>(
        URL + 'products/productdetails',
        { productids: productids },
        { headers: headers }
      )
      .pipe(
        tap((data: any) => {
          // console.log(data);
          // this.cartProducts = data.products;
          this.cartProductsWithDetails= data.products;
        }),
        catchError(this.handleError)
      );
  }

  /*
    remove item to cart
    */
  removeFromCart(productid: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        userid: '61a90be83a201bfb11a743db',
        productid: productid,
      },
    };

    return this.http
      .delete<any>(URL + 'ecommerceuser/deletefromcart', options)
      .pipe(
        tap((data: any) => {
          console.log('delete cart console message', data);
        }),
        catchError((err) => this.handleError(err))
      );
  }

  /*
    modify item to cart
    */
  modifyCart(data: string, quantity: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    const body = {
      userid: '61a90be83a201bfb11a743db',
      productid: data,
      quantity: quantity,
    };
    return this.http
      .put<any>(URL + 'ecommerceuser/updatecart', body, { headers: headers })
      .pipe(
        tap((data:any) =>{console.log('modify cart console message', data);
        const productIdsList = data.data.cartproducts.map((product:any)=>product.productid);
        // this.getCartlistProducts(productIdsList)
      }),
        catchError((err) => this.handleError(err))
      );
  }

  /*
  delete all items from cart
  */
  deleteAllProductsFromCart():Observable<any>{
    const userid = '61a90be83a201bfb11a743db';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  return  this.http.delete<any>(URL+"ecommerceuser/deleteallcart/"+userid, options).pipe(
      tap((data:any)=>{
        console.log("all items deleted from cart after placing order...");
      }),
      catchError(this.handleError)
    );
  }
  private handleError(httpError: HttpErrorResponse): Observable<any> {
    console.log(httpError);
    const errorMessage ='some error occured in modifying cart product,please refresh ';
    return throwError(errorMessage);
  }
}
