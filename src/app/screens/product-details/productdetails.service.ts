import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Products } from '../products/productcard/products';
import {URL} from "src/config/config"
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {
  constructor(private http:HttpClient) { }
  getProduct(productId:string):Observable<Products>{
    return this.http.get<Products>(URL+"products/product/"+productId).pipe(
      tap(((data:any)=>{
        // console.log(data.products);
      })),
      catchError(this.handleError)
    );
  }
  private  handleError(err:HttpErrorResponse):Observable<any>{
    let errMsg="error in search box";
    return throwError(errMsg);
  }
}
