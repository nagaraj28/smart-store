import { Component, Input, OnInit } from '@angular/core';
import { ProductdetailsService } from 'src/app/screens/product-details/productdetails.service';
import { Router } from '@angular/router';
import { Products } from 'src/app/screens/products/productcard/products';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {
  constructor(private productDetailService:ProductdetailsService,private router:Router) { }
  productThere!:boolean;
  @Input()product!:any;
  quantity:number=1;
  productdetail!:Products;

  ngOnInit(): void {  
    this.productDetailService.getProduct(this.product.productid).subscribe(
      (data:any)=>{
        this.product=data;
        this.productThere=true;
        console.log(this.product);
      },
      (err:any)=>{
        console.log("error fetching details");
      }
    );
  }
  increaseQuantity(){
    if(this.quantity<3)
    this.quantity += 1;

  }
  decreaseQuantity(){
    if(this.quantity>0)
    this.quantity -= 1;
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