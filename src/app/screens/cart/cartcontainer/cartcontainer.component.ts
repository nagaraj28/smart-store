import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { AddressesService } from '../../profile/addresses/addresses.service';

@Component({
  selector: 'app-cartcontainer',
  templateUrl: './cartcontainer.component.html',
  styleUrls: ['./cartcontainer.component.css']
})
export class CartcontainerComponent implements OnInit {
  isAddressForm !:boolean;
  loggedUser !: any;
  constructor(private addressesService:AddressesService,private loginService:LoginService,private router:Router) { }
  ngOnInit(): void {
    if(this.loginService.loggedUserDetails?.userid){
      this.loggedUser = this.loginService.loggedUserDetails;
    }
    else{
      const token = localStorage.getItem("x-auth-token");
      if(token){
        this.performTokenValidation(token);
          // console.log("token present");
      }
      else{
          console.log(" token not available");
          this.router.navigate(["/login"]);
            }
    }
  }
  ngDoCheck(){
    this.isAddressForm = this.addressesService.isDialogOpen;
  }
  
  performTokenValidation(token:any):void{
    this.loginService.validateToken(token).subscribe((data:any)=>{
      if(data?.userid){
          this.loggedUser = data;
       }
       else{
        //  console.log("invalid token",this.loginService.loggedUserDetails.userid);
         this.router.navigate(["/login"]);
       }
    },
    (err:any)=>{
      localStorage.removeItem("x-auth-token")
      console.log("error in alidating token...");
      this.router.navigate(["/login"]);
    });
  }
}
