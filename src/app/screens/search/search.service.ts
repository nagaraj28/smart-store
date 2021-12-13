import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Products } from '../products/productcard/products';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http:HttpClient) { }

  getSearchProducts(value:string):Observable<any>{
    return this.http.get<Products[]>(URL+"products").pipe(
      tap((data:any)=>{
      
      }),
      catchError(this.handleError)
    );
  }


  
  private handleError(httpError:HttpErrorResponse):Observable<any>{
    console.log("error ")
        const errorMessage = "some error occured in fetching products,please refresh ";
        return throwError(errorMessage);
  }

}
