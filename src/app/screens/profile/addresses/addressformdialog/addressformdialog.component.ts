import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../addresses.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AddressesComponent } from '../addresses.component';
import { LoginService } from 'src/app/screens/login/login.service';


@Component({
  selector: 'app-addressformdialog',
  templateUrl: './addressformdialog.component.html',
  styleUrls: ['./addressformdialog.component.css']
})
export class AddressformdialogComponent implements OnInit {
  isDialogOpen:boolean=false;
  loggedUser!:any;
  currentFormAddress!:any;
  constructor(private addressesService:AddressesService,private formBuilder:FormBuilder,private loginService:LoginService) { }
  title!:string;
  addressForm!: FormGroup;
  ngOnInit(): void {
    this.isDialogOpen = this.addressesService.isDialogOpen;
    this.title = this.addressesService.dialogBoxTitle;
    this.currentFormAddress = this.addressesService.currentFormEditDetails;
    // console.log(this.currentFormAddress)
    //form controls
    this.addressForm = this.formBuilder.group({
      street:[this.currentFormAddress.street,Validators.required],
      city:[this.currentFormAddress.city,Validators.required],
      state:[this.currentFormAddress.state,Validators.required],
      zipcode:[this.currentFormAddress.zipcode,Validators.required],
      name:[this.currentFormAddress.name,Validators.required],
      phoneno:[this.currentFormAddress.phoneno,Validators.required]
    })
  }
  ngDoCheck():void{
    this.isDialogOpen = this.addressesService.isDialogOpen;
    this.title = this.addressesService.dialogBoxTitle;
    this.loggedUser = this.loginService.loggedUserDetails;
  }
  closeDialog(){
    this.addressesService.closeDialog();
  }

  addAddress(userid:string){
      console.log("add address",this.addressForm.value);
      const addressObj = this.addressForm.value;
      this.addressesService.addAddress(addressObj,userid).subscribe(
        (data:any)=>{
          console.log("address added" );
          let addressesComponent = new AddressesComponent(this.addressesService,this.loginService);
          addressesComponent.getAddresses(userid);
        },
        (err:any)=>{
          console.log("error adding address");
        });
  }
  updateAddress(addressId:string,userid:string){
    // console.log("update address",this.addressForm.value);
    this.addressesService.updateAddress(this.addressForm.value,addressId,this.loggedUser.userid).subscribe((data:any)=>{
      console.log("address updated!");
      let addressesComponent = new AddressesComponent(this.addressesService,this.loginService);
      addressesComponent.getAddresses(userid);
    },
    (err:any)=>{
      console.log(err);
    });
  }

}
