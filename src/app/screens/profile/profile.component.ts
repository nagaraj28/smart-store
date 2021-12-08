import { Component, OnInit } from '@angular/core';
import { AddressesService } from './addresses/addresses.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private addressesService:AddressesService) { }
  isAddressForm!:boolean;
  ngOnInit(): void {
  }
  ngDoCheck(){
    this.isAddressForm = this.addressesService.isDialogOpen;
  }

}
