import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { AddressesService } from './addresses.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  constructor(private addressesService:AddressesService,private loginService:LoginService) { }
  addressList!:any;
  loggedUser!:any;

  ngOnInit(): void {
    
  }
  ngDoCheck(){
    if(this.loggedUser !== this.loginService.loggedUserDetails){
      this.loggedUser = this.loginService.loggedUserDetails;
      if(this.loggedUser?.userid){
        this.getAddresses(this.loggedUser.userid);
      }
    }
    this.addressList = this.addressesService.addressList;
  }

  addNewAddress():void{
    this.addressesService.setCurrentForm({});
    this.addressesService.setDialogTitle("add");
    this.addressesService.openDialog();
  }
  getAddresses(userid:string){
    this.addressesService.getAddresses(userid).subscribe((data:any)=>{
      this.addressList = data.data[0].addresslist;
    },
    (err:any)=>{
      console.log("error getting addresses list")
    });
  }
}
