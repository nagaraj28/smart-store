import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  isDialogOpen:boolean=false;
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
  getAddresses(){
  }

}
