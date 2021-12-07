import { Component, OnInit } from '@angular/core';
import { AddressesService } from './addresses.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  constructor(private addressesService:AddressesService) { }

  ngOnInit(): void {
  }

  addNewAddress():void{
    this.addressesService.setDialogTitle("add");
    this.addressesService.openDialog();
  }

}
