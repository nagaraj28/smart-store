import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Products } from './products';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent implements OnInit {

  constructor(private productService:ProductsService) { }
  isWishListed!:boolean;
  
  @Input() product!:Products;
  
  ngOnInit(): void {
    // this.getAllProducts();
  }
  changeColor(){
    this.isWishListed =!this.isWishListed;
  }

  // getAllProducts(){
  //   this.productService.getAllProducts().subscribe(
  //     (data:any)=>{
  //       this.products = data.products;
  //       console.log(this.products);
  //       console.log("products",data.products)
  //     },
  //     (error)=>{
  //       console.log("error in products",error);
  //     }
  //   )
  // }
  
}
