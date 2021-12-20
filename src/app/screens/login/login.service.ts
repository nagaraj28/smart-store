import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {URL} from "src/config/config";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private router:Router) { }
  loggedUserDetails!:any;
  /* 
  login 
  */
  login(loginForm:any):Observable<any>{
    const headers = new HttpHeaders();
    headers.set("Content-Type","application/json");
    return this.http.post<any>(URL+"ecommerceuser/login",loginForm,{headers:headers}).pipe(
      tap((data:any)=>console.log("login successful",data)),
      catchError(this.handleError)
    );
  }

    /* 
  register new user 
  */
  register(registerForm:any):Observable<any>{
    const headers = new HttpHeaders();
    headers.set("Content-Type","application/json");
    return this.http.post<any>(URL+"ecommerceuser/signup",registerForm.value,{headers:headers}).pipe(
      tap((data:any)=>console.log("registered...")),
      catchError(this.handleError)
    );
  }

  /*
  get details from token

  */
  validateToken(token:any):Observable<any>{
     const headers = new HttpHeaders();
     const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token':token
      })
    }
    //  console.log(headers);
    return this.http.get<any>(URL+"users/tokenvalid",options).pipe(
      tap((data:any)=>{
        // console.log("token validation successful",data);
        if(data.userid){
          this.loggedUserDetails = data;
        }
        else{
          localStorage.removeItem("x-auth-token");
        }
      }),
     catchError(this.handleError)
    );
  }

    /*
    logout user 
    */
    logout():void{
     this.loggedUserDetails = {};
    localStorage.removeItem("x-auth-token");
    this.router.navigate(["/"]);
   }
  private handleError(httpError:HttpErrorResponse):Observable<any>{
    console.log("error in address",httpError);
        const errorMessage = "error login service";
        return throwError(errorMessage);
  }
}
