import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {URL} from "src/config/config";
import {Products} from "../../../products/productcard/products";


@Injectable({
  providedIn: 'root'
})
export class CartlistService {
  userid="61a90be83a201bfb11a743db";
  constructor(private http:HttpClient) { }
  getcart():Observable<Products[]>{
    return this.http.get<Products[]>(URL+"ecommerceuser/getcart/"+this.userid).pipe(
      tap(data=>{
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }
  private handleError(httpError:HttpErrorResponse):Observable<any>{
    const errorMessage = "some error occured in fetching products,please refresh ";
    return throwError(errorMessage);
}
}


