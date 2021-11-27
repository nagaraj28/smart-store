import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featuredcategories',
  templateUrl: './featuredcategories.component.html',
  styleUrls: ['./featuredcategories.component.css']
})
export class FeaturedcategoriesComponent implements OnInit {

  constructor() { }
  dummyarray:any[]=["1","","","","","",""];

  ngOnInit(): void {
  }

}
