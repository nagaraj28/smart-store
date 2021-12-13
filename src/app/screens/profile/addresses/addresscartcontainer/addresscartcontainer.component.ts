import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/screens/login/login.service';
import { AddressesService } from '../addresses.service';
@Component({
  selector: 'app-addresscartcontainer',
  templateUrl: './addresscartcontainer.component.html',
  styleUrls: ['./addresscartcontainer.component.css']
})
export class AddresscartcontainerComponent implements OnInit {
  constructor(private addressesService:AddressesService,private loginService:LoginService) { }
  addressList!:any;
  addressSelected!:any;
  showAddressDialog!:boolean;
  loggedUser!:any;
  ngOnInit(): void {
    if(this.loggedUser?.userid)
    this.getAddresses(this.loggedUser.userid);
  }
  ngDoCheck(){
    this.addressList = this.addressesService.addressList;
      // this.addressesService.setCurrentAddress(this.addressSelected);
    if(this.addressesService.isAddressSelectedDialogOpen!==this.showAddressDialog)
    this.showAddressDialog = this.addressesService.isAddressSelectedDialogOpen;
    if(this.loggedUser !== this.loginService.loggedUserDetails){
      this.loggedUser = this.loginService.loggedUserDetails;
      this.getAddresses(this.loggedUser.userid);
    }
    this.addressSelected = this.addressesService.addressSelectedValue;
  }

  addNewAddress():void{
    this.addressesService.setCurrentForm({});
    this.addressesService.setDialogTitle("add");
    this.addressesService.openDialog();
  }
  getAddresses(userid:string){
    this.addressesService.getAddresses(userid).subscribe((data:any)=>{
      this.addressList = data.data[0].addresslist;
      if(this.addressList&&this.addressList.length>0)
      this.addressesService.setCurrentAddress(this.addressList[0]);
    },
    (err:any)=>{
      console.log("error getting addresses list")
    });
  }
  addressChanged(){
    console.log(this.addressSelected);
    this.addressesService.setCurrentAddress(this.addressSelected);
  }
  closeDialog(){
   this.addressesService.closeIsAddressSelectedDialog();
  }
  openDialog(){
    this.addressesService.openIsAddressSelectedDialog();
   }
 
}
