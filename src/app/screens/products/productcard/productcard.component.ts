import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Products } from './products';
import { Router } from '@angular/router';
import { WishlistService } from '../../wishlist/wishlist.service';
import { CartlistService } from '../../cart/cartcontainer/cartlist/cartlist.service';
import { ProductlistingComponent } from '../productlisting/productlisting.component';
import { LoginService } from '../../login/login.service';
@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent implements OnInit {

  constructor(private productService:ProductsService,private router:Router,private wishListService:WishlistService,
    private cartListService:CartlistService,private loginService:LoginService) { }
  isWishListed!:boolean;
  isInCart!:boolean;
  
  @Input() product!:Products;
  
  ngOnInit(): void {
  
    // this.isWishListed = this.wishListService.wishListProducts.some((prod)=>this.product._id===prod._id);
    // this.isInCart = this.cartListService.cartProducts.some((prod)=>this.product._id===prod.productid);
    
  }
  ngDoCheck():void{
    // console.log(this.wishListService.wishListProducts,this.cartListService.cartProducts);
    this.isWishListed = this.wishListService.wishListProducts.some((prod:any)=>prod._id===this.product._id);
    this.isInCart = this.cartListService.cartProducts.some((prod:any)=>prod.productid===this.product._id);
    // console.log(this.isWishListed);
    // this.isWishListed = this.wishListService.wishListProducts.some((prod)=>this.product._id===prod._id);
    // this.isInCart = this.cartListService.cartProducts.some((prod)=>this.product._id===prod._id);
  }
  changeColor(){
    this.isWishListed =!this.isWishListed;
  }
    addToCart(productid:any){
      if(this.loginService.loggedUserDetails?.userid){ 
        console.log(this.loginService.loggedUserDetails.userid);
        this.productService.addToCart(productid,1,this.loginService.loggedUserDetails.userid).subscribe(data=>{
        console.log("add to cart subscribe value",data);
        this.isInCart = !this.isInCart;
        let productListingComponent = new ProductlistingComponent(this.productService,this.wishListService,this.cartListService,this.loginService);
        productListingComponent.getCartListProducts(this.loginService.loggedUserDetails.userid);
      });
    }else
      this.router.navigate(["/login"]);
      // console.log("add to cart")
    }
    /*
    add to wishlist 
    */
    addToWishlist(productid:any){
      if(this.loginService.loggedUserDetails?.userid){
        this.productService.addToWishlist(productid,this.loginService.loggedUserDetails.userid).subscribe(data=>{
          console.log("add to cart subscribe value",data);
          this.changeColor();
          let productListingComponent = new ProductlistingComponent(this.productService,this.wishListService,this.cartListService,this.loginService);
          productListingComponent.getWishListProducts(this.loginService.loggedUserDetails.userid);
        });
      }
      else{
        this.router.navigate(["/login"]);
      }
    }
        /*
    remove from wishlist 
    */
    removeFromWishlist(productid:any){
      if(this.loginService.loggedUserDetails?.userid){
        this.productService.removeFromWishlist(productid,this.loginService.loggedUserDetails.userid).subscribe((data:any)=>{
        console.log(" wishlist  product removed...",data);
        this.changeColor();
        let productListingComponent = new ProductlistingComponent(this.productService,this.wishListService,this.cartListService,this.loginService);
        productListingComponent.getWishListProducts(this.loginService.loggedUserDetails.userid);
        },
        (err:any)=>{
          console.log("error deleting from wishlist");
        });
      }
    else{
      this.router.navigate(["/login"]);
    }
    }
    /*
    go to cart
    */
    goToCart(){
      this.router.navigate(['/cart']);
    }
  // getAllProducts(){
  //   this.productService.getAllProducts().subscribe(
  //     (data:any)=>{
  //       this.products = data.products;
  //       console.log(this.products);
  //       console.log("products",data.products)
  //     },
  //     (error)=>{
  //       console.log("error in products",error);
  //     }
  //   )
  // }
  
}
