import { Component, OnInit } from '@angular/core';
import { CartlistService } from './cartlist.service';
import { Products } from 'src/app/screens/products/productcard/products';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit {
  dummyArray:any[]=["","","",""]
  constructor(private cartlistService:CartlistService) { }
  cartProducts:Products[]=[];
  ngOnInit(): void {
    this.getCartProducts();
  }
  getCartProducts(){
    this.cartlistService.getCart().subscribe(
      (data:any)=>{
      this.cartProducts = data.data[0].cartproducts;
      //  console.log(this.cartProducts);
    },
    (err:any)=>{
      console.log("error in cart items");
    }
    );
  }
  ngDoCheck():void{
    this.cartProducts = this.cartlistService.cartProducts;
  }

}
