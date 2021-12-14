import { Component, OnInit } from '@angular/core';
import { CartlistService } from './cartlist.service';
import { Products } from 'src/app/screens/products/productcard/products';
import { WishlistService } from 'src/app/screens/wishlist/wishlist.service';
import { ProductsService } from 'src/app/screens/products/productcard/products.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/screens/login/login.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit {
  constructor(private cartlistService:CartlistService,private wishlistService:WishlistService,private productService:ProductsService,
    private router:Router,private loginService:LoginService) { }
  cartProducts:Products[]=[];
  ngOnInit(): void{
    if(this.loginService.loggedUserDetails?.userid){
      /*  get cartlist products */
         this.getCartProducts(this.loginService.loggedUserDetails.userid);
         }
         else{
          this.router.navigate(["/login"]);
    }
  }
  
  ngDoCheck():void{
    if(this.cartProducts!==this.cartlistService.cartProducts){
      this.cartProducts = this.cartlistService.cartProducts;
     console.log("do checkcartlist",this.cartProducts);
    } 
  }
  getCartProducts(userid:string){
    this.cartlistService.getCart(userid).subscribe(
      (data:any)=>{
      this.cartProducts = data.data[0].cartproducts;
      //  console.log(this.cartProducts);
    },
    (err:any)=>{
      console.log("error in cart items");
    }
    );
  }
}
