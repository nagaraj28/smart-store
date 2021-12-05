import { Component, OnInit } from '@angular/core';
import { Products } from '../productcard/products';
import { ProductsService } from '../productcard/products.service';

@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrls: ['./productlisting.component.css']
})
export class ProductlistingComponent implements OnInit {
  constructor(private productService:ProductsService) { }
  
  allProducts!:Products[];
  ngOnInit(): void {
    this.getAllProducts();
    this.allProducts=this.productService.modifiedProducts;
  }
  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      (data:any)=>{
        this.allProducts = data.products;
        // console.log("products",data)
      },
      (error)=>{
        console.log("error in products",error);
      }
    )
  }
  ngDoCheck():void	{
    this.allProducts=this.productService.modifiedProducts;
    // console.log(this.allProducts)
    // console.log("hello")
  }
}
