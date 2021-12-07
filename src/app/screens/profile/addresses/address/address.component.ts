import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../addresses.service';
import { AddressformdialogComponent } from '../addressformdialog/addressformdialog.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private addressService:AddressesService) { }

  ngOnInit(): void {
  }
  editAddress(){
    this.addressService.setDialogTitle("update");
    this.addressService.openDialog();
  }
  deleteAddress(){

  }
}
