import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { AddressesService } from 'src/app/screens/profile/addresses/addresses.service';
import { CartlistService } from '../cartlist/cartlist.service';

@Component({
  selector: 'app-pricedetails',
  templateUrl: './pricedetails.component.html',
  styleUrls: ['./pricedetails.component.css']
})
export class PricedetailsComponent implements OnInit {

  constructor(private cartListService:CartlistService,private addressesService:AddressesService) { }
  cartListProductIds:any=[];
  cartListProductDetails:any=[];
  totalPrice:number=0;
  totalOfferPrice:number=0;
  totalDeliveryCharge:number=0;
  currentAddress!:any;
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
    this.currentAddress = this.addressesService.addressSelectedValue;
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
  placeOrder(){
    let orderedProductDetails = [];
    for(let cartproduct of this.cartListProductDetails){
      for(let cartproductlistItem of this.cartListProductIds){
        if(cartproduct._id===cartproductlistItem.productid){
          orderedProductDetails.push({
            offerPrice:cartproduct.offerPrice,
            displayName:cartproduct.displayName,
            price:cartproduct.price,
            imageURL:cartproduct.imageURL,
            deliveryCharge:cartproduct.deliveryCharge,
            quantity:cartproductlistItem.quantity
          });
        }
      }
    }
    console.log("place order",this.totalOfferPrice,orderedProductDetails);
  }

}
