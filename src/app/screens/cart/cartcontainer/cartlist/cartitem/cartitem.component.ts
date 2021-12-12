import { Component, Input, OnInit } from '@angular/core';
import { ProductdetailsService } from 'src/app/screens/product-details/productdetails.service';
import { Router } from '@angular/router';
import { Products } from 'src/app/screens/products/productcard/products';
import { CartlistService } from '../cartlist.service';
import { LoginService } from 'src/app/screens/login/login.service';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {
  constructor(private productDetailService:ProductdetailsService,private router:Router,private cartListService:CartlistService,private loginService:LoginService) { }
  @Input()product!:any;
  quantity:number=1;
  productdetail!:Products;
  totalPrice:number = 0;
  totalOfferPrice:number = 0;
  ngOnInit(): void {  
    if(this.product.quantity)
    this.quantity=this.product.quantity;
    // console.log(this.product.productid)
    if(this.product.productid)
    this.productDetailService.getProduct(this.product.productid).subscribe(
      (data:any)=>{
        this.productdetail=data.products;
        // console.log(this.productdetail);
      },
      (err:any)=>{
        console.log("error fetching details");
      }
    );
  }
  // ngDoCheck():void{

  // //   this.productDetailService.getProduct(this.product.productid).subscribe(
  // //     (data:any)=>{
  // //       this.productdetail=data;
  // //       this.productThere=true;
  // //       console.log(this.productdetail);
  // //     },
  // //     (err:any)=>{
  // //       console.log("error fetching details");
  // //     }
  // //   );
  //  }
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
    if(this.loginService.loggedUserDetails?.userid){
      this.cartListService.modifyCart(productid,quantity,this.loginService.loggedUserDetails.userid).subscribe(
      (data:any)=>{
        console.log("cart quantity modified",data);
        this.cartListService.getCart(this.loginService.loggedUserDetails.userid).subscribe();
      },
      ((err:any)=>{
        console.log("error in updating cart");
        this.quantity += value;
      })
    );}else{
      this.router.navigate(["/login"]);
    }
  }

    /* 
    delete product from cart
    */
   removeProductFromCart(productid:string){
     if(this.loginService.loggedUserDetails?.userid){
       this.cartListService.removeFromCart(productid,this.loginService.loggedUserDetails.userid).subscribe(
       (data:any)=>{
        console.log("remove success",data);
        this.cartListService.getCart(this.loginService.loggedUserDetails.userid).subscribe(data=>console.log("updated data",data));
       },
       (err:any)=>{
         console.log("something went wrong in deleting the cart",err);
       }
     );
   }else{
    this.router.navigate(["/login"]);
   }
  }
}
