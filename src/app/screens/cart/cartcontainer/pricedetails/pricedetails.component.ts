import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { CartlistService } from '../cartlist/cartlist.service';

@Component({
  selector: 'app-pricedetails',
  templateUrl: './pricedetails.component.html',
  styleUrls: ['./pricedetails.component.css']
})
export class PricedetailsComponent implements OnInit {

  constructor(private cartListService:CartlistService) { }
  cartListProductIds:any=[];
  cartListProductDetails:any=[];
  totalPrice:number=0;
  totalOfferPrice:number=0;
  totalDeliveryCharge:number=0;
  ngOnInit(): void {
    // if(this.cartListProductIds!==this.cartListService.cartProducts){
    //   this.cartListProductIds = this.cartListService.cartProducts;
    // }
    // if(this.cartListProductDetails!==this.cartListService.cartProductsWithDetails){
    //   this.cartListProductDetails = this.cartListService.cartProductsWithDetails;
    // }
  }
  ngDoCheck(){
    if(this.cartListProductIds!==this.cartListService.cartProducts){
      this.cartListProductIds = this.cartListService.cartProducts;
    }
    if(this.cartListProductDetails!==this.cartListService.cartProductsWithDetails){
      this.cartListProductDetails = this.cartListService.cartProductsWithDetails;
    }
    this.calcultePrices();
  }

  calcultePrices(){
  this.totalPrice=0;
  this.totalOfferPrice=0;
  this.totalDeliveryCharge=0;
    // console.log(this.cartListProductDetails,this.cartListProductIds);
    if(this.cartListProductIds.length>0 && this.cartListProductDetails.length>0){
      for(let cartListProduct of this.cartListProductDetails){
        for(let cartListProductListItem of this.cartListProductIds){
          if(cartListProduct._id===cartListProductListItem.productid){
            // console.log(cartListProduct,cartListProductListItem,cartListProductListItem.quantity)
            this.totalOfferPrice += (cartListProductListItem.quantity*cartListProduct.offerPrice);
            this.totalDeliveryCharge += (cartListProductListItem.quantity*cartListProduct.deliveryCharge);
            this.totalPrice += (cartListProductListItem.quantity*cartListProduct.price);
            break;
          }
        }
      }
    }
  }

}
