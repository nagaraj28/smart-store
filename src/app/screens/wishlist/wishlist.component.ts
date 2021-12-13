import { Component, OnInit } from '@angular/core';
import { CartlistService } from '../cart/cartcontainer/cartlist/cartlist.service';
import { WishlistService } from './wishlist.service';
import { Products } from '../products/productcard/products';
import { LoginService } from '../login/login.service';
import { ProductsService } from '../products/productcard/products.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  items:any[] = [" "," "," "," "," "," "," "];
  wishlistDataIds!:any;
  wishlistProducts!:Products[];
  constructor(private wishlistService:WishlistService,private cartlistService:CartlistService,private loginService:LoginService,
  private productService:ProductsService,private router:Router) { }
  ngOnInit(): void {

    if(this.loginService.loggedUserDetails?.userid){
 /*  get cartlist products */
    this.getCartProducts(this.loginService.loggedUserDetails.userid);
    }
    else{
      const token = localStorage.getItem("x-auth-token");
      if(token){
        let appComponent = new AppComponent(this.cartlistService,this.wishlistService,this.productService,this.router,this.loginService);
        appComponent.performTokenValidation(token);
        if(this.loginService.loggedUserDetails?.userid)
        this.getCartProducts(this.loginService.loggedUserDetails.userid);
        else
        this.router.navigate(["/login"]);

      }
      else{
        this.router.navigate(["/login"]);
      }
    }
  }

  ngDoCheck():void{
    console.log(this.wishlistService.wishListProducts);
    this.wishlistProducts = this.wishlistService.wishListProducts;
  }
  /*
  get cart products
  */
    getCartProducts(userid:string){
      this.cartlistService.getCart(userid).subscribe((data:any)=>{
        console.log(data.data[0])
        this.cartlistService.getCartlistProducts(data.data[0].cartproducts).subscribe(
          (data:any)=>{
            console.log("fetch cartlist data");
          },
          (err:any)=>{
            console.log("error in getting cartlist products")
          }
        );
        this.getWishlist(userid);
      }, (err:any)=>{
        console.log("error in getting cartlist products id's")
      });
    }
    /*
  get wishlist products id's-array
  */
  getWishlist(userid:string){
    this.wishlistService.getWishlist(userid).subscribe((data:any)=>{
      if(data.data?.length>0){
        this.wishlistDataIds = data.data[0].wishlistproducts;
      this.getWishlistProducts(this.wishlistDataIds);
      }
      
    },
    (err)=>{
      console.log("error in getting wishlist data");
    }
    );
  }
    /*
  get wishlist products details
  */
  getWishlistProducts(data:any[]){
    console.log(data);
    this.wishlistService.getWishlistProducts(data).subscribe(
      (data:any)=>{
        this.wishlistProducts = data.products ;
        // console.log(this.wishlistProducts);
      },
      (err=>console.log("error in fetching wishlist products...") )
    );
  }
} 
