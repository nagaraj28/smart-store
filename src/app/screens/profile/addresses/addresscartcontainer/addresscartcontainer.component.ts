import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../addresses.service';

@Component({
  selector: 'app-addresscartcontainer',
  templateUrl: './addresscartcontainer.component.html',
  styleUrls: ['./addresscartcontainer.component.css']
})
export class AddresscartcontainerComponent implements OnInit {

  constructor(private addressesService:AddressesService) { }
  addressList!:any;
  addressSelected!:any;
  showAddressDialog!:boolean;


  ngOnInit(): void {
    this.getAddresses();
    this.addressList = this.addressesService.addressList;
  }
  ngDoCheck(){
    this.addressList = this.addressesService.addressList;
      // this.addressesService.setCurrentAddress(this.addressSelected);
    if(this.addressesService.isAddressSelectedDialogOpen!==this.showAddressDialog)
    this.showAddressDialog = this.addressesService.isAddressSelectedDialogOpen;
  }

  addNewAddress():void{
    this.addressesService.setCurrentForm({});
    this.addressesService.setDialogTitle("add");
    this.addressesService.openDialog();
  }
  getAddresses(){
    this.addressesService.getAddresses().subscribe((data:any)=>{
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
