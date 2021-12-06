import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {URL} from "src/config/config";
import { Products } from '../products/productcard/products';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  userid="61a90be83a201bfb11a743db";

  wishListProducts:Products[]=[];
  constructor(private http:HttpClient) { }
  getWishlist():Observable<Products[]>{
    return this.http.get<Products[]>(URL+"ecommerceuser/getwishlist/"+this.userid).pipe(
      tap((data:any)=>{
        // console.log(data.data[0].wishlistproducts);        
      }),
      catchError(this.handleError)
    );
  }
  
  getWishlistProducts(productids:any[]):Observable<Products[]>{
    productids = productids.map(product=>product.productid);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Products[]>(URL+"products/productdetails",{productids:productids},{headers:headers}).pipe(
      tap((data:any)=>{
        // console.log(data);
        this.wishListProducts = data.products;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(httpError:HttpErrorResponse):Observable<any>{
    const errorMessage = "some error occured in fetching products,please refresh ";
    return throwError(errorMessage);
}
}
