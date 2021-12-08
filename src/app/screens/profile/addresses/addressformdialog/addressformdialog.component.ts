import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../addresses.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AddressesComponent } from '../addresses.component';


@Component({
  selector: 'app-addressformdialog',
  templateUrl: './addressformdialog.component.html',
  styleUrls: ['./addressformdialog.component.css']
})
export class AddressformdialogComponent implements OnInit {
  isDialogOpen:boolean=false;
  currentFormAddress!:any;
  constructor(private addressesService:AddressesService,private formBuilder:FormBuilder) { }
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
  }
  closeDialog(){
    this.addressesService.closeDialog();
  }

  addAddress(){
      console.log("add address",this.addressForm.value);
      const addressObj = this.addressForm.value;
      this.addressesService.addAddress(addressObj).subscribe(
        (data:any)=>{
          console.log("address added" );
          let addressesComponent = new AddressesComponent(this.addressesService);
          addressesComponent.getAddresses();
        },
        (err:any)=>{
          console.log("error adding address");
        });
  }
  updateAddress(addressId:string){
    // console.log("update address",this.addressForm.value);
    this.addressesService.updateAddress(this.addressForm.value,addressId).subscribe((data:any)=>{
      console.log("address updated!");
      let addressesComponent = new AddressesComponent(this.addressesService);
      addressesComponent.getAddresses();
    },
    (err:any)=>{
      console.log(err);
    });
  }

}
