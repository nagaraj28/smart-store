import { Component, OnInit } from '@angular/core';
import { CartlistService } from '../../cart/cartcontainer/cartlist/cartlist.service';
import { LoginService } from '../../login/login.service';
import { WishlistService } from '../../wishlist/wishlist.service';
import { Products } from '../productcard/products';
import { ProductsService } from '../productcard/products.service';

@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrls: ['./productlisting.component.css']
})
export class ProductlistingComponent implements OnInit {
  constructor(private productService:ProductsService,private wishListService:WishlistService,
  private cartListService:CartlistService,private loginService:LoginService) { }
  allProducts!:Products[];
  // wishlistProducts!:Products[];
  ngOnInit(): void {
    console.log("hello do init");
    let dataIds!:any;
    // this.getCartListProducts();
    // this.getWishListProducts();
    if(this.loginService.loggedUserDetails?.userid){
      console.log("calls wishlist and cartlsit");
       this.getCartListProducts(this.loginService.loggedUserDetails.userid);
    this.getWishListProducts(this.loginService.loggedUserDetails.userid);
    }
    else{
      this.getAllProducts();
    }
// this.allProducts=this.productService.modifiedProducts;
  }

  
  ngDoCheck():void	{
    if(this.allProducts!==this.productService.modifiedProducts)
    this.allProducts=this.productService.modifiedProducts;
    // console.log(this.allProducts)
    //  console.log("hello do check")
    // this.wishListService.getWishlist().subscribe((data:any)=>{
    //   this.wishListService.getWishlistProducts(data.data[0].wishlistproducts).subscribe((data:any)=>{
    //   })
    // });
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      (data:any)=>{
        this.allProducts = data.products;
        // console.log("products",data)
      },
      (error)=>{
        console.log("error in products",error);
      }
    );
  }
  /*
    get cartlist products
    */
  getCartListProducts(userid:string){
    this.cartListService.getCart(userid).subscribe((data:any)=>{
      console.log(data.data[0])
      if(data.data&&data.data.length>0)
      this.cartListService.getCartlistProducts(data.data[0].cartproducts).subscribe(
        (data:any)=>{
          console.log("fetch cartlist data");
        },
        (err:any)=>{
          console.log("error in getting cartlist products")
        }
      );
    }, (err:any)=>{
      console.log("error in getting cartlist products id's")
    });
  }

     /*
    get wishlist products
    */
   getWishListProducts(userid:string){
    this.wishListService.getWishlist(userid).subscribe((data:any)=>{
      if(data.data?.length>0){   this.wishListService.getWishlistProducts(data.data[0].wishlistproducts).subscribe((data:any)=>{
        // this.wishlistProducts=data.products;
        //  console.log("wishlist",data);
        // console.log(this.allProducts)
        //gets all the products for shop page
        this.getAllProducts();
        this.allProducts=this.productService.actualProducts;
        //changed during search build
        // this.allProducts = this.productService.modifiedProducts;
      },
      (err:any)=>{
        console.log("error in getting wishlist products")
      });}
      else{      
        this.getAllProducts();
}
    },
    (err:any)=>{
      console.log("error in getting wishlist products id's")
    });
   }
}
