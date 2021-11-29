import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {
  constructor(private http:HttpClient) { }
  getProduct():Observable<any>{
    return this.http.get<any>("../../.././assets/productdetails.json").pipe(
      tap((data=>console.log(data))),
      catchError(this.handleError)
    );
  }
  private  handleError(err:HttpErrorResponse):Observable<any>{
    let errMsg="error in search box";
    return throwError(errMsg);
  }
}
