import { Component } from '@angular/core';
import { CartlistService } from './screens/cart/cartcontainer/cartlist/cartlist.service';
import { WishlistService } from './screens/wishlist/wishlist.service';
import { ProductlistingComponent } from './screens/products/productlisting/productlisting.component';
import { ProductsService } from './screens/products/productcard/products.service';
import { Router } from '@angular/router';
import { LoginService } from './screens/login/login.service';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  wishListSize:number=0;
  cartListSize:number=0;
  searchValue:string="";
  loggedUser!:any;
  constructor(private cartListService:CartlistService,private wishListService:WishlistService,private productService:ProductsService,private router:Router,private loginService:LoginService){}
  ngOnInit():void{

     /*
    get cartlist products
    */
    // this.cartListService.getCart().subscribe((data:any)=>{
    //   // console.log(data.data[0])
    //   this.cartListSize = data.data[0].cartproducts.length;
    //   console.log(this.cartListSize);
    // },(err:any)=>{
    //   console.log("error in getting cartlist products id's")
    // });

    /*
    get wishlist products
    */
  //   this.wishListService.getWishlist().subscribe((data:any)=>{
  //   console.log(data.data[0].wishlistproducts.length);
  //   this.wishListSize =data.data[0].wishlistproducts.length;
  //   console.log(this.wishListSize);
  // },(err:any)=>{
  //   console.log("error in getting cartlist products id's")
  // });
  const tokenValue = localStorage.getItem("x-auth-token");
  if(tokenValue){
    this.performTokenValidation(tokenValue);
  }
  }
  ngDoCheck():void{
    // console.log("app-ng check");
    if(this.loggedUser!==this.loginService.loggedUserDetails){
      this.loggedUser = this.loginService.loggedUserDetails;
    }
    // if(this.cartListService.cartProducts && this.cartListService.cartProducts.length>0)
    this.cartListSize = this.cartListService.cartProducts.length;
    // if(this.wishListService.wishListProducts && this.wishListService.wishListProducts.length>=0)
    this.wishListSize = this.wishListService.wishListProducts.length;
  }
  performTokenValidation(token:string){
    this.loginService.validateToken(token).subscribe((data:any)=>{
      if(data?.userid){
       // console.log("token value validated...");
        let productListingComponent = new ProductlistingComponent(this.productService,this.wishListService,this.cartListService,this.loginService);
        productListingComponent.getWishListProducts(data.userid);
        productListingComponent.getCartListProducts(data.userid);
            }else{
        console.log("invalid token");
      }
    },
    (err:any)=>{
      localStorage.removeItem("x-auth-token")
      console.log("error in alidating token...");
    });
  }
  findProducts(){
    this.router.navigate(["/search"],{queryParams:{searchvalue:this.searchValue}});
  }
}
