import { Component, Input, OnInit } from '@angular/core';
import { AddressesComponent } from '../addresses.component';
import { AddressesService } from '../addresses.service';
import { AddressformdialogComponent } from '../addressformdialog/addressformdialog.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private addressesService:AddressesService) { }
  @Input() address!:any;
  ngOnInit(): void {
  }

  editAddress(address:any){
    this.addressesService.setCurrentForm(address);
    this.addressesService.setDialogTitle("update");
    this.addressesService.openDialog();
  }
  deleteAddress(addressId:string){
    this.addressesService.deleteAddress(addressId).subscribe(
      (data:any)=>{
        let addressesComponent = new AddressesComponent(this.addressesService);
        addressesComponent.getAddresses();
      },(err:any)=>{
        console.log("error deleting address");
      })
  }
}
