import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {URL} from "src/config/config";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  /* 
  login 
  */
  login(loginForm:any):Observable<any>{
    const headers = new HttpHeaders();
    headers.set("Content-Type","application/json");
    return this.http.post<any>(URL+"ecommerceuser/login",loginForm,{headers:headers}).pipe(
      tap((data:any)=>console.log("login successful")),
      catchError(this.handleError)
    );
  }

    /* 
  register new user 
  */
  register(registerForm:any):Observable<any>{
    const headers = new HttpHeaders();
    headers.set("Content-Type","application/json");
    return this.http.post<any>(URL+"ecommerceuser/register",registerForm,{headers:headers}).pipe(
      tap((data:any)=>console.log("registered...")),
      catchError(this.handleError)
    );
  }

  /*
  get details from token

  */
  validateToken(token:any):Observable<any>{
     const headers = new HttpHeaders();
     headers.set('Content-Type',"application/json");
     headers.set("x-auth-token",token);
    return this.http.get<any>(URL+"users/tokenvalid").pipe(
      tap((data:any)=>{
        console.log("token validation successful")
      }),
     catchError(this.handleError)
    );
  }

  private handleError(httpError:HttpErrorResponse):Observable<any>{
    console.log("error in address",httpError);
        const errorMessage = "error login service";
        return throwError(errorMessage);
  }
}
