import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todaydeals',
  templateUrl: './todaydeals.component.html',
  styleUrls: ['./todaydeals.component.css']
})
export class TodaydealsComponent implements OnInit {

    dummyarray:any[] = ["a","a","a","a","a","a"]
  constructor() { }

  ngOnInit(): void {
  }

}
