import { Component, Input, OnInit } from '@angular/core';
import { ProductdetailsService } from 'src/app/screens/product-details/productdetails.service';
import { Router } from '@angular/router';
import { Products } from 'src/app/screens/products/productcard/products';
import { CartlistService } from '../cartlist.service';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {
  constructor(private productDetailService:ProductdetailsService,private router:Router,private cartListService:CartlistService) { }
  productThere!:boolean;
  @Input()product!:any;
  quantity:number=1;
  productdetail!:Products;
  totalPrice:number = 0;
  totalOfferPrice:number = 0;

  ngOnInit(): void {  
    this.quantity=this.product.quantity;
    this.productDetailService.getProduct(this.product.productid).subscribe(
      (data:any)=>{
        this.productdetail=data.products;
        // this.productThere=true;
        // console.log(this.productdetail);
      },
      (err:any)=>{
        console.log("error fetching details");
      }
    );
  }
  // ngOnCheck():void{
  //   this.productDetailService.getProduct(this.product.productid).subscribe(
  //     (data:any)=>{
  //       this.productdetail=data;
  //       this.productThere=true;
  //       console.log(this.productdetail);
  //     },
  //     (err:any)=>{
  //       console.log("error fetching details");
  //     }
  //   );
  // }
  increaseQuantity(product_id:string):void{
    if(this.quantity<3){
      this.quantity += 1;
      this.modifyCartProducts(product_id,this.quantity,1);
    }

  }
  decreaseQuantity(product_id:string):void{
    if(this.quantity>0){
      this.quantity -= 1;
      this.modifyCartProducts(product_id,this.quantity,-1);
    }
  }

  modifyCartProducts(productid:string,quantity:number,value:number){
    this.cartListService.modifyCart(productid,quantity).subscribe(
      (data:any)=>{
        console.log("cart quantity modified",data);
      },
      ((err:any)=>{
        console.log("error in updating cart");
        this.quantity += value;
      })
    );
  }

    /* 
    delete product from cart
    */
   removeProductFromCart(productid:string){
     this.cartListService.removeFromCart(productid).subscribe(
       (data:any)=>{
        console.log("remove success",data);
        this.cartListService.getCart().subscribe(data=>console.log("uodated data",data));
       },
       (err:any)=>{
         console.log("something went wrong in deleting the cart",err);
       }
     )
   }

}
// interface ProductType{
//   displayName:string,
//   shortDesc:string,
//   desc:string,
//   category:string,
//   price:number,
//   discount:number,
//   deliveryCharge:number,
//   offerPrice:number,
//   seller:string,
//   sellerCount:number,
//   avgRating:number,
//   imageURL:string,
//   reviews:any[]
// }