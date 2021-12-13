import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../../profile/addresses/addresses.service';

@Component({
  selector: 'app-cartcontainer',
  templateUrl: './cartcontainer.component.html',
  styleUrls: ['./cartcontainer.component.css']
})
export class CartcontainerComponent implements OnInit {
  isAddressForm !:boolean;
  constructor(private addressesService:AddressesService) { }
  ngOnInit(): void {
  }
  ngDoCheck(){
    this.isAddressForm = this.addressesService.isDialogOpen;
  }
}
