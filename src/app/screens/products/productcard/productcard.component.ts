import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent implements OnInit {

  constructor() { }
  isWishListed!:boolean;
  ngOnInit(): void {
  }
  changeColor(){
    this.isWishListed =!this.isWishListed;
  }
}
