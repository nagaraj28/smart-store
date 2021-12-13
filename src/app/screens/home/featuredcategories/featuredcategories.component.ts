import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersComponent } from '../../products/filters/filters.component';
import { ProductsService } from '../../products/productcard/products.service';

@Component({
  selector: 'app-featuredcategories',
  templateUrl: './featuredcategories.component.html',
  styleUrls: ['./featuredcategories.component.css']
})
export class FeaturedcategoriesComponent implements OnInit {

  constructor(private productsService:ProductsService,private router:Router) { }
  topCategories = [
    {
      category:"watch",
       imageURL:"smart-watches/apple_series_5.jpg"
    },
    {
      category:"vr",
       imageURL:"smart-vr/avelon.jpg"
    },  
    {
      category:"lights",
       imageURL:"smart-bulbs/kodak.jpg"
    },
    {
      category:"audio",
       imageURL:"smart-audio/google_mini.jpg"
    }
  ]
  ngOnInit(): void {
  }
   goToSelectedCard(value:string):void{
    let filtersComponent = new FiltersComponent(this.productsService,this.router);
    filtersComponent.setCategory(value,"category");
  }
}
