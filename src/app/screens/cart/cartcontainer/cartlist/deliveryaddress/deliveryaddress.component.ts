import { Component, OnInit } from '@angular/core';
import { AddressesService } from 'src/app/screens/profile/addresses/addresses.service';
import { CartlistService } from '../cartlist.service';

@Component({
  selector: 'app-deliveryaddress',
  templateUrl: './deliveryaddress.component.html',
  styleUrls: ['./deliveryaddress.component.css']
})
export class DeliveryaddressComponent implements OnInit {

  constructor(private addressesService:AddressesService,private cartListService:CartlistService) { }
  currentAddress!:any;
  cartList!:any;

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    if(this.currentAddress!==this.addressesService.addressSelectedValue)
    this.currentAddress = this.addressesService.addressSelectedValue;
    if(this.cartList!==this.cartListService.cartProducts){
      this.cartList = this.cartListService.cartProducts
    }
  }

  changeAddress(){
    this.currentAddress = this.addressesService.openIsAddressSelectedDialog();
  }
}
