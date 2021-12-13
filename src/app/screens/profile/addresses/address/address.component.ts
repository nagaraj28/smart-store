import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/screens/login/login.service';
import { AddressesComponent } from '../addresses.component';
import { AddressesService } from '../addresses.service';
import { AddressformdialogComponent } from '../addressformdialog/addressformdialog.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private addressesService:AddressesService,private loginService:LoginService) { }
  @Input() address!:any;
  loggedUser!:any;
  ngOnInit(): void {
  }
  ngDoCheck(){
    if(this.loggedUser !== this.loginService.loggedUserDetails){
      this.loggedUser = this.loginService.loggedUserDetails;
    }
  }

  editAddress(address:any){
    this.addressesService.setCurrentForm(address);
    this.addressesService.setDialogTitle("update");
    this.addressesService.openDialog();
  }
  deleteAddress(addressId:string){
    this.addressesService.deleteAddress(addressId,this.loggedUser.userid).subscribe(
      (data:any)=>{
        let addressesComponent = new AddressesComponent(this.addressesService,this.loginService);
        if(this.loggedUser?.userid)
        addressesComponent.getAddresses(this.loggedUser.userid);
      },(err:any)=>{
        console.log("error deleting address");
      });
  }
}
