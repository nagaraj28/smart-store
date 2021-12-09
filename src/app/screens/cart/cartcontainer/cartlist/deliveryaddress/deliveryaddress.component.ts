import { Component, OnInit } from '@angular/core';
import { AddressesService } from 'src/app/screens/profile/addresses/addresses.service';

@Component({
  selector: 'app-deliveryaddress',
  templateUrl: './deliveryaddress.component.html',
  styleUrls: ['./deliveryaddress.component.css']
})
export class DeliveryaddressComponent implements OnInit {

  constructor(private addressesService:AddressesService) { }
  currentAddress!:any;

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    if(this.currentAddress!==this.addressesService.addressSelectedValue)
    this.currentAddress = this.addressesService.addressSelectedValue;
  }

  changeAddress(){
    this.currentAddress = this.addressesService.openIsAddressSelectedDialog();
  }
}
