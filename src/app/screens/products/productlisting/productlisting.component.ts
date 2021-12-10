import { Component, OnInit } from '@angular/core';
import { CartlistService } from '../../cart/cartcontainer/cartlist/cartlist.service';
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
  private cartListService:CartlistService) { }
  allProducts!:Products[];
  // wishlistProducts!:Products[];
  ngOnInit(): void {
    console.log("hello do init");
    let dataIds!:any;
    this.getCartListProducts();
    this.getWishListProducts();
// this.getAllProducts();
// this.allProducts=this.productService.modifiedProducts;
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
  getCartListProducts(){
    this.cartListService.getCart().subscribe((data:any)=>{
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
   getWishListProducts(){
    this.wishListService.getWishlist().subscribe((data:any)=>{
      this.wishListService.getWishlistProducts(data.data[0].wishlistproducts).subscribe((data:any)=>{
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
      });
    },
    (err:any)=>{
      console.log("error in getting wishlist products id's")
    });
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
}
