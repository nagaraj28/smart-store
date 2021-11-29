import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit {
  dummyArray:any[]=["","","",""]
  constructor() { }

  ngOnInit(): void {
  }

}
