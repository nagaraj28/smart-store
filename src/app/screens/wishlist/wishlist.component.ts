import { Component, OnInit } from '@angular/core';
import { CartlistService } from '../cart/cartcontainer/cartlist/cartlist.service';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  items:any[] = [" "," "," "," "," "," "," "];
  wishlistDataIds!:any;
  wishlistProducts!:any;
  constructor(private wishlistService:WishlistService,private cartlistService:CartlistService) { }
  ngOnInit(): void {
      /*
    get cartlist products
    */
    this.cartlistService.getCart().subscribe((data:any)=>{
      console.log(data.data[0])
      this.cartlistService.getCartlistProducts(data.data[0].cartproducts).subscribe(
        (data:any)=>{
          console.log("fetch cartlist data");
        },
        (err:any)=>{
          console.log("error in getting cartlist products")
        }
      );
      this.getWishlist();
    }, (err:any)=>{
      console.log("error in getting cartlist products id's")
    });
  }
  getWishlist(){
    this.wishlistService.getWishlist().subscribe((data:any)=>{
      this.wishlistDataIds = data.data[0].wishlistproducts
      this.getWishlistProducts(this.wishlistDataIds);
    },
    (err)=>{
      console.log("error in getting wishlist data");
    }
    );
  }
  getWishlistProducts(data:any[]){
    console.log(data);
    this.wishlistService.getWishlistProducts(data).subscribe(
      (data:any)=>{
        this.wishlistProducts = data.products ;
        // console.log(this.wishlistProducts);
      },
      (err=>console.log("error in fetching wishlist products...") )
    )
  }
} 
