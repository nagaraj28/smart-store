import { Component, OnInit } from '@angular/core';
import { AddressesService } from './addresses.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  constructor(private addressesService:AddressesService) { }
  addressList!:any;

  ngOnInit(): void {
    this.getAddresses();
    this.addressList = this.addressesService.addressList;
  }
  ngDoCheck(){
    this.addressList = this.addressesService.addressList;
  }

  addNewAddress():void{
    this.addressesService.setCurrentForm({});
    this.addressesService.setDialogTitle("add");
    this.addressesService.openDialog();
  }
  getAddresses(){
    this.addressesService.getAddresses().subscribe((data:any)=>{
      this.addressList = data.data[0].addresslist;
    },
    (err:any)=>{
      console.log("error getting addresses list")
    });
  }
}
