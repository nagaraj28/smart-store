import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Products } from './products';
import { Router } from '@angular/router';
import { WishlistService } from '../../wishlist/wishlist.service';
import { CartlistService } from '../../cart/cartcontainer/cartlist/cartlist.service';
import { ProductlistingComponent } from '../productlisting/productlisting.component';
@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent implements OnInit {

  constructor(private productService:ProductsService,private router:Router,private wishListService:WishlistService,
    private cartListService:CartlistService) { }
  isWishListed!:boolean;
  isInCart!:boolean;
  
  @Input() product!:Products;
  
  ngOnInit(): void {
    // this.getAllProducts();
    // console.log(this.wishListService.wishListProducts)
    // console.log(this.wishListService.wishListProducts,this.product);
    this.isWishListed = this.wishListService.wishListProducts.some((prod)=>this.product._id===prod._id);
    this.isInCart = this.cartListService.cartProducts.some((prod)=>this.product._id===prod.productid);
    // console.log(this.cartListService.cartProducts,this.product._id,this.isInCart);
  }
  ngDoCheck():void{
    // this.isWishListed = this.wishListService.wishListProducts.includes(this.product);
    // this.isInCart = this.wishListService.wishListProducts.includes(this.product);
    // console.log(this.isWishListed);
    // this.isWishListed = this.wishListService.wishListProducts.some((prod)=>this.product._id===prod._id);
    // this.isInCart = this.cartListService.cartProducts.some((prod)=>this.product._id===prod._id);
  }
  changeColor(){
    this.isWishListed =!this.isWishListed;
  }
  

    addToCart(productid:any){
      this.productService.addToCart(productid,1).subscribe(data=>{
        console.log("add to cart subscribe value",data);
        this.isInCart = !this.isInCart;
        let productListingComponent = new ProductlistingComponent(this.productService,this.wishListService,this.cartListService);
        productListingComponent.getCartListProducts();
      });
     
      // console.log("add to cart")
    }
    /*
    add to wishlist 
    */
    addToWishlist(productid:any){
      this.productService.addToWishlist(productid).subscribe(data=>{
        console.log("add to cart subscribe value",data);
        this.changeColor();
        let productListingComponent = new ProductlistingComponent(this.productService,this.wishListService,this.cartListService);
        productListingComponent.getWishListProducts();
      });
     
    }
        /*
    remove from wishlist 
    */
    removeFromWishlist(productid:any){
      this.wishListService.removeFromWishlist(productid).subscribe(data=>{
        console.log(" wishlist  product removed...",data);
        this.changeColor();
        this.wishListService.removeFromWishlist(productid).subscribe((data:any)=>{
        console.log("data after deletion",data);
        let productListingComponent = new ProductlistingComponent(this.productService,this.wishListService,this.cartListService);
        productListingComponent.getWishListProducts();
        },
        
        (err:any)=>{
          console.log("error deleting from wishlist");
        })
      });
     
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
