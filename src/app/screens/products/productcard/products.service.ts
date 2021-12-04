import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http:HttpClient) { }
  getAllProducts():Observable<Products[]>{
        return this.http.get<Products[]>(URL+"products").pipe(
          tap((data)=>console.log("products fetched...",data)),
          catchError(this.handleError)
        );
  }
  private handleError(httpError:HttpErrorResponse):Observable<any>{
        const errorMessage = "some error occured in fetching products,please refresh ";
        return throwError(errorMessage);
  }
}
