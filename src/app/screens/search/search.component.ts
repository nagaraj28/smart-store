import { Component, OnInit } from '@angular/core';
import { CartlistService } from '../cart/cartcontainer/cartlist/cartlist.service';
import { ProductsService } from '../products/productcard/products.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { Products } from '../products/productcard/products';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private productService:ProductsService,private wishListService:WishlistService,
    private cartListService:CartlistService,private activatedRoute:ActivatedRoute,private searchService:SearchService,
    private loginService:LoginService) { }
    allProducts!:Products[];
    // wishlistProducts!:Products[];
    ngOnInit(): void {
      console.log("hello do init");
      let dataIds!:any;
      if(this.loginService.loggedUserDetails?.userid){
        this.getCartListProducts(this.loginService.loggedUserDetails.userid);
        this.getWishListProducts(this.loginService.loggedUserDetails.userid);
      }
     
      // this.getAllProducts();
     // this.allProducts=this.productService.modifiedProducts;
    //  console.log(this.activatedRoute.snapshot.queryParams);
    // this.activatedRoute.snapshot.queryParam
    this.activatedRoute.queryParams.subscribe((params:any) =>this.getProductsBySearchTerm(params.searchvalue));  
    }

    ngDoCheck():void	{
      // if(this.allProducts!==this.productService.modifiedProducts)
      // this.allProducts=this.productService.modifiedProducts;
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
        this.wishListService.getWishlistProducts(data.data[0].wishlistproducts).subscribe((data:any)=>{
          // this.wishlistProducts=data.products;
          //  console.log("wishlist",data);
          // console.log(this.allProducts)
          //gets all the products for shop page
          // this.getAllProducts();
          // this.allProducts=this.productService.modifiedProducts;
        },
        (err:any)=>{
          console.log("error in getting wishlist products")
        });
      },
      (err:any)=>{
        console.log("error in getting wishlist products id's")
      });
     }

     /*
      get products by searchTerm
     */
      getProductsBySearchTerm(searchValue:any){
        this.productService.getAllProducts().subscribe((data:any)=>{
          this.allProducts = data.products.filter((product:any)=>{
           return (product.brand.toLowerCase().includes(searchValue.toLowerCase()) || 
            product.displayName.toLowerCase().includes(searchValue.toLowerCase()) ||
            product.shortDescription.toLowerCase().includes(searchValue.toLowerCase()) ||
            product.longDescription.toLowerCase().includes(searchValue.toLowerCase()) ||
            product.category.toLowerCase().includes(searchValue.toLowerCase())
            )
          });
        },
        (err:any)=>{
          console.log("error fetching data");
        })
      }
}
