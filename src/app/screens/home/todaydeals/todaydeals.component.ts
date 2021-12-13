import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersComponent } from '../../products/filters/filters.component';
import { ProductsService } from '../../products/productcard/products.service';

@Component({
  selector: 'app-todaydeals',
  templateUrl: './todaydeals.component.html',
  styleUrls: ['./todaydeals.component.css']
})
export class TodaydealsComponent implements OnInit {

    topBrands:any[] = [
      {
        brand:"Google",
         imageURL:"brands/google.jpg"
      },
      {
        brand:"Amazon",
         imageURL:"brands/amazon.jpg"
      },  
      {
        brand:"Apple",
         imageURL:"brands/apple.jpg"
      },
      {
        brand:"Samsung",
         imageURL:"brands/samsung.jpg"
      }];
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }
  setBrands(brand:string):void{
    let filtersComponent = new FiltersComponent(this.productsService,this.router);
    // this.router.navigate(["/search"],{queryParams:{searchvalue:brand}});
    filtersComponent.setCategory(brand,"brand");
  }
}
