import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent implements OnInit {

  constructor(private productService:ProductsService) { }
  isWishListed!:boolean;
  ngOnInit(): void {
  }
  changeColor(){
    this.isWishListed =!this.isWishListed;
  }
}
