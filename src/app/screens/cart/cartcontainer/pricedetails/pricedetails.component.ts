import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { LoginService } from 'src/app/screens/login/login.service';
import { AddressesService } from 'src/app/screens/profile/addresses/addresses.service';
import { OrdersService } from 'src/app/screens/profile/orders/orders.service';
import { CartlistService } from '../cartlist/cartlist.service';

@Component({
  selector: 'app-pricedetails',
  templateUrl: './pricedetails.component.html',
  styleUrls: ['./pricedetails.component.css']
})
export class PricedetailsComponent implements OnInit {

  constructor(private cartListService:CartlistService,private addressesService:AddressesService,private ordersService:OrdersService,
    private loginService:LoginService) { }
  cartListProductIds:any=[];
  cartListProductDetails:any=[];
  totalPrice:number=0;
  totalOfferPrice:number=0;
  totalDeliveryCharge:number=0;
  currentAddress!:any;
  loggedUser!:any;
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
    if(this.loggedUser!==this.loginService.loggedUserDetails){
      this.loggedUser = this.loginService.loggedUserDetails;
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
    let orderTotal:number = 0;
    for(let cartproduct of this.cartListProductDetails){
      for(let cartproductlistItem of this.cartListProductIds){
        if(cartproduct._id===cartproductlistItem.productid){
          orderTotal += (cartproduct.offerPrice *cartproductlistItem.quantity);
          orderedProductDetails.push({
            offerPrice:cartproduct.offerPrice,
            displayName:cartproduct.displayName,
            price:cartproduct.price,
            imageURL:cartproduct.imageURL,
            deliveryCharge:cartproduct.deliveryCharge,
            quantity:cartproductlistItem.quantity,
            productid:cartproductlistItem.productid
          });
        }
      }
    }
    // console.log("place order",this.addressesService.addressSelectedValue,this.totalOfferPrice,orderedProductDetails);
    this.ordersService.placeOrder(this.addressesService.addressSelectedValue,orderedProductDetails,this.loggedUser.userid,orderTotal).subscribe(
      (data:any)=>{
        console.log("order placed successfully...",data);
        this.cartListService.deleteAllProductsFromCart(this.loginService.loggedUserDetails.userid).subscribe(
          (data:any)=>{
            console.log("remove success",data);
            this.cartListService.getCart(this.loginService.loggedUserDetails.userid).subscribe(data=>console.log("updated data",data));
           },
           (err:any)=>{
             console.log("something went wrong in deleting the cart",err);
           }
          // (data:any)=>{
          //   console.log("data successfuuly deleted from cart",data);
          //   this.cartListService.getCart().subscribe(
          //     data=>console.log("updated data",data),
          //     err=>console.log("erro updating cartlist",err)
          //     );
          //  },
          //  (err:any)=>{
          //    console.log("something went wrong in deleting all from cart",err);
          //  }
        );
      },
      (err:any)=>{
        console.log("error placing order",err);
      }
    );
  }
}
