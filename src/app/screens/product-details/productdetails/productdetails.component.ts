import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductdetailsService } from '../productdetails.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../products/productcard/products';
import { ProductcardComponent } from '../../products/productcard/productcard.component';
import { WishlistService } from '../../wishlist/wishlist.service';
import { CartlistService } from '../../cart/cartcontainer/cartlist/cartlist.service';
import { ProductsService } from '../../products/productcard/products.service';
import { CartitemComponent } from '../../cart/cartcontainer/cartlist/cartitem/cartitem.component';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  constructor(private productDetailService:ProductdetailsService,private router:Router,private route: ActivatedRoute,
    private wishlistService:WishlistService,private cartListService:CartlistService,private productsService:ProductsService
    ) { }
  productThere!:boolean;
  product!:Products;
  quantity:number=1;
  giveRating:number=1;
  isItemsThereInCart!:boolean;
  isItemsThereInWishList!:boolean
  reviewEntered!:string
  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap)
    const productId:string=this.route.snapshot.paramMap.get("productid")||'';
    if(productId)
    this.productDetailService.getProduct(productId).subscribe(
      (data:any)=>{
        this.product=data.products;
        this.productThere=true;
        // console.log(this.product);
      },
      (err:any)=>{
        console.log("error fetching details");
      }
    );
    // const val:any = 
    //  console.log("local item",localStorage.getItem("currentProduct"));
    
    /*
    get cartlist products
    */
    if(productId)
    this.cartListService.getCart().subscribe((data:any)=>{
      console.log(data.data[0])
      this.cartListService.getCartlistProducts(data.data[0].cartproducts).subscribe(
        (data:any)=>{
          console.log("fetch cartlist data");
          this.isItemsThereInCart = data.products.some((prod:any)=>prod._id===this.product._id);
        },
        (err:any)=>{
          console.log("error in getting cartlist products")
        }
      );
    }, (err:any)=>{
      console.log("error in getting cartlist products id's")
    });
    /*
    get wishlist products
    */
    if(productId)
    this.wishlistService.getWishlist().subscribe((data:any)=>{
      this.wishlistService.getWishlistProducts(data.data[0].wishlistproducts).subscribe((data:any)=>{
        // this.wishlistProducts=data.products;
        //  console.log("wishlist",data);
        // console.log(this.allProducts)
        //gets all the products for shop page
        this.isItemsThereInWishList = data.products.some((prod:any)=>prod._id===this.product._id);
      },
      (err:any)=>{
        console.log("error in getting wishlist products")
      });
    },
    (err:any)=>{
      console.log("error in getting wishlist products id's")
    });
  }
  changeQuantity(value:string):void{
    this.quantity=parseInt(value);
    console.log(this.quantity);
  }
  changeRating(value:string):void{
    this.giveRating=parseInt(value);
    console.log(this.giveRating);
  }
  addToCart(productid:string){
    let productCardComponent = new ProductcardComponent(this.productsService,this.router,this.wishlistService,this.cartListService);
    productCardComponent.addToCart(productid);
    this.isItemsThereInCart=true;
    // this.searchService.addItemIntoCart(data).subscribe(
    //   (result)=>{
    //     console.log("items added to cart");
    //   },
    //   (err)=>{
    //     console.log("error adding items into cart...");
    //   }
    // )
  }
  goToCart(){
    this.router.navigate(["./cart"])
  }
  addToWishList(productid:string){
    let productCardComponent = new ProductcardComponent(this.productsService,this.router,this.wishlistService,this.cartListService);
    productCardComponent.addToWishlist(productid);
    this.isItemsThereInWishList=true;
    let data={};
    // this.searchService.addItemIntoCart(data).subscribe(
    //   (result)=>{
    //     console.log("items added to cart");
    //   },
    //   (err)=>{
    //     console.log("error adding items into cart...");
    //   }
    // )
  }
  removeFromWishList(productid:string){
    let productCardComponent = new ProductcardComponent(this.productsService,this.router,this.wishlistService,this.cartListService);
    productCardComponent.removeFromWishlist(productid)
  }
  // removeFromCart(){
  //   // let cartItemComponent = new CartitemComponent(this.productDetailService,this.router,this.cartListService);
  //   // cartItemComponent.removeProductFromCart(this.product._id)
  // }
 
 
  submitReview(){
      console.log(this.reviewEntered)
  }
}
