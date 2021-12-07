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
  /*
  get wishlist products id's-array
  */
  getWishlist():Observable<Products[]>{
    return this.http.get<Products[]>(URL+"ecommerceuser/getwishlist/"+this.userid).pipe(
      tap((data:any)=>{
        // console.log(data.data[0].wishlistproducts);        
      }),
      catchError(this.handleError)
    );
  }
  /*
  get wishlist products details
  */
  getWishlistProducts(productids:any[]):Observable<Products[]>{
    console.log("getWishlistproducts util")
    productids = productids.map(product=>product.productid);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Products[]>(URL+"products/productdetails",{productids:productids},{headers:headers}).pipe(
      tap((data:any)=>{
        // console.log(data);
        console.log("getWishlistproducts util")
        this.wishListProducts = data.products;
      }),
      catchError(this.handleError)
    );
  }
   /*
    remove item to wishlist
    */
    removeFromWishlist(productid:string):Observable<any>{
      // const headers = new HttpHeaders();
      // headers.set('Content-Type', 'application/json; charset=utf-8');
      // console.log(data)
            const options = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
              body: {
                userid: "61a90be83a201bfb11a743db",
                productid: productid,
              },
            };
    
       return this.http.delete<any>(URL+'ecommerceuser/deletefromwishlist',options).pipe(
          tap((data:any)=>{
            console.log("delete wishlist console message",data);
            this.getWishlist().subscribe((data:any)=>{
              this.getWishlistProducts(data.data[0].wishlistproducts).subscribe((data:any)=>{
                console.log("updating wishlist after removing success",data);
              },
              (err:any)=>{
                console.log("error fetching  the wishlist data after removal")
              });
            },
            (err:any)=>{
              console.log("error fetching  the wishlist data id's after removal")
            } 
            );
          }),
          catchError(err=>this.handleError(err))
          );
    }

  private handleError(httpError:HttpErrorResponse):Observable<any>{
    const errorMessage = "some error occured in fetching products,please refresh ";
    return throwError(errorMessage);
}
}
