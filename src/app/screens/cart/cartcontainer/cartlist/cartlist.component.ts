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
    this.cartlistService.getcart().subscribe(
      (data:any)=>{
      this.cartProducts = data.data;
    },
    (err:any)=>{
      console.log("error in cart items");
    }
    );
  }

}
