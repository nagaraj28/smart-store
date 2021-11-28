import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrls: ['./productlisting.component.css']
})
export class ProductlistingComponent implements OnInit {
  items:any[]=["","","","","",""]
  constructor() { }

  ngOnInit(): void {
  }

}
