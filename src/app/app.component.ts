import { Component } from '@angular/core';
import { CartlistService } from './screens/cart/cartcontainer/cartlist/cartlist.service';
import { WishlistService } from './screens/wishlist/wishlist.service';
import { ProductlistingComponent } from './screens/products/productlisting/productlisting.component';
import { ProductsService } from './screens/products/productcard/products.service';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  wishListSize:number=0;
  cartListSize:number=0;
  constructor(private cartListService:CartlistService,private wishListService:WishlistService,private productService:ProductsService){}

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

  let productListingComponent = new ProductlistingComponent(this.productService,this.wishListService,this.cartListService);
  productListingComponent.getWishListProducts();
  productListingComponent.getCartListProducts();

  }
  ngDoCheck():void{
    // console.log("app-ng check");
    this.cartListSize = this.cartListService.cartProducts.length;
    this.wishListSize = this.wishListService.wishListProducts.length;
  }
}
