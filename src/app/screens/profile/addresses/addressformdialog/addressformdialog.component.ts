import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addressformdialog',
  templateUrl: './addressformdialog.component.html',
  styleUrls: ['./addressformdialog.component.css']
})
export class AddressformdialogComponent implements OnInit {

  isDialogOpen:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.isDialogOpen=!this.isDialogOpen;
  }
}
