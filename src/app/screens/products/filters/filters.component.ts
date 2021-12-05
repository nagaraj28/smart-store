import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductsService } from '../productcard/products.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  brands!:any[];
  categories!:any[];
  categoriesData: any = {}; 
  brandsData: any = {}; 
  sort:string="none";
  sortByLowPrice:boolean=false;
  sortByHighPrice:boolean=false;
  constructor(private productsService:ProductsService) { }
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
  }

  categoriesChange(){
    //  console.log(this.categoriesData);
    // console.log(this.sort);
     this.productsService.getFilteredData(this.categoriesData,this.brandsData,this.sort);
  }
  brandsChange(){
    // console.log(this.brandsData)
    this.productsService.getFilteredData(this.categoriesData,this.brandsData,this.sort);
  }
  sorting(){
    // console.log(this.brandsData)
    this.productsService.getFilteredData(this.categoriesData,this.brandsData,this.sort);
  }
  getAllBrands(){
    this.productsService.getAllBrands().subscribe(
      (data:any)=>{
        this.brands = data.data;
        this.hydrateDataUtil(this.brands,"brands");
      }
    );
  }
  getAllCategories(){
    this.productsService.getAllCategories().subscribe(
      (data:any)=>{
        this.categories = data.data;
        this.hydrateDataUtil(this.categories,"categories");
      }
    );
  }
  hydrateDataUtil(utilArray:any,operation:string){
    if(operation==="categories"){
      for(let utilValue of utilArray)
      this.categoriesData[utilValue]=false;
    }
  else{
    for(let utilValue of utilArray)
    this.brandsData[utilValue]=false;
  }
}

clearAll(){
  this.hydrateDataUtil(this.categories,"categories");
  this.hydrateDataUtil(this.brands,"brands");
  this.sort="none";
  this.productsService.getFilteredData(this.categories,this.brands,this.sort); 
}

}

