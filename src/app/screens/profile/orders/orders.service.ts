import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {URL} from "src/config/config";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }
  /*
 get all the orders
 */
 getAllOrders(userid:string):Observable<any>{
  return this.http.get<any>(URL+"ecommerceuser/getorders/"+userid).pipe(
    tap((data:any)=>{
      console.log("fetch all the orders",data);
    }),
    catchError(this.handleError)
  );
 }

  /* 
  place order 
  */
  placeOrder(addressDelivered:any,orderedProducts:any,userid:string):Observable<any[]>{
    const headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    const userId=userid;
    const body = {
      userid:userId,
      products:orderedProducts,
      address:addressDelivered
    }
    return this.http.post<any>(URL+"ecommerceuser/placeorder",body,{headers:headers}).pipe(
      tap((data:any)=>{
        console.log("order placed successfully");
      }),
      catchError(this.handleError)
      );
  }

  private handleError(httpError: HttpErrorResponse): Observable<any> {
    const errorMessage =
      'some error occured in  place order service  ';
    return throwError(errorMessage);
  }

}
