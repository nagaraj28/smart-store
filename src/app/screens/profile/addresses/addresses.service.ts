import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {URL} from 'src/config/config';
import { HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  addressList!:any;
  isDialogOpen:boolean=false;
  currentFormEditDetails!:any;
  isAddressSelectedDialogOpen!:boolean;
  addressSelectedValue!:any;

  constructor(private http:HttpClient) { }
  dialogBoxTitle:string="";
  openDialog():void{
    this.isDialogOpen=true;
  }
  closeDialog():void{
    this.isDialogOpen=false;
  }
  setDialogTitle(value:string):void{
      this.dialogBoxTitle = value;
  }
  setCurrentForm(address:any){
    this.currentFormEditDetails = address;
    // console.log(this.currentFormEditDetails);
  }
  closeIsAddressSelectedDialog(){
    this.isAddressSelectedDialogOpen =false;
  }
  openIsAddressSelectedDialog(){
    this.isAddressSelectedDialogOpen =true;
  }

  getAddresses(userid:string){
     return this.http.get(URL+"ecommerceuser/getaddresses/"+userid).pipe(
        tap((data:any)=>{
          // console.log("addresses  ",data);
          this.addressList = data.data[0].addresslist;
        }),
        catchError((err=>this.handleError(err))
      ));
  }

  /*
   adds new address
  */

  addAddress(addressFormValues:any,userid:string):Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    const addressBody= {
    ...addressFormValues,
      userid:userid
    }
    console.log(addressBody)
     return this.http.post(URL+"ecommerceuser/addaddress",addressBody,{headers:headers}).pipe(
        tap((data:any)=>{
          console.log("address added successfully");
          this.closeDialog();
        }),
        catchError((err=>this.handleError(err))
      ));
  }

   /*
   update new address
  */

   updateAddress(addressFormValues:any,addressId:string,userid:string){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    const addressBody= {
      ...addressFormValues,
        userid:userid,
        _id:addressId
      }
      // console.log(addressBody)
      return this.http.put(URL+"ecommerceuser/editaddress",addressBody,{headers:headers}).pipe(
        tap((data:any)=>{
          console.log("address updated successfully")
          this.closeDialog();
        }),
        catchError((err=>this.handleError(err))
      ));
  }

    /*
   delete new address
  */
   deleteAddress(addressId:string,userid:string):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        userid: userid,
        _id:addressId
      },
    };

   return   this.http.delete(URL+"ecommerceuser/deleteaddress",options).pipe(
        tap((data:any)=>{
          console.log("address deleted successfully")
        }),
        catchError((err=>this.handleError(err))
      ));
  }

  setCurrentAddress(value:any){
    this.addressSelectedValue = value;
    console.log(this.addressSelectedValue)
  }
  private handleError(httpError:HttpErrorResponse):Observable<any>{
    console.log("error in address")
        const errorMessage = "some error occured in aadding address,please try again ";
        return throwError(errorMessage);
  }
}