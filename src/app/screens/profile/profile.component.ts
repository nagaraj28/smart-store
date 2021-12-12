import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartlistService } from '../cart/cartcontainer/cartlist/cartlist.service';
import { LoginService } from '../login/login.service';
import { ProductsService } from '../products/productcard/products.service';
import { ProductlistingComponent } from '../products/productlisting/productlisting.component';
import { WishlistService } from '../wishlist/wishlist.service';
import { AddressesService } from './addresses/addresses.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private addressesService:AddressesService,private loginService:LoginService,private router:Router,private productService:ProductsService,
    private wishListService:WishlistService,private cartListService:CartlistService) { }
  isAddressForm!:boolean;
  ngOnInit(): void {
    const token = localStorage.getItem("x-auth-token");
    if(token){
      if(!(this.loginService.loggedUserDetails?.userid)){
        this.performTokenValidation(token);
      }
    }
    else{
      this.router.navigate(["/login"]);
    }
  }
  ngDoCheck(){
    this.isAddressForm = this.addressesService.isDialogOpen;
  }
  performTokenValidation(token:string){
    this.loginService.validateToken(token).subscribe((data:any)=>{
      if(data?.userid){
       // console.log("token value validated...");
        // let productListingComponent = new ProductlistingComponent(this.productService,this.wishListService,this.cartListService,this.loginService);
        // productListingComponent.getWishListProducts(data.userid);
        // productListingComponent.getCartListProducts(data.userid);
            }else{
        console.log("invalid token");
      }
    },
    (err:any)=>{
      localStorage.removeItem("x-auth-token")
      console.log("error in alidating token...");
    });
  }

}
